import React, { useMemo, useState } from "react";
import troubleshootingData from "@site/src/data/devtron-troubleshooting.json";
import "../css/troubleshooting.css";

export default function TroubleshootingGuide() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState({});

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = useMemo(() => {
    const set = new Set();
    troubleshootingData.forEach((item) => set.add(item.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return troubleshootingData.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const haystack = [
        item.title,
        item.summary,
        item.problem,
        item.rootCause,
        ...(item.steps || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchCategory && haystack.includes(q);
    });
  }, [search, activeCategory]);

  return (
    <div className="ts-wrapper">
      <div className="ts-header">
        <h1>Troubleshooting Devtron</h1>
        <p>Search across common issues, grouped by category.</p>
      </div>

      <input
        type="text"
        className="ts-search"
        placeholder="Search error message or keyword…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button className="ts-add-btn-disabled" disabled>
          Add FAQ (Login coming soon)
        </button>
      </div>

      {/* LAYOUT CONTAINER */}
      <div
        className="ts-layout"
        style={{
          display: "grid",
          // INLINE FIX: Strict grid columns
          gridTemplateColumns: "230px minmax(0, 1fr)",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* SIDEBAR */}
        <aside className="ts-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ts-category-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* MAIN RESULTS AREA */}
        <main
          className="ts-main"
          style={{
            // INLINE FIX: Allow shrinking
            minWidth: 0,
            width: "100%",
          }}
        >
          <div className="ts-result-count">
            Showing {filtered.length} {filtered.length === 1 ? "issue" : "issues"}
          </div>

          {filtered.map((item) => {
            const isOpen = openItems[item.id];

            return (
              <div
                key={item.id}
                className={`ts-card ${isOpen ? "open" : ""}`}
                style={{
                  // INLINE FIX: Force card containment
                  maxWidth: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {/* CARD HEADER */}
                <div
                  className="ts-card-header"
                  onClick={() => toggleOpen(item.id)}
                  title={item.title}
                  style={{
                    // INLINE FIX: Strict Height Enforcement
                    height: "90px",
                    minHeight: "90px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    className="ts-card-left"
                    style={{
                      minWidth: 0, // Allows text truncation
                      overflow: "hidden",
                    }}
                  >
                    <div className="ts-card-category">{item.category}</div>
                    <div className="ts-card-title">{item.title}</div>
                  </div>

                  <div className={`ts-chevron ${isOpen ? "open" : ""}`}>
                    ▶
                  </div>
                </div>

                {/* CARD BODY */}
                <div
                  className={`ts-card-body ${isOpen ? "open" : ""}`}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="ts-card-body-inner"
                    style={{
                      // INLINE FIX: Prevent inner blowout
                      minWidth: 0,
                      width: "100%",
                    }}
                  >
                    <div
                      className="ts-card-content"
                      style={{
                        // INLINE FIX: The "Nuclear" Word Break
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                      }}
                    >
                      {item.problem && (
                        <>
                          <h4>Problem</h4>
                          <p>{item.problem}</p>
                        </>
                      )}

                      {item.rootCause && (
                        <>
                          <h4>Root Cause</h4>
                          <p>{item.rootCause}</p>
                        </>
                      )}

                      {item.steps?.length > 0 && (
                        <>
                          <h4>Resolution</h4>
                          <ol>
                            {item.steps.map((step, i) => (
                              <li
                                key={i}
                                style={{
                                  // Force list items to wrap
                                  wordBreak: "break-word",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {step}
                              </li>
                            ))}
                          </ol>
                        </>
                      )}

                      {item.images?.length > 0 && (
                        <>
                          <h4>Screenshots</h4>
                          <div className="ts-images">
                            {item.images.map((src, i) => (
                              <img key={i} src={src} alt="Troubleshooting" />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}