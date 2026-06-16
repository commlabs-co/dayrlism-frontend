import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This page could not be found.</h1>
      <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
