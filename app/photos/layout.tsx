import type { ReactNode } from "react";

export default function PhotosLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      {children}
      {modal}
    </div>
  );
}
