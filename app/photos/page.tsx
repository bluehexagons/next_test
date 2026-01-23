import Link from "next/link";

const photos = [
  { id: "1", title: "Sunset" },
  { id: "2", title: "Mountains" },
  { id: "3", title: "City" },
];

export default function PhotosPage() {
  return (
    <div className="content-box">
      <h1 className="page-title">
        Photo gallery
      </h1>
      <p className="page-description" style={{ marginTop: "0.75rem" }}>
        Click a photo to open an intercepting modal route.
      </p>
      <div className="photo-grid">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            className="photo-card"
            href={`/photos/${photo.id}`}
          >
            <div className="card-title">{photo.title}</div>
            <div className="card-text">
              /photos/{photo.id}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
