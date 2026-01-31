import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <main className="page-content">
        <header className="page-header">
          <h1 className="page-title">
            Next.js routing + client examples
          </h1>
          <p className="page-description">
            Quick links that demonstrate dynamic, catch-all, parallel, and
            intercepting routes, plus a <span style={{ fontWeight: 500 }}>&quot;use client&quot;</span>
            example.
          </p>
        </header>

        <section className="card-grid">
          <Link
            className="card"
            href="/blog/hello-world"
          >
            <h2 className="card-title">Dynamic route</h2>
            <p className="card-text">
              /blog/[slug] — pass a slug parameter.
            </p>
          </Link>
          <Link
            className="card"
            href="/docs/routing/segments"
          >
            <h2 className="card-title">Catch-all route</h2>
            <p className="card-text">
              /docs/[...slug] — multiple segments.
            </p>
          </Link>
          <Link
            className="card"
            href="/optional"
          >
            <h2 className="card-title">Optional catch-all</h2>
            <p className="card-text">
              /optional/[[...slug]] — segments are optional.
            </p>
          </Link>
          <Link
            className="card"
            href="/parallel"
          >
            <h2 className="card-title">Parallel routes</h2>
            <p className="card-text">
              /parallel — multiple slots rendered together.
            </p>
          </Link>
          <Link
            className="card"
            href="/photos"
          >
            <h2 className="card-title">Intercepting routes</h2>
            <p className="card-text">
              /photos — open a photo modal route.
            </p>
          </Link>
          <Link
            className="card"
            href="/use-client"
          >
            <h2 className="card-title">&quot;use client&quot;</h2>
            <p className="card-text">
              /use-client — state and event handlers.
            </p>
          </Link>
          <Link
            className="card"
            href="/clicker"
          >
            <h2 className="card-title">Clicker Game</h2>
            <p className="card-text">
              /clicker — interactive clicker game with 3D animations.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
