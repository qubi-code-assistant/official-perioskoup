import { useEffect, useRef, useCallback } from "react";
import { capture } from "@/lib/analytics";

/**
 * Tracks form start (first field focus) and abandonment (exit without submit).
 *
 * Returns:
 * - onFieldFocus: attach to onFocus on form inputs
 * - markSubmitted: call after successful submission
 */
export function useFormTracking(
  formName: "waitlist" | "contact",
  page: string
) {
  const started = useRef(false);
  const submitted = useRef(false);

  const onFieldFocus = useCallback(() => {
    if (!started.current) {
      started.current = true;
      capture("form_started", { form: formName, page });
    }
  }, [formName, page]);

  const markSubmitted = useCallback(() => {
    submitted.current = true;
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (started.current && !submitted.current) {
        capture("form_abandoned", { form: formName, page });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Also fire on unmount (route change)
      if (started.current && !submitted.current) {
        capture("form_abandoned", { form: formName, page });
      }
    };
  }, [formName, page]);

  return { onFieldFocus, markSubmitted };
}
