import { cleanCutMetadata } from "../metadata";

export const metadata = cleanCutMetadata("terms", "Terms of Use | CleanCut – Media Cleaner", "Terms of Use for CleanCut – Media Cleaner by Hatch AI.");

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Use for CleanCut – Media Cleaner</h1>
      <p>Last updated: September 8, 2026</p>
      <p>CleanCut – Media Cleaner is a general-purpose media editing utility for Android, published by Hatch AI. These terms apply when you use CleanCut.</p>
      <h2>1. Responsible Use</h2>
      <p>Only edit content that you own or are authorized to modify. You are responsible for complying with copyright, trademark, platform rules, and other third-party rights when editing, saving, or sharing media.</p>
      <p>Do not use CleanCut for illegal or unauthorized purposes.</p>
      <h2>2. Processing and Results</h2>
      <p>You manually select an area of a photo or video to clean. Media processing takes place locally on your device; selected media is not uploaded to Hatch AI servers for processing. Results are saved locally only when you choose to save them.</p>
      <p>Results may not always be perfect. Review the result before saving or sharing it.</p>
      <h2>3. Rewarded Advertisements</h2>
      <p>Video cleanup may require completion of a rewarded advertisement before processing begins. Photo cleanup does not require advertisements. Ads may be provided by Google AdMob, and advertising availability is not guaranteed. If a required ad cannot be completed, video processing may be unavailable until you can retry successfully.</p>
      <p>CleanCut currently has no subscriptions or in-app purchases.</p>
      <h2>4. Availability and Updates</h2>
      <p>We do not guarantee uninterrupted availability or error-free operation. App functionality may change through updates.</p>
      <h2>5. Limitation of Liability</h2>
      <p>To the extent permitted by applicable law, Hatch AI is not liable for losses or damage resulting from your use of, or inability to use, CleanCut. Nothing in these terms limits any rights or liability that cannot be limited under applicable law.</p>
      <h2>6. Applicable Law</h2>
      <p>Applicable law and jurisdiction will be determined according to the laws that apply to the user and publisher.</p>
      <h2>7. Contact</h2>
      <p>For questions about these terms, contact Hatch AI at <a href="mailto:info@HatchAI.net">info@HatchAI.net</a>.</p>
    </>
  );
}
