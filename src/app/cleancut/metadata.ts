import type { Metadata } from "next";

export function cleanCutMetadata(path: string, title: string, description: string): Metadata {
  const url = `https://HatchAI.net/cleancut/${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Hatch AI", images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}
