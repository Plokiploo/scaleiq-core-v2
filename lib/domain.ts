import type { Database } from "./database.types";

export type DiagnosticStatus = Database["public"]["Enums"]["diagnostic_status"];
export type FindingKind = Database["public"]["Enums"]["finding_kind"];
export type EvidenceLevel = Database["public"]["Enums"]["evidence_level"];

// Transitions autorisées (forward-only pendant le MVP).
export const DIAGNOSTIC_TRANSITIONS: Record<DiagnosticStatus, DiagnosticStatus[]> = {
  draft: ["investigating"],
  investigating: ["analyzed"],
  analyzed: ["recommended"],
  recommended: ["validating"],
  validating: ["closed"],
  closed: [],
};

export function canTransition(from: DiagnosticStatus, to: DiagnosticStatus): boolean {
  return DIAGNOSTIC_TRANSITIONS[from]?.includes(to) ?? false;
}

export const FINDING_KINDS: FindingKind[] = [
  "observation",
  "interpretation",
  "hypothesis",
  "evidence",
];
