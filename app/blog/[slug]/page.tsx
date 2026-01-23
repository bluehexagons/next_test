export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="content-box">
      <h1 className="page-title">Blog post</h1>
      <p className="page-description" style={{ marginTop: "1rem" }}>
        Dynamic segment: <span style={{ fontWeight: 500 }}>{params.slug}</span>
      </p>
    </div>
  );
}
