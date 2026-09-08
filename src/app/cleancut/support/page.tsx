import Link from "next/link";
import { cleanCutMetadata } from "../metadata";

export const metadata = cleanCutMetadata("support", "CleanCut Support | Hatch AI", "Support and troubleshooting for CleanCut – Media Cleaner.");

export default function SupportPage() {
  return (
    <>
      <h1>CleanCut – Media Cleaner Support</h1>
      <p>Need help with CleanCut? Use the information below to troubleshoot common issues or contact us.</p>
      <h2>1. How CleanCut Works</h2>
      <p>Choose media → select an area → confirm ownership → clean selection → save result.</p>
      <p>CleanCut supports photos and videos. You manually select the area to clean, and processing takes place locally on your Android device. No user account is required.</p>
      <h2>2. Video Cleanup and Ads</h2>
      <p>Video cleanup requires completion of a rewarded advertisement before processing. Photo cleanup does not require ads.</p>
      <p>If an ad fails to load, check your internet connection and retry later. Advertising availability is not guaranteed. The media itself remains processed locally and is never sent to AdMob.</p>
      <h2>3. Media Permissions</h2>
      <p>CleanCut uses Android&#39;s system media picker to select specific photos or videos and does not require full gallery access or broad storage permission.</p>
      <h2>4. Saved Files</h2>
      <p>Processed output is saved locally only when you choose to save it. Saved photos and videos remain on your device until you delete them.</p>
      <h2>5. Common Troubleshooting</h2>
      <ul>
<li>Restart the app.</li>
<li>Retry media selection using the system media picker.</li>
<li>Check that your device has enough free storage.</li>
<li>Check your internet connection for rewarded ads.</li>
<li>Update Android System WebView and Google Play services if ads or consent fail.</li>
<li>Try a shorter or smaller video if device resources are limited.</li>
</ul>
      <h2>6. Contact Support</h2>
      <p>Contact Hatch AI at <a href="mailto:info@HatchAI.net">info@HatchAI.net</a> for help with CleanCut – Media Cleaner.</p>
      <h2>Responsible Use</h2>
      <p>Only edit media you own or are authorized to modify. Read the <Link href="/cleancut/terms">Terms of Use</Link> for more information.</p>
    </>
  );
}
