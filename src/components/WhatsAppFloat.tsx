import { WhatsAppLink } from "./ui";

export default function WhatsAppFloat() {
  return (
    <WhatsAppLink
      message="Hi HATCH.AI! I'd like to talk about a project."
      className="group fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <span className="sr-only">Chat with HATCH.AI on WhatsApp</span>
      <span
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50"
        aria-hidden="true"
      />
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4.03 8.36 4.03 15c0 2.34.65 4.53 1.78 6.4L3 29l7.8-2.75A12.9 12.9 0 0 0 16.02 27C22.64 27 28 21.64 28 15S22.64 3 16.02 3Zm0 23.4a10.4 10.4 0 0 1-5.3-1.46l-.38-.22-4.63 1.63 1.55-4.5-.25-.4a10.36 10.36 0 0 1-1.6-5.45c0-5.76 4.7-10.44 10.61-10.44 5.9 0 10.6 4.68 10.6 10.44 0 5.75-4.7 10.4-10.6 10.4Zm5.83-7.8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.22-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.54.11-.21.05-.4-.02-.56-.08-.16-.72-1.75-.99-2.4-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.32.16.21 2.26 3.5 5.48 4.9.77.33 1.36.53 1.83.68.77.25 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z" />
      </svg>
    </WhatsAppLink>
  );
}
