// src/components/SupademoEmbed.jsx
import React from "react";

export default function SupademoEmbed({ src, id }) {
  // if user passed id, build embed url; otherwise use src
  const finalSrc = (id
    ? `https://app.supademo.com/embed/${id}`
    : String(src || "")
  ).trim();

  // ensure we use the embed path and add query params if not present
  const normalized = (() => {
    if (!finalSrc) return "";
    // if path contains '/demo/' convert to '/embed/'
    const asEmbed = finalSrc.replace("/demo/", "/embed/");
    // add params if missing
    return asEmbed.includes("?") ? asEmbed : `${asEmbed}?embed_v=2&utm_source=embed`;
  })();

  if (!normalized) return null;

  return (
    <div
      style={{
        position: "relative",
        boxSizing: "content-box",
        maxHeight: "80vh",
        width: "90%",
        margin: "0 auto",
        aspectRatio: "1.988950276243094",
        padding: "40px 0",
      }}
    >
      <iframe
        src={normalized}
        loading="lazy"
        title="Supademo Demo"
        allow="clipboard-write"
        frameBorder="0"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </div>
  );
}
