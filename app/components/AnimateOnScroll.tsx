"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnimateOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-run the observer when the path changes
    const fadeEls = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("appear");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach((el) => obs.observe(el));

    return () => {
      fadeEls.forEach((el) => obs.unobserve(el));
    };
  }, [pathname]);

  return null;
}
