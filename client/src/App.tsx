import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import React, { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Route-level code splitting -- every non-Home page is lazy loaded
const Features = React.lazy(() => import("./pages/Features"));
const ForDentists = React.lazy(() => import("./pages/ForDentists"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const About = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Waitlist = React.lazy(() => import("./pages/Waitlist"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

/**
 * Wraps route content in a CSS page-fade-in animation.
 * The key={location} causes React to remount the div on every route
 * change, re-triggering the animation. No Framer Motion required.
 */
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return (
    <div key={location} className="page-enter">
      {children}
    </div>
  );
}

/**
 * Announces SPA route changes to screen readers and moves keyboard
 * focus to the #main-content landmark -- WCAG 2.4.3 / 4.1.3
 */
function RouteAnnouncer() {
  const [location] = useLocation();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // A12: defer document.title read by one tick so react-helmet-async has time
    // to update the <title> tag before we announce the navigation (WCAG 4.1.3)
    const t = setTimeout(() => {
      const title = document.title;
      setAnnouncement(`Navigated to ${title}`);
      // Move focus to main content so keyboard users start at the top of the new page
      const main = document.getElementById("main-content");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
      // Clear after screen reader has had time to read it
      setTimeout(() => setAnnouncement(""), 1000);
    }, 0);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <RouteAnnouncer />
      <Suspense fallback={<div className="min-h-screen bg-[#0A171E]" />}>
      <PageWrapper>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/for-dentists" component={ForDentists} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/contact" component={Contact} />
          <Route path="/waitlist" component={Waitlist} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </PageWrapper>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {/* Skip to main content -- visually hidden, appears on keyboard focus (WCAG 2.4.1) */}
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
