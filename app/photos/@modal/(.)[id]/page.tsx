"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Photo {id}</h2>
        <p className="modal-text">
          This is an intercepting route rendered in a modal.
        </p>
        <button
          className="btn btn-primary"
          style={{ marginTop: "1.5rem" }}
          onClick={() => router.back()}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
