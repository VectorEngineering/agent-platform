// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4">Page not found</p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
