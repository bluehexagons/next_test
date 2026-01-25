import Link from "next/link";
import { auth } from "@/auth";
import styles from "./ExampleNav.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog/hello-world", label: "Dynamic" },
  { href: "/docs/routing/segments", label: "Catch-all" },
  { href: "/optional", label: "Optional" },
  { href: "/parallel", label: "Parallel" },
  { href: "/photos", label: "Intercepting" },
  { href: "/use-client", label: "use client" },
];

export default async function ExampleNav() {
  const session = await auth();

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
        <div className={styles.authSection}>
          {session?.user ? (
            <>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <span className={`nav-link ${styles.userEmail}`}>
                {session.user.email}
              </span>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="nav-link">
                Login
              </Link>
              <Link href="/auth/register" className={`nav-link ${styles.registerLink}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
