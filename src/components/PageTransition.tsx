import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fluid cross-fade + soft lift between routes.
 * Listens to pathname changes and re-mounts children with an entrance animation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [displayed, setDisplayed] = useState({ pathname, children });
  const [stage, setStage] = useState<"in" | "out">("in");
  const pendingChildren = useRef(children);

  // Keep latest children reference for the route we're transitioning to
  pendingChildren.current = children;

  useEffect(() => {
    if (pathname === displayed.pathname) {
      // Same route, just update children (e.g. data refresh)
      setDisplayed((d) => ({ ...d, children }));
      return;
    }
    // Start exit
    setStage("out");
    const t = window.setTimeout(() => {
      setDisplayed({ pathname, children: pendingChildren.current });
      // Force reflow then enter
      requestAnimationFrame(() => setStage("in"));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 280);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      key={displayed.pathname}
      className={`page-transition ${stage === "in" ? "page-in" : "page-out"}`}
    >
      {displayed.children}
    </div>
  );
}
