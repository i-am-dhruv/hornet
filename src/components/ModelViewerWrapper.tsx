"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader } from "./Loader";

// Dynamically import with ssr: false to ensure it only runs on client
const ClientCanvas = dynamic(
  () => import("./ModelViewerClient"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export function ModelViewer() {
  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<Loader />}>
        <ClientCanvas />
      </Suspense>
    </div>
  );
}
