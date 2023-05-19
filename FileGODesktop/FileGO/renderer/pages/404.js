import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link href="/home">
        <a>Go to Home</a>
      </Link>
    </div>
  );
}
