export default async function DocsCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="content-box">
      <h1 className="page-title">Docs catch-all</h1>
      <p className="page-description" style={{ marginTop: "1rem" }}>
        Segments: <span style={{ fontWeight: 500 }}>{slug.join(" /")}</span>
      </p>
    </div>
  );
}
