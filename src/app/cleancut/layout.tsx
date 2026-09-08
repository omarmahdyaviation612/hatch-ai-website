import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  applicationName: "CleanCut – Media Cleaner",
  keywords: ["CleanCut", "media cleaner", "photo editing", "video editing", "Android"],
};

export default function CleanCutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar homePath="/" />
      <main id="main" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <nav aria-label="CleanCut resources" className="mb-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-6 text-sm text-gold">
              <Link href="/cleancut/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/cleancut/terms" className="hover:underline">Terms of Use</Link>
              <Link href="/cleancut/support" className="hover:underline">Support</Link>
            </nav>
            <article className="text-base leading-8 text-paper/85 [overflow-wrap:anywhere] [&_h1]:mb-6 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-paper sm:[&_h1]:text-4xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-paper [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2 [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4">
              {children}
            </article>
          </div>
        </Container>
      </main>
      <Footer homePath="/" contactEmail="info@HatchAI.net" />
    </>
  );
}
