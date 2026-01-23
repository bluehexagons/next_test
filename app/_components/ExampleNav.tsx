import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog/hello-world", label: "Dynamic" },
  { href: "/docs/routing/segments", label: "Catch-all" },
  { href: "/optional", label: "Optional" },
  { href: "/parallel", label: "Parallel" },
  { href: "/photos", label: "Intercepting" },
  { href: "/use-client", label: "use client" },
];

export default function ExampleNav() {
  return (
    <nav className="nav">
      <div className="nav-content">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
