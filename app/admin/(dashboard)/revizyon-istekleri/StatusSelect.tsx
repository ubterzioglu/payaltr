"use client";

import { useTransition } from "react";
import { updateRevisionStatus } from "@/lib/revision-actions";
import { STATUS_LABELS, type RevisionStatus } from "@/lib/revisions";

export default function StatusSelect({
  requestId,
  status,
}: {
  requestId: string;
  status: RevisionStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      className="revision-status-select"
      onChange={(e) => {
        const next = e.target.value as RevisionStatus;
        startTransition(() => {
          updateRevisionStatus(requestId, next);
        });
      }}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
