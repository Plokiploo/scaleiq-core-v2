"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/client";

type DiagStatus = "draft" | "investigating" | "analyzed" | "recommended" | "validating" | "closed";
type Diag = {
  id: string;
  title: string;
  status: DiagStatus;
  current_condition: string | null;
  target_condition: string | null;
  gap: string | null;
};
type Turn = { id: string; seq: number; speaker: "interviewer" | "interviewee"; content: string };
type Interview = { id: string; interview_turns: Turn[] };
type Full = { diagnostic: Diag; interviews: Interview[] };

type FindingKind = "observation" | "interpretation" | "hypothesis" | "evidence";
type EvidenceLevel = "anecdote" | "reported" | "observed" | "measured" | "verified";
type Severity = "low" | "medium" | "high" | "critical";
type Priority = "p3" | "p2" | "p1" | "p0";

type ProposedFinding = {
  kind: FindingKind;
  content: string;
  confidence: number;
  evidence_level: EvidenceLevel | null;
  accepted: boolean;
};
type ProposedCausalAnalysis = {
  method: "five_whys" | "constraint" | "other";
  steps: string[];
  probable_cause: string;
  is_dominant: boolean;
  finding_indices: number[];
  accepted: boolean;
};
type ProposedRecommendation = {
  title: string;
  action: string;
  owner_suggested: string;
  severity: Severity;
  priority: Priority;
  finding_indices: number[];
  accepted: boolean;
};
type Proposal = {
  findings: ProposedFinding[];
  causal_analysis: ProposedCausalAnalysis;
  recommendations: ProposedRecommendation[];
};

type Phase =
  | "loading"
  | "interview"
  | "thinking"
  | "synthesizing"
  | "review"
  | "saving"
  | "done"
  | "error";

const FINDING_LABEL: Record<FindingKind, string> = {
  observation: "Observation",
  interpretation: "Interprétation",
  hypothesis: "Hypothèse",
  evidence: "Évidence",
};
const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  anecdote: "Anecdote",
  reported: "Rapporté",
  observed: "Observé",
  measured: "Mesuré",
  verified: "Vérifié",
};

function diagContext(d: Diag) {
  return {
    title: d.title,
    current_condition: d.current_condition,
    target_condition: d.target_condition,
    gap: d.gap,
  };
}

// Réponse en vidéo: webcam affichée en direct + reconnaissance vocale du navigateur pour
// transcrire la réponse. Aucune vidéo n'est envoyée ni stockée — seul le texte transcrit
// est conservé, exactement comme une réponse tapée au clavier.
type SpeechRecognitionResultLike = { isFinal: boolean; 0: { transcript: string } };
type SpeechRecognitionEventLike = { resultIndex: number; results: ArrayLike<SpeechRecognitionResultLike> };
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Partage d'écran: la personne interviewée montre un cas concret. Des images du flux
// sont capturées à intervalle régulier (plafonnées, coût maîtrisé), analysées par l'IA
// (vision), puis les observations retenues sont compilées en UN SEUL tour de texte —
// aucune image ni vidéo n'est jamais stockée ou envoyée à la base de données.
const SCREEN_CAPTURE_INTERVAL_MS = 6000;
const SCREEN_CAPTURE_MAX_FRAMES = 6;
const SCREEN_CAPTURE_MAX_WIDTH = 960;

export default function GuidePage() {
  const { id } = useParams<{ id: string }>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [diagnostic, setDiagnostic] = useState<Diag | null>(null);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [answer, setAnswer] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [error, setError] = useState("");
  const [answerMode, setAnswerMode] = useState<"texte" | "video" | "ecran">("texte");
  const [videoSupported, setVideoSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [cameraError, setCameraError] = useState("");
  const startedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recordingRef = useRef(false);
  const finalTranscriptRef = useRef("");

  const [screenSupported, setScreenSupported] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [screenLive, setScreenLive] = useState(false);
  const [screenCapturing, setScreenCapturing] = useState(false);
  const [screenObservations, setScreenObservations] = useState<string[]>([]);
  const [screenNote, setScreenNote] = useState("");
  const [screenError, setScreenError] = useState("");
  const screenVideoElRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const screenIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const screenObservationsRef = useRef<string[]>([]);
  const screenFrameCountRef = useRef(0);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, phase]);

  useEffect(() => {
    const supported =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia) &&
      getSpeechRecognitionCtor() !== null;
    setVideoSupported(supported);
    setScreenSupported(
      typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getDisplayMedia)
    );
    return () => {
      stopVideoAnswer();
      stopScreenShareTracks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    setPhase("loading");
    setError("");
    try {
      const data = await api<Full>(`/api/diagnostics/${id}`);
      setDiagnostic(data.diagnostic);

      let interview = data.interviews[0];
      if (!interview) {
        const created = await api<{ id: string }>(`/api/diagnostics/${id}/interviews`, {
          method: "POST",
          body: JSON.stringify({}),
        });
        interview = { id: created.id, interview_turns: [] };
      }
      setInterviewId(interview.id);
      const sortedTurns = [...(interview.interview_turns ?? [])].sort((a, b) => a.seq - b.seq);
      setTurns(sortedTurns);

      if (data.diagnostic.status === "draft") {
        try {
          await api(`/api/diagnostics/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: "investigating" }),
          });
        } catch {
          // déjà passé ou transition refusée: sans conséquence ici
        }
      }

      await advance(interview.id, sortedTurns, data.diagnostic);
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  async function advance(ivId: string, currentTurns: Turn[], diag: Diag) {
    const last = currentTurns[currentTurns.length - 1];
    if (!last || last.speaker === "interviewee") {
      setPhase("thinking");
      const transcript = currentTurns.map((t) => ({ speaker: t.speaker, content: t.content }));
      const result = await api<{ done: boolean; question: string | null }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ mode: "interview_question", diagnostic: diagContext(diag), transcript }),
      });
      if (result.done || !result.question) {
        await runSynthesis(currentTurns, diag);
        return;
      }
      const turn = await api<Turn>(`/api/interviews/${ivId}/turns`, {
        method: "POST",
        body: JSON.stringify({ speaker: "interviewer", content: result.question }),
      });
      setTurns((t) => [...t, turn]);
      setPhase("interview");
    } else {
      setPhase("interview");
    }
  }

  async function sendAnswer(text: string) {
    if (!text.trim() || !interviewId || !diagnostic) return;
    setError("");
    setPhase("thinking");
    try {
      const turn = await api<Turn>(`/api/interviews/${interviewId}/turns`, {
        method: "POST",
        body: JSON.stringify({ speaker: "interviewee", content: text }),
      });
      const newTurns = [...turns, turn];
      setTurns(newTurns);
      setAnswer("");
      await advance(interviewId, newTurns, diagnostic);
    } catch (e) {
      setError((e as Error).message);
      setPhase("interview");
    }
  }

  async function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    await sendAnswer(answer);
  }

  async function startVideoAnswer() {
    setCameraError("");
    setLiveTranscript("");
    finalTranscriptRef.current = "";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoElRef.current) {
        videoElRef.current.srcObject = stream;
        await videoElRef.current.play();
      }
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) {
        setCameraError("La reconnaissance vocale n'est pas disponible sur ce navigateur. Essaie avec Chrome, ou réponds au clavier.");
        stopVideoAnswer();
        return;
      }
      const recognition = new Ctor();
      recognition.lang = "fr-FR";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) finalTranscriptRef.current += res[0].transcript + " ";
          else interim += res[0].transcript;
        }
        setLiveTranscript((finalTranscriptRef.current + interim).trim());
      };
      recognition.onerror = () => {};
      recognition.onend = () => {
        if (recordingRef.current) {
          try { recognition.start(); } catch { /* déjà démarrée */ }
        }
      };
      recognitionRef.current = recognition;
      recognition.start();
      recordingRef.current = true;
      setRecording(true);
    } catch {
      setCameraError("Impossible d'accéder à la caméra ou au micro. Vérifie les autorisations du navigateur, ou réponds au clavier.");
    }
  }

  function stopVideoAnswer() {
    recordingRef.current = false;
    setRecording(false);
    try { recognitionRef.current?.stop(); } catch { /* déjà arrêtée */ }
    recognitionRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoElRef.current) videoElRef.current.srcObject = null;
  }

  async function submitVideoAnswer() {
    const text = (finalTranscriptRef.current || liveTranscript).trim();
    stopVideoAnswer();
    if (!text) {
      setCameraError("Aucune réponse détectée par la reconnaissance vocale. Réessaie ou réponds au clavier.");
      return;
    }
    setLiveTranscript("");
    finalTranscriptRef.current = "";
    await sendAnswer(text);
  }

  function stopScreenCaptureInterval() {
    if (screenIntervalRef.current) {
      clearInterval(screenIntervalRef.current);
      screenIntervalRef.current = null;
    }
  }

  function stopScreenShareTracks() {
    stopScreenCaptureInterval();
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
    if (screenVideoElRef.current) screenVideoElRef.current.srcObject = null;
    setScreenLive(false);
  }

  async function captureAndAnalyzeFrame() {
    const video = screenVideoElRef.current;
    if (!video || !video.videoWidth || !diagnostic) return;
    if (screenFrameCountRef.current >= SCREEN_CAPTURE_MAX_FRAMES) {
      stopScreenCaptureInterval();
      return;
    }
    const scale = Math.min(1, SCREEN_CAPTURE_MAX_WIDTH / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
    const base64 = dataUrl.split(",")[1];
    if (!base64) return;

    screenFrameCountRef.current += 1;
    setScreenCapturing(true);
    try {
      const lastQuestion = [...turns].reverse().find((t) => t.speaker === "interviewer")?.content ?? null;
      const result = await api<{ relevant: boolean; observation: string | null }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          mode: "observe_screen",
          diagnostic: diagContext(diagnostic),
          last_question: lastQuestion,
          prior_observations: screenObservationsRef.current,
          image_base64: base64,
          media_type: "image/jpeg",
        }),
      });
      if (result.relevant && result.observation) {
        screenObservationsRef.current = [...screenObservationsRef.current, result.observation];
        setScreenObservations(screenObservationsRef.current);
      }
    } catch {
      // analyse d'une image manquée: non bloquant, on continue le partage
    } finally {
      setScreenCapturing(false);
    }
  }

  async function startScreenShare() {
    setScreenError("");
    setScreenObservations([]);
    setScreenNote("");
    screenObservationsRef.current = [];
    screenFrameCountRef.current = 0;
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = stream;
      if (screenVideoElRef.current) {
        screenVideoElRef.current.srcObject = stream;
        await screenVideoElRef.current.play();
      }
      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        stopScreenShareTracks();
      });
      setScreenLive(true);
      setSharingScreen(true);
      screenIntervalRef.current = setInterval(() => {
        void captureAndAnalyzeFrame();
      }, SCREEN_CAPTURE_INTERVAL_MS);
      void captureAndAnalyzeFrame();
    } catch {
      setScreenError("Impossible de démarrer le partage d'écran. Vérifie les autorisations du navigateur, ou réponds au clavier.");
    }
  }

  async function finishScreenShare() {
    stopScreenShareTracks();
    const observations = screenObservationsRef.current;
    const note = screenNote.trim();
    if (!observations.length && !note) {
      setScreenError("Aucune observation retenue et aucun commentaire ajouté. Ajoute un commentaire ou réponds au clavier.");
      setSharingScreen(false);
      return;
    }
    const parts = ["[Partage d'écran]"];
    if (observations.length) parts.push(observations.map((o) => `- ${o}`).join("\n"));
    if (note) parts.push(note);
    const content = parts.join("\n");
    setSharingScreen(false);
    setScreenObservations([]);
    setScreenNote("");
    screenObservationsRef.current = [];
    await sendAnswer(content);
  }

  function cancelScreenShare() {
    stopScreenShareTracks();
    setSharingScreen(false);
    setScreenObservations([]);
    setScreenNote("");
    setScreenError("");
    screenObservationsRef.current = [];
  }

  async function runSynthesis(currentTurns: Turn[], diag: Diag) {
    setPhase("synthesizing");
    try {
      const transcript = currentTurns.map((t) => ({ speaker: t.speaker, content: t.content }));
      const result = await api<{
        findings: Omit<ProposedFinding, "accepted">[];
        causal_analysis: Omit<ProposedCausalAnalysis, "accepted">;
        recommendations: Omit<ProposedRecommendation, "accepted">[];
      }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ mode: "synthesize", diagnostic: diagContext(diag), transcript }),
      });
      setProposal({
        findings: result.findings.map((f) => ({ ...f, accepted: true })),
        causal_analysis: { ...result.causal_analysis, accepted: true },
        recommendations: result.recommendations.map((r) => ({ ...r, accepted: true })),
      });
      setPhase("review");
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  function updateFinding(i: number, patch: Partial<ProposedFinding>) {
    setProposal((p) => {
      if (!p) return p;
      const findings = p.findings.slice();
      findings[i] = { ...findings[i], ...patch };
      return { ...p, findings };
    });
  }
  function updateCausal(patch: Partial<ProposedCausalAnalysis>) {
    setProposal((p) => (p ? { ...p, causal_analysis: { ...p.causal_analysis, ...patch } } : p));
  }
  function updateRec(i: number, patch: Partial<ProposedRecommendation>) {
    setProposal((p) => {
      if (!p) return p;
      const recommendations = p.recommendations.slice();
      recommendations[i] = { ...recommendations[i], ...patch };
      return { ...p, recommendations };
    });
  }

  async function validerEtEnregistrer() {
    if (!proposal || !diagnostic) return;
    setError("");
    setPhase("saving");
    try {
      const idMap: Record<number, string> = {};
      for (let i = 0; i < proposal.findings.length; i++) {
        const f = proposal.findings[i];
        if (!f.accepted) continue;
        const confidence = Math.max(0, Math.min(1, f.confidence ?? 0.5));
        const evidence_level = f.kind === "evidence" ? f.evidence_level ?? "reported" : undefined;
        const created = await api<{ id: string }>(`/api/diagnostics/${id}/findings`, {
          method: "POST",
          body: JSON.stringify({
            kind: f.kind,
            content: f.content,
            provenance: "ai",
            confidence,
            evidence_level,
          }),
        });
        idMap[i] = created.id;
      }

      let causalId: string | undefined;
      if (proposal.causal_analysis.accepted && proposal.causal_analysis.probable_cause.trim()) {
        const finding_ids = proposal.causal_analysis.finding_indices
          .map((i) => idMap[i])
          .filter((v): v is string => Boolean(v));
        const created = await api<{ id: string }>(`/api/diagnostics/${id}/analyses`, {
          method: "POST",
          body: JSON.stringify({
            method: proposal.causal_analysis.method,
            steps: proposal.causal_analysis.steps,
            probable_cause: proposal.causal_analysis.probable_cause,
            is_dominant: proposal.causal_analysis.is_dominant,
            finding_ids,
          }),
        });
        causalId = created.id;
        try {
          await api(`/api/diagnostics/${id}`, { method: "PATCH", body: JSON.stringify({ status: "analyzed" }) });
        } catch {
          // transition déjà faite ou non applicable
        }
      }

      let anyRec = false;
      for (const r of proposal.recommendations) {
        if (!r.accepted || !r.title.trim() || !r.action.trim()) continue;
        anyRec = true;
        const finding_ids = r.finding_indices.map((i) => idMap[i]).filter((v): v is string => Boolean(v));
        await api(`/api/diagnostics/${id}/recommendations`, {
          method: "POST",
          body: JSON.stringify({
            title: r.title,
            action: r.action,
            owner: r.owner_suggested || undefined,
            severity: r.severity,
            priority: r.priority,
            provenance: "ai",
            causal_analysis_id: causalId,
            finding_ids,
          }),
        });
      }
      if (anyRec) {
        try {
          await api(`/api/diagnostics/${id}`, { method: "PATCH", body: JSON.stringify({ status: "recommended" }) });
        } catch {
          // transition déjà faite ou non applicable
        }
      }

      setPhase("done");
    } catch (e) {
      setError((e as Error).message);
      setPhase("review");
    }
  }

  if (phase === "loading") {
    return (
      <main>
        <p><Link href="/">← Accueil</Link></p>
        <p className="muted">Préparation de l&apos;entretien…</p>
      </main>
    );
  }

  if (phase === "error") {
    return (
      <main>
        <p><Link href="/">← Accueil</Link></p>
        <p className="error">{error || "Une erreur est survenue."}</p>
        <button onClick={() => { startedRef.current = false; void start(); }}>Réessayer</button>
      </main>
    );
  }

  return (
    <main>
      <p><Link href="/">← Accueil</Link></p>
      <h1>{diagnostic?.title}</h1>
      <p className="muted">
        L&apos;IA mène l&apos;entretien, une question à la fois. Réponds simplement avec ce que tu observes.
      </p>
      {error && <p className="error">{error}</p>}

      {(phase === "interview" || phase === "thinking" || phase === "synthesizing") && (
        <>
          <div className="chat">
            {turns.map((t) => (
              <div key={t.id} className={`bubble ${t.speaker === "interviewer" ? "ai" : "user"}`}>
                {t.content}
              </div>
            ))}
            {phase === "thinking" && <p className="spinner-text">L&apos;IA réfléchit…</p>}
            {phase === "synthesizing" && (
              <p className="spinner-text">L&apos;IA prépare une synthèse à partir de l&apos;entretien…</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {phase === "interview" && (
            <>
              {(videoSupported || screenSupported) && (
                <p className="row" style={{ marginBottom: "0.5rem" }}>
                  <button
                    type="button"
                    className={answerMode === "texte" ? "" : "secondary"}
                    onClick={() => { stopVideoAnswer(); cancelScreenShare(); setAnswerMode("texte"); }}
                  >
                    Répondre au clavier
                  </button>
                  {videoSupported && (
                    <button
                      type="button"
                      className={answerMode === "video" ? "" : "secondary"}
                      onClick={() => { cancelScreenShare(); setAnswerMode("video"); }}
                    >
                      Répondre en vidéo
                    </button>
                  )}
                  {screenSupported && (
                    <button
                      type="button"
                      className={answerMode === "ecran" ? "" : "secondary"}
                      onClick={() => { stopVideoAnswer(); setAnswerMode("ecran"); }}
                    >
                      Montrer mon écran
                    </button>
                  )}
                </p>
              )}

              {answerMode === "texte" && (
                <form className="row" onSubmit={submitAnswer}>
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Ta réponse…"
                    style={{ flex: 1, minWidth: 240 }}
                    required
                    autoFocus
                  />
                  <button type="submit">Répondre</button>
                </form>
              )}

              {answerMode === "video" && (
                <div className="card">
                  <p className="muted">
                    {turns[turns.length - 1]?.speaker === "interviewer" ? turns[turns.length - 1].content : ""}
                  </p>
                  <video
                    ref={videoElRef}
                    muted
                    playsInline
                    style={{ width: "100%", maxWidth: 420, borderRadius: 8, background: "#000", display: "block" }}
                  />
                  {liveTranscript && <p style={{ marginTop: "0.5rem" }}>{liveTranscript}</p>}
                  {cameraError && <p className="error">{cameraError}</p>}
                  <p className="row" style={{ marginTop: "0.5rem" }}>
                    {!recording ? (
                      <button type="button" onClick={startVideoAnswer}>Démarrer l&apos;enregistrement</button>
                    ) : (
                      <button type="button" onClick={submitVideoAnswer}>Terminer ma réponse</button>
                    )}
                  </p>
                </div>
              )}

              {answerMode === "ecran" && (
                <div className="card">
                  <p className="muted">
                    Partage l&apos;écran qui montre ton cas concret (un outil, une erreur, un blocage). L&apos;IA regarde et note ce qui est pertinent — rien n&apos;est enregistré, seul un résumé texte sera ajouté à l&apos;entretien.
                  </p>
                  {sharingScreen && (
                    <video
                      ref={screenVideoElRef}
                      muted
                      playsInline
                      style={{ width: "100%", maxWidth: 420, borderRadius: 8, background: "#000", display: "block" }}
                    />
                  )}
                  {sharingScreen && !screenLive && (
                    <p className="muted">Partage arrêté. Tu peux ajouter un commentaire puis terminer.</p>
                  )}
                  {screenCapturing && <p className="spinner-text">L&apos;IA regarde…</p>}
                  {screenObservations.length > 0 && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <p className="muted">Ce que l&apos;IA remarque à l&apos;écran:</p>
                      <ul>
                        {screenObservations.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {sharingScreen && (
                    <label style={{ display: "block", marginTop: "0.5rem" }}>
                      <span className="muted">Commentaire additionnel (optionnel)</span>
                      <textarea value={screenNote} onChange={(e) => setScreenNote(e.target.value)} />
                    </label>
                  )}
                  {screenError && <p className="error">{screenError}</p>}
                  <p className="row" style={{ marginTop: "0.5rem" }}>
                    {!sharingScreen ? (
                      <button type="button" onClick={startScreenShare}>Démarrer le partage</button>
                    ) : (
                      <>
                        <button type="button" onClick={finishScreenShare}>Terminer le partage et répondre</button>
                        <button type="button" className="secondary" onClick={cancelScreenShare}>Annuler</button>
                      </>
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {phase === "review" && proposal && (
        <>
          <h2>Ce que l&apos;IA propose</h2>
          <p className="muted">
            Relis chaque proposition. Décoche ce qui ne te semble pas juste, modifie le texte si besoin. Rien n&apos;est enregistré tant que tu n&apos;as pas validé.
          </p>

          <h3>Ce qui a été observé</h3>
          {proposal.findings.map((f, i) => (
            <div key={i} className={`card proposal-item ${f.accepted ? "" : "rejected"}`}>
              <label>
                <input
                  type="checkbox"
                  checked={f.accepted}
                  onChange={(e) => updateFinding(i, { accepted: e.target.checked })}
                />{" "}
                Garder cet élément
              </label>
              <label>
                <span className="muted hint" data-hint="Observation: un fait constaté directement. Interprétation: le sens qu'on lui donne. Hypothèse: une explication à vérifier. Évidence: une donnée vérifiable.">Type</span>
                <select value={f.kind} onChange={(e) => updateFinding(i, { kind: e.target.value as FindingKind })}>
                  {(Object.keys(FINDING_LABEL) as FindingKind[]).map((k) => (
                    <option key={k} value={k}>{FINDING_LABEL[k]}</option>
                  ))}
                </select>
              </label>
              {f.kind === "evidence" && (
                <label>
                  <span className="muted hint" data-hint="À quel point cette donnée est solide, du moins au plus fiable: anecdote < rapporté < observé < mesuré < vérifié.">Niveau de fiabilité</span>
                  <select
                    value={f.evidence_level ?? "reported"}
                    onChange={(e) => updateFinding(i, { evidence_level: e.target.value as EvidenceLevel })}
                  >
                    {(Object.keys(EVIDENCE_LABEL) as EvidenceLevel[]).map((k) => (
                      <option key={k} value={k}>{EVIDENCE_LABEL[k]}</option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                <span className="muted">Contenu</span>
                <textarea value={f.content} onChange={(e) => updateFinding(i, { content: e.target.value })} />
              </label>
              <p className="muted">Confiance de l&apos;IA: {Math.round((f.confidence ?? 0) * 100)}%</p>
            </div>
          ))}

          <h3>Cause probable</h3>
          <div className={`card proposal-item ${proposal.causal_analysis.accepted ? "" : "rejected"}`}>
            <label>
              <input
                type="checkbox"
                checked={proposal.causal_analysis.accepted}
                onChange={(e) => updateCausal({ accepted: e.target.checked })}
              />{" "}
              Garder cette analyse
            </label>
            <label>
              <input
                type="checkbox"
                checked={proposal.causal_analysis.is_dominant}
                onChange={(e) => updateCausal({ is_dominant: e.target.checked })}
              />{" "}
              <span className="hint" data-hint="La cause qui bloque le plus — celle à traiter en priorité s'il fallait n'en choisir qu'une.">Friction dominante</span>
            </label>
            <label>
              <span className="muted">Cause probable</span>
              <textarea
                value={proposal.causal_analysis.probable_cause}
                onChange={(e) => updateCausal({ probable_cause: e.target.value })}
              />
            </label>
          </div>

          <h3>Actions proposées</h3>
          {proposal.recommendations.length === 0 && (
            <p className="muted">Aucune action proposée.</p>
          )}
          {proposal.recommendations.map((r, i) => (
            <div key={i} className={`card proposal-item ${r.accepted ? "" : "rejected"}`}>
              <label>
                <input
                  type="checkbox"
                  checked={r.accepted}
                  onChange={(e) => updateRec(i, { accepted: e.target.checked })}
                />{" "}
                Garder cette action
              </label>
              <label>
                <span className="muted">Titre</span>
                <input value={r.title} onChange={(e) => updateRec(i, { title: e.target.value })} />
              </label>
              <label>
                <span className="muted">Action simple à exécuter</span>
                <textarea value={r.action} onChange={(e) => updateRec(i, { action: e.target.value })} />
              </label>
              <label>
                <span className="muted">Owner suggéré</span>
                <input value={r.owner_suggested} onChange={(e) => updateRec(i, { owner_suggested: e.target.value })} />
              </label>
              <label>
                <span className="muted hint" data-hint="L'impact si cette action n'est pas faite — de faible à critique.">Sévérité</span>
                <select value={r.severity} onChange={(e) => updateRec(i, { severity: e.target.value as Severity })}>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="critical">Critique</option>
                </select>
              </label>
              <label>
                <span className="muted hint" data-hint="L'urgence relative par rapport aux autres actions — P0 est la plus urgente, P3 la moins urgente.">Priorité</span>
                <select value={r.priority} onChange={(e) => updateRec(i, { priority: e.target.value as Priority })}>
                  <option value="p3">P3</option>
                  <option value="p2">P2</option>
                  <option value="p1">P1</option>
                  <option value="p0">P0</option>
                </select>
              </label>
            </div>
          ))}

          <p>
            <button onClick={validerEtEnregistrer}>Valider et enregistrer</button>
          </p>
        </>
      )}

      {phase === "saving" && <p className="muted">Enregistrement…</p>}

      {phase === "done" && (
        <>
          <p className="muted">C&apos;est enregistré. Le diagnostic est prêt à être suivi.</p>
          <p className="row">
            <Link href={`/diagnostics/${id}`}><button className="secondary">Voir le détail (mode expert)</button></Link>
            <Link href="/nouveau"><button>Nouveau diagnostic</button></Link>
          </p>
        </>
      )}
    </main>
  );
}
