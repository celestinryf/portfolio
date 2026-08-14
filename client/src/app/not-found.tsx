import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 mb-6">
          404 — Not Found
        </p>
        <h1
          className="font-light tracking-tight text-black dark:text-white leading-none mb-8"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          Lost?
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-md mx-auto">
          This page doesn&apos;t exist. The work does, though.
        </p>
        <Link
          href="/"
          className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
