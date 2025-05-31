// app/error.tsx
"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">500</h1>
        <p className="mt-4">Something went wrong</p>
        <button
          type="button"
          onClick={reset}
          className="text-white mt-4 rounded-md bg-blue-500 px-4 py-2 hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
