import type { ReactNode } from "react";

export default function ParallelLayout({
  children,
  sidebar,
  content,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="parallel-container">
      <h1 className="page-title">Parallel routes</h1>
      <div className="parallel-grid">
        <aside className="parallel-sidebar">
          {sidebar}
        </aside>
        <section className="parallel-content">
          <div className="parallel-slot">
            {children}
          </div>
          <div className="parallel-slot">
            {content}
          </div>
        </section>
      </div>
    </div>
  );
}
