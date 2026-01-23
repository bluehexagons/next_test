export default async function OptionalCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];
  return (
    <div className="content-box">
      <h1 className="page-title">Optional catch-all</h1>
      <p className="page-description" style={{ marginTop: "1rem" }}>
        Segments: {segments.length ? (
          <span style={{ fontWeight: 500 }}>{segments.join(" /")}</span>
        ) : (
          <span style={{ fontWeight: 500 }}>(none)</span>
        )}
      </p>
    </div>
  );
}
