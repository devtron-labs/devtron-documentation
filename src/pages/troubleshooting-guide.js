import React, { useMemo, useState } from "react";
// ⬇️ MAKE SURE THIS IMPORT PATH IS CORRECT
import troubleshootingData from "@site/src/data/devtron-troubleshooting.json";

/* ==========================================================================
   ⚙️ GITHUB CONFIGURATION
   ==========================================================================
*/
const GITHUB_CONFIG = {
  owner: "Hii-Arpit",
  repo: "devtron-documentation",
  branch: "docv2-site",
  filePath: "src/data/devtron-troubleshooting.json"
};

/* ==========================================================================
   CSS STYLES
   ==========================================================================
*/
const STYLES = `
  html { overflow-y: scroll !important; }
  .ts-container * { box-sizing: border-box; }

  /* LAYOUT */
  .ts-grid {
    display: grid;
    grid-template-columns: 230px 1fr; 
    gap: 2.5rem;
    align-items: start;
    width: 100%;
  }

  /* CARDS */
  .ts-card {
    width: 100%; 
    background: var(--ifm-background-surface-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: all 0.2s ease;
  }
  .ts-card:hover {
    border-color: var(--ifm-color-primary);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  [data-theme='dark'] .ts-card:hover {
    border-color: var(--ifm-color-primary-lightest);
    box-shadow: 0 4px 16px rgba(122, 138, 222, 0.1);
  }

  /* HEADER & CONTENT */
  .ts-header-row {
    display: grid; grid-template-columns: 1fr 40px; align-items: center;
    height: 90px !important; padding: 0 1.5rem; cursor: pointer; background: transparent;
  }
  .ts-content {
    padding: 1.5rem; border-top: 1px solid var(--ifm-color-emphasis-200);
    width: 100%; background-color: rgba(0,0,0,0.01);
  }
  .ts-content * {
    max-width: 100%; white-space: normal !important;
    overflow-wrap: anywhere !important; word-break: break-word !important;
  }
  .ts-content pre, .ts-content code {
    white-space: pre-wrap !important; word-break: break-all !important;
    background: var(--ifm-color-emphasis-100); border: 1px solid var(--ifm-color-emphasis-200);
    padding: 10px; border-radius: 6px; font-size: 0.9em;
    font-family: var(--ifm-font-family-monospace);
  }
  .ts-content h4 {
    margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 0.9rem;
    font-weight: 700; text-transform: uppercase; color: var(--ifm-color-emphasis-700);
    letter-spacing: 0.05em;
  }
  .ts-content h4:first-child { margin-top: 0; }

  /* SIDEBAR */
  .ts-sidebar { display: flex; flex-direction: column; gap: 4px; position: sticky; top: 80px; }
  .ts-btn {
    text-align: left; padding: 10px 14px; background: transparent;
    border: 1px solid transparent; border-radius: 6px; cursor: pointer; width: 100%;
    color: var(--ifm-font-color-base); font-size: 0.95rem; transition: all 0.2s ease;
  }
  .ts-btn:hover { background: rgba(0,0,0,0.05); }
  .ts-btn.active { background: #f0f8ff; color: #0066cc; border-color: #1976d2; font-weight: 600; }
  [data-theme='dark'] .ts-btn.active {
    background: rgba(122, 138, 222, 0.15); color: var(--ifm-color-primary-lightest);
    border-color: var(--ifm-color-primary-lightest);
  }

  /* MODAL */
  .ts-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out;
  }
  .ts-modal {
    background: var(--ifm-background-surface-color);
    width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;
    border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border: 1px solid var(--ifm-color-emphasis-200);
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ts-modal-header {
    padding: 1.5rem; border-bottom: 1px solid var(--ifm-color-emphasis-200);
    display: flex; justify-content: space-between; align-items: center;
  }
  .ts-modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .ts-form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .ts-label { font-size: 0.9rem; font-weight: 600; color: var(--ifm-color-emphasis-800); }
  .ts-input, .ts-textarea, .ts-select {
    padding: 10px; border-radius: 6px;
    border: 1px solid var(--ifm-color-emphasis-400);
    background: var(--ifm-background-surface-color);
    color: var(--ifm-font-color-base); font-size: 0.95rem; width: 100%;
  }
  .ts-input:focus, .ts-textarea:focus { outline: none; border-color: var(--ifm-color-primary); }
  .ts-textarea { min-height: 100px; resize: vertical; font-family: inherit; }
  .ts-modal-footer {
    padding: 1.5rem; border-top: 1px solid var(--ifm-color-emphasis-200);
    display: flex; justify-content: flex-end; gap: 1rem;
    background: var(--ifm-color-emphasis-100);
  }

  /* BUTTONS (FIXED OUTLINE STYLE) */
  .ts-btn-action {
    background-color: transparent !important;
    padding: 10px 20px; border-radius: 6px; font-weight: 600;
    cursor: pointer; transition: all 0.2s ease;
  }
  .ts-btn-secondary {
    border: 1px solid var(--ifm-color-emphasis-600) !important;
    color: var(--ifm-font-color-base) !important;
  }
  .ts-btn-secondary:hover {
    border-color: var(--ifm-color-emphasis-800) !important;
    background-color: var(--ifm-color-emphasis-200) !important;
  }
  .ts-btn-primary {
    border: 1px solid var(--ifm-color-primary) !important;
    color: var(--ifm-color-primary) !important;
  }
  .ts-btn-primary:hover {
    background-color: var(--ifm-color-emphasis-200) !important;
    text-decoration: none !important;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @media (max-width: 900px) {
    .ts-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .ts-sidebar { position: static; flex-direction: row; overflow-x: auto; padding-bottom: 1rem; border-bottom: 1px solid var(--ifm-color-emphasis-200); }
    .ts-btn { width: auto; white-space: nowrap; border: 1px solid var(--ifm-color-emphasis-200); }
    .ts-header-row { height: auto !important; min-height: 80px; padding: 1rem; }
    .ts-modal { max-height: 100vh; border-radius: 0; height: 100%; }
  }
`;

export default function TroubleshootingGuide() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    title: "",
    category: "Installation",
    problem: "",
    rootCause: "",
    steps: "",
    images: "",
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = useMemo(() => {
    const set = new Set();
    troubleshootingData.forEach((item) => set.add(item.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    return troubleshootingData.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const haystack = [
        item.title, item.problem, item.rootCause, item.summary, ...(item.steps || [])
      ].join(" ").toLowerCase();
      return matchCategory && haystack.includes(query);
    });
  }, [search, activeCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Process Data
    const stepsArray = formData.steps.split('\n').filter(line => line.trim() !== '');
    const imagesArray = formData.images
      ? formData.images.split(',').map(img => img.trim()).filter(img => img !== '')
      : [];

    const jsonSnippet = {
      id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      title: formData.title,
      summary: formData.problem.substring(0, 80) + "...",
      problem: formData.problem,
      rootCause: formData.rootCause || "N/A",
      steps: stepsArray,
      images: imagesArray
    };

    const jsonString = JSON.stringify(jsonSnippet, null, 2);

    // 2. COPY TO CLIPBOARD with a TRAILING COMMA so it fits at the start of the list
    // Format: \n { ... },
    navigator.clipboard.writeText("\n" + jsonString + ",\n").then(() => {
      
      // 3. ALERT USER (Updated Instructions)
      alert("✅ Data copied to clipboard!\n\nRedirecting to GitHub...\n\n1. Wait for file to load.\n2. Paste (Ctrl+V) right after the opening bracket ' [ ' at the VERY TOP of the file.\n3. Click 'Propose changes'.");
      
      // 4. OPEN GITHUB EDIT PAGE
      const githubEditUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/edit/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`;
      
      window.open(githubEditUrl, '_blank');
      
      setIsModalOpen(false);
      setFormData({ title: "", category: "Installation", problem: "", rootCause: "", steps: "", images: "" });
    }).catch(err => {
      alert("Failed to copy data. Please manually copy the data from the console.");
      console.log(jsonString);
    });
  };

  return (
    <div className="ts-container" style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <style>{STYLES}</style>

      {/* HEADER */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Troubleshooting Devtron</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem' }}>
          Search across common issues, known bugs, and configuration fixes.
        </p>
        <input
          type="text"
          placeholder="Search errors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: '500px', padding: '14px', borderRadius: '8px',
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'var(--ifm-background-surface-color)', 
            color: 'var(--ifm-font-color-base)', fontSize: '1rem'
          }}
        />
      </div>

      {/* GRID */}
      <div className="ts-grid">
        
        {/* SIDEBAR */}
        <div className="ts-sidebar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ts-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ width: '100%', minWidth: 0 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ifm-color-emphasis-600)' }}>
              Showing {filteredData.length} {filteredData.length === 1 ? "Issue" : "Issues"}
            </span>
            
            {/* ADD FAQ BUTTON */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ts-btn-action ts-btn-primary"
            >
              + Add FAQ
            </button>
          </div>

          {filteredData.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div key={item.id} className="ts-card">
                <div className="ts-header-row" onClick={() => toggleItem(item.id)}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ifm-color-emphasis-600)', marginBottom: '6px' }}>{item.category}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-500)', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</div>
                </div>

                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div className="ts-content">
                      {item.problem && (<><h4>Problem</h4><p style={{ lineHeight: 1.6, fontSize: '1rem' }}>{item.problem}</p></>)}
                      {item.rootCause && (<><h4>Root Cause</h4><p style={{ lineHeight: 1.6, fontSize: '1rem' }}>{item.rootCause}</p></>)}
                      {item.steps && item.steps.length > 0 && (<><h4>Resolution</h4><ol style={{ paddingLeft: '1.2rem', margin: 0 }}>{item.steps.map((step, idx) => (<li key={idx} style={{ marginBottom: '0.5rem', lineHeight: 1.6, fontSize: '1rem' }}>{step}</li>))}</ol></>)}
                      {item.images && item.images.length > 0 && (<><h4>Screenshots</h4><div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>{item.images.map((imgSrc, idx) => (<img key={idx} src={imgSrc} alt="Troubleshooting" style={{ width: '100%', borderRadius: '6px', border: '1px solid var(--ifm-color-emphasis-200)' }} />))}</div></>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ADD FAQ MODAL --- */}
      {isModalOpen && (
        <div className="ts-modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false) }}>
          <div className="ts-modal">
            <div className="ts-modal-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New FAQ</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--ifm-color-emphasis-500)' }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="ts-modal-body">
                <div className="ts-form-group">
                  <label className="ts-label">Category</label>
                  <select name="category" className="ts-select" value={formData.category} onChange={handleInputChange}>
                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="ts-form-group">
                  <label className="ts-label">Issue Title</label>
                  <input required name="title" className="ts-input" placeholder="e.g. Pipeline failing with error 403" value={formData.title} onChange={handleInputChange} />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Problem Description</label>
                  <textarea required name="problem" className="ts-textarea" placeholder="What is the exact error message?" value={formData.problem} onChange={handleInputChange} />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Root Cause (Optional)</label>
                  <textarea name="rootCause" className="ts-textarea" style={{minHeight: '60px'}} placeholder="Why does this happen?" value={formData.rootCause} onChange={handleInputChange} />
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Resolution Steps</label>
                  <textarea required name="steps" className="ts-textarea" placeholder="Step 1...&#10;Step 2... (One step per line)" value={formData.steps} onChange={handleInputChange} />
                  <small style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.8rem' }}>Enter each step on a new line.</small>
                </div>

                <div className="ts-form-group">
                  <label className="ts-label">Screenshot URLs (Optional)</label>
                  <textarea name="images" className="ts-textarea" style={{ minHeight: '60px' }} placeholder="https://example.com/img1.png, https://example.com/img2.png" value={formData.images} onChange={handleInputChange} />
                  <small style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.8rem' }}>Separate multiple URLs with commas.</small>
                </div>

              </div>

              <div className="ts-modal-footer">
                <button type="button" className="ts-btn-action ts-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="ts-btn-action ts-btn-primary">Submit to GitHub</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}