export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      causal_analyses: {
        Row: {
          created_at: string
          diagnostic_id: string
          id: string
          is_dominant: boolean
          method: string
          probable_cause: string | null
          steps: Json
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          id?: string
          is_dominant?: boolean
          method: string
          probable_cause?: string | null
          steps?: Json
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          id?: string
          is_dominant?: boolean
          method?: string
          probable_cause?: string | null
          steps?: Json
        }
        Relationships: [
          {
            foreignKeyName: "causal_analyses_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      causal_analysis_findings: {
        Row: {
          causal_analysis_id: string
          finding_id: string
        }
        Insert: {
          causal_analysis_id: string
          finding_id: string
        }
        Update: {
          causal_analysis_id?: string
          finding_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "causal_analysis_findings_causal_analysis_id_fkey"
            columns: ["causal_analysis_id"]
            isOneToOne: false
            referencedRelation: "causal_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "causal_analysis_findings_finding_id_fkey"
            columns: ["finding_id"]
            isOneToOne: false
            referencedRelation: "findings"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_events: {
        Row: {
          created_at: string
          detail: Json | null
          diagnostic_id: string
          entity_id: string | null
          entity_type: string
          event: string
          id: string
        }
        Insert: {
          created_at?: string
          detail?: Json | null
          diagnostic_id: string
          entity_id?: string | null
          entity_type: string
          event: string
          id?: string
        }
        Update: {
          created_at?: string
          detail?: Json | null
          diagnostic_id?: string
          entity_id?: string | null
          entity_type?: string
          event?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "decision_events_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostics: {
        Row: {
          created_at: string
          current_condition: string | null
          engagement_id: string
          gap: string | null
          id: string
          status: Database["public"]["Enums"]["diagnostic_status"]
          target_condition: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_condition?: string | null
          engagement_id: string
          gap?: string | null
          id?: string
          status?: Database["public"]["Enums"]["diagnostic_status"]
          target_condition?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_condition?: string | null
          engagement_id?: string
          gap?: string | null
          id?: string
          status?: Database["public"]["Enums"]["diagnostic_status"]
          target_condition?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostics_engagement_id_fkey"
            columns: ["engagement_id"]
            isOneToOne: false
            referencedRelation: "engagements"
            referencedColumns: ["id"]
          },
        ]
      }
      engagements: {
        Row: {
          created_at: string
          id: string
          name: string
          objective: string | null
          organization_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          objective?: string | null
          organization_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          objective?: string | null
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      findings: {
        Row: {
          confidence: number | null
          content: string
          created_at: string
          diagnostic_id: string
          evidence_level: Database["public"]["Enums"]["evidence_level"] | null
          id: string
          kind: Database["public"]["Enums"]["finding_kind"]
          provenance: Database["public"]["Enums"]["provenance_kind"]
          source_turn_id: string | null
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string
          diagnostic_id: string
          evidence_level?: Database["public"]["Enums"]["evidence_level"] | null
          id?: string
          kind: Database["public"]["Enums"]["finding_kind"]
          provenance?: Database["public"]["Enums"]["provenance_kind"]
          source_turn_id?: string | null
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string
          diagnostic_id?: string
          evidence_level?: Database["public"]["Enums"]["evidence_level"] | null
          id?: string
          kind?: Database["public"]["Enums"]["finding_kind"]
          provenance?: Database["public"]["Enums"]["provenance_kind"]
          source_turn_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "findings_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "findings_source_turn_id_fkey"
            columns: ["source_turn_id"]
            isOneToOne: false
            referencedRelation: "interview_turns"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_turns: {
        Row: {
          content: string
          created_at: string
          id: string
          interview_id: string
          seq: number
          speaker: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          interview_id: string
          seq: number
          speaker: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          interview_id?: string
          seq?: number
          speaker?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_turns_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          diagnostic_id: string
          ended_at: string | null
          id: string
          interviewee_role: string | null
          notes: string | null
          started_at: string
        }
        Insert: {
          diagnostic_id: string
          ended_at?: string | null
          id?: string
          interviewee_role?: string | null
          notes?: string | null
          started_at?: string
        }
        Update: {
          diagnostic_id?: string
          ended_at?: string | null
          id?: string
          interviewee_role?: string | null
          notes?: string | null
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          context: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      outcomes: {
        Row: {
          action_taken: string | null
          created_at: string
          id: string
          observed_result: string | null
          recommendation_id: string
          status: Database["public"]["Enums"]["outcome_status"]
          validated_at: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          id?: string
          observed_result?: string | null
          recommendation_id: string
          status?: Database["public"]["Enums"]["outcome_status"]
          validated_at?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          id?: string
          observed_result?: string | null
          recommendation_id?: string
          status?: Database["public"]["Enums"]["outcome_status"]
          validated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outcomes_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_evidence: {
        Row: {
          finding_id: string
          recommendation_id: string
        }
        Insert: {
          finding_id: string
          recommendation_id: string
        }
        Update: {
          finding_id?: string
          recommendation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_evidence_finding_id_fkey"
            columns: ["finding_id"]
            isOneToOne: false
            referencedRelation: "findings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_evidence_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendations: {
        Row: {
          action: string
          causal_analysis_id: string | null
          created_at: string
          diagnostic_id: string
          id: string
          owner: string | null
          priority: Database["public"]["Enums"]["priority_level"]
          provenance: Database["public"]["Enums"]["provenance_kind"]
          severity: Database["public"]["Enums"]["severity_level"]
          status: Database["public"]["Enums"]["recommendation_status"]
          title: string
          updated_at: string
        }
        Insert: {
          action: string
          causal_analysis_id?: string | null
          created_at?: string
          diagnostic_id: string
          id?: string
          owner?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          provenance?: Database["public"]["Enums"]["provenance_kind"]
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["recommendation_status"]
          title: string
          updated_at?: string
        }
        Update: {
          action?: string
          causal_analysis_id?: string | null
          created_at?: string
          diagnostic_id?: string
          id?: string
          owner?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          provenance?: Database["public"]["Enums"]["provenance_kind"]
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["recommendation_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_causal_analysis_id_fkey"
            columns: ["causal_analysis_id"]
            isOneToOne: false
            referencedRelation: "causal_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      diagnostic_status:
        | "draft"
        | "investigating"
        | "analyzed"
        | "recommended"
        | "validating"
        | "closed"
      evidence_level:
        | "anecdote"
        | "reported"
        | "observed"
        | "measured"
        | "verified"
      finding_kind: "observation" | "interpretation" | "hypothesis" | "evidence"
      outcome_status: "pending" | "validated" | "failed" | "unresolved"
      priority_level: "p3" | "p2" | "p1" | "p0"
      provenance_kind: "user" | "ai"
      recommendation_status:
        | "proposed"
        | "accepted"
        | "in_progress"
        | "implemented"
        | "rejected"
      severity_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
