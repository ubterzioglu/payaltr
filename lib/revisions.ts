export type RevisionStatus = "open" | "in_progress" | "done" | "rejected";

export type RevisionRequest = {
  id: string;
  user_id: string | null;
  created_by_admin: boolean;
  title: string;
  description: string;
  status: RevisionStatus;
  created_at: string;
  updated_at: string;
};

export type RevisionComment = {
  id: string;
  request_id: string;
  author_email: string;
  is_admin: boolean;
  body: string;
  created_at: string;
};

export const STATUS_LABELS: Record<RevisionStatus, string> = {
  open: "Açık",
  in_progress: "İnceleniyor",
  done: "Tamamlandı",
  rejected: "Reddedildi",
};
