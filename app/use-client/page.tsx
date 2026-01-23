"use client";

import { useState } from "react";

export default function UseClientPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="content-box">
      <h1 className="page-title">&quot;use client&quot; example</h1>
      <p className="page-description" style={{ marginTop: "1rem" }}>
        This page is a Client Component so it can use state and event handlers.
      </p>
      <button
        className="btn btn-primary"
        style={{ marginTop: "1.5rem" }}
        onClick={() => setCount((prev) => prev + 1)}
      >
        Clicked {count} time{count === 1 ? "" : "s"}
      </button>
    </div>
  );
}
