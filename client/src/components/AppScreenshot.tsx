/**
 * AppScreenshot – Reusable image component with onError-based conditional rendering.
 * If the image fails to load (e.g. 404), the component hides itself gracefully
 * instead of showing a broken image icon.
 *
 * Usage:
 *   <AppScreenshot src="/images/app-dashboard.webp" alt="Dashboard view" />
 *   <AppScreenshot src="/images/app-dashboard.webp" alt="Dashboard view" className="rounded-xl" width={600} height={400} />
 */

import { useState, type ImgHTMLAttributes } from "react";

export interface AppScreenshotProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  /** Image source URL */
  src: string;
  /** Accessible alt text describing the screenshot */
  alt: string;
  /** Optional fallback to render when the image fails to load */
  fallback?: React.ReactNode;
}

export default function AppScreenshot({
  src,
  alt,
  fallback = null,
  style,
  ...rest
}: AppScreenshotProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
      style={{ maxWidth: "100%", height: "auto", ...style }}
      {...rest}
    />
  );
}
