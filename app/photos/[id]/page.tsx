export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="content-box">
      <h1 className="page-title">Photo {id}</h1>
      <p className="page-description" style={{ marginTop: "1rem" }}>
        This is the full page route: /photos/{id}
      </p>
    </div>
  );
}
