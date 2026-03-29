import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw, RotateCcw, WifiOff } from "lucide-react";
import { Component, ErrorInfo, ReactNode, useEffect, useState } from "react";

/* ─── Offline Banner ─── */
function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-label="You are offline"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A171E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "32px",
        fontFamily: "Gabarito, sans-serif",
      }}
    >
      <WifiOff size={56} style={{ color: "#C0E57A", flexShrink: 0 }} />

      <h1
        style={{
          fontFamily: "Dongle, sans-serif",
          fontSize: "clamp(48px, 8vw, 80px)",
          fontWeight: 700,
          color: "#F5F9EA",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        You're offline.
      </h1>

      <p
        style={{
          fontFamily: "Gabarito, sans-serif",
          fontSize: "18px",
          color: "#F5F9EA",
          margin: 0,
          textAlign: "center",
          maxWidth: "400px",
          opacity: 0.8,
        }}
      >
        Check your connection and try again.
      </p>

      <button
        onClick={() => location.reload()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 28px",
          borderRadius: "8px",
          background: "#C0E57A",
          color: "#0A171E",
          fontFamily: "Gabarito, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        <RefreshCw size={16} />
        Retry
      </button>
    </div>
  );
}

/* ─── Error Boundary ─── */
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const IS_PROD = import.meta.env.PROD;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console so errors appear in browser devtools and server logs.
    // Replace with a monitoring service (e.g. Sentry) when available.
    console.error("[ErrorBoundary] Uncaught render error:", error, info.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl mb-4">An unexpected error occurred.</h2>

            {/* Show technical detail only in development; hide in production. */}
            {!IS_PROD && (
              <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
                <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                  {this.state.error?.stack}
                </pre>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={this.handleRetry}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer"
                )}
              >
                <RefreshCw size={16} />
                Try again
              </button>

              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-muted text-muted-foreground",
                  "hover:opacity-90 cursor-pointer"
                )}
              >
                <RotateCcw size={16} />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <OfflineBanner />
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
