import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    // function to classify images
    function markSnapshotImages() {
      const allImages = document.querySelectorAll(".markdown img");

      allImages.forEach((img) => {
        if (
          img.classList.contains("enterprise-badge-img") || // skip enterprise badges
          img.closest(".inline-badge") ||                   // skip inline badges
          img.width <= 64 ||                                // skip tiny icons
          img.closest("a")                                  // ✅ skip linked images
        ) {
          return;
        }
        img.classList.add("snapshot-img");
      });
    }

    // run initially
    markSnapshotImages();

    // re-run when Docusaurus SPA swaps content
    const observer = new MutationObserver(markSnapshotImages);
    observer.observe(document.body, { childList: true, subtree: true });

    function handleClick(e) {
      if (
        e.target.tagName === "IMG" &&
        e.target.closest(".markdown") &&
        e.target.classList.contains("snapshot-img")
      ) {
        const src = e.target.src;
        const lightbox = document.createElement("div");
        lightbox.classList.add("image-lightbox");
        lightbox.innerHTML = `<img src="${src}" />`;

        function closeLightbox() {
          lightbox.classList.add("closing");
          setTimeout(() => lightbox.remove(), 250); // match zoomOut duration
        }

        // Close on click
        lightbox.onclick = closeLightbox;

        // Close on ESC key
        document.addEventListener(
          "keydown",
          (ev) => {
            if (ev.key === "Escape") closeLightbox();
          },
          { once: true }
        );

        document.body.appendChild(lightbox);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!location.hash) return;

    // Clean the hash: remove ?utm_* junk
    const cleanId = location.hash
      .replace('#', '')
      .split('?')[0];

    if (!cleanId) return;

    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView();
    }
  }, [location.pathname]);

  return <>{children}</>;
}
