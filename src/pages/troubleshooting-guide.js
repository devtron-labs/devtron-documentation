import React, { useMemo, useState } from "react";
// ⬇️ STANDARD DOCUSAURUS LAYOUT (Adds Navbar & Footer)
import Layout from '@theme/Layout';
// ⬇️ STANDARD MARKDOWN RENDERER
import ReactMarkdown from 'react-markdown';
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
  /* RESET */
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
    border-color: #7A8ADE; 
    box-shadow: 0 4px 16px rgba(122, 138, 222, 0.1);
  }

  /* HEADER & CONTENT */
  .ts-header-row {
    display: grid; 
    grid-template-columns: 1fr 40px 40px; 
    align-items: center;
    height: 90px !important; padding: 0 1.5rem; cursor: pointer; background: transparent;
  }
  
  .ts-content {
    padding: 1.5rem; border-top: 1px solid var(--ifm-color-emphasis-200);
    width: 100%; background-color: rgba(0,0,0,0.01);
  }

  /* --- MARKDOWN STYLING --- */
  .ts-md p { margin-bottom: 0.5rem; line-height: 1.6; font-size: 1rem; }
  .ts-md p:last-child { margin-bottom: 0; }
  .ts-md * { max-width: 100%; white-space: normal !important; overflow-wrap: anywhere !important; word-break: break-word !important; }
  
  .ts-md pre { 
    background: var(--ifm-color-emphasis-100); 
    border: 1px solid var(--ifm-color-emphasis-200); 
    border-radius: 6px; padding: 10px; margin: 0.5rem 0; overflow-x: auto; 
  }
  
  .ts-md code { 
    background: var(--ifm-color-emphasis-100); 
    border: 1px solid var(--ifm-color-emphasis-200); 
    padding: 2px 6px; border-radius: 4px; 
    font-size: 0.9em; font-family: var(--ifm-font-family-monospace); 
    white-space: pre-wrap !important; word-break: break-all !important; 
  }
  
  .ts-md a { color: #0066cc; text-decoration: none; font-weight: 500; }
  .ts-md a:hover { text-decoration: underline; color: #0066cc; }
  [data-theme='dark'] .ts-md a { color: #53b7d2; }
  [data-theme='dark'] .ts-md a:hover { color: #53b7d2; }

  .ts-md ul, .ts-md ol { padding-left: 1.2rem; margin: 0.5rem 0; }
  .ts-md li { margin-bottom: 0.25rem; }
  .ts-md li p { margin: 0; }
  .ts-md img { max-width: 100%; border-radius: 6px; border: 1px solid var(--ifm-color-emphasis-200); margin-top: 0.5rem; }

  /* SECTION HEADERS */
  .ts-content h4 {
    margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 0.9rem;
    font-weight: 700; text-transform: uppercase; 
    color: var(--ifm-color-emphasis-700);
    letter-spacing: 0.05em;
  }
  .ts-content h4:first-child { margin-top: 0; }

  /* SIDEBAR */
  .ts-sidebar { display: flex; flex-direction: column; gap: 4px; position: sticky; top: 80px; }
  
  .ts-btn {
    text-align: left; padding: 8px 12px; background: transparent;
    border: 1px solid transparent; 
    border-left: 4px solid transparent;
    border-radius: 4px; 
    cursor: pointer; width: 100%;
    color: var(--ifm-font-color-base); font-size: 0.9rem; 
    transition: all 0.2s ease;
  }
  
  .ts-btn:hover { background: rgba(0,0,0,0.05); }
  [data-theme='dark'] .ts-btn:hover { background: rgba(255, 255, 255, 0.05); }
  
  /* ACTIVE STATE: LIGHT MODE */
  .ts-btn.active { 
    background-color: #f0f8ff; 
    color: #0066cc; 
    border-left-color: #1976d2; 
    font-weight: 600; 
    border-radius: 0 4px 4px 0; 
  }

  /* ACTIVE STATE: DARK MODE */
  [data-theme='dark'] .ts-btn.active {
    background-color: rgba(255, 215, 0, 0.1); 
    color: #ffffff;
    border-left-color: #FFD700;
    font-weight: 600;
  }

  /* ICONS */
  .ts-icon-btn {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 4px;
    color: var(--ifm-color-emphasis-700);
    transition: all 0.2s;
  }
  .ts-icon-btn:hover { 
    background-color: var(--ifm-color-emphasis-200); 
    color: var(--ifm-color-primary); 
  }
  [data-theme='dark'] .ts-icon-btn { color: var(--ifm-color-emphasis-500); }
  [data-theme='dark'] .ts-icon-btn:hover { color: #fff; }
  .ts-rotate-icon { transition: transform 0.2s; }

  /* MODAL */
  .ts-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease-out;
  }
  .ts-modal {
    background: var(--ifm-background-surface-color);
    width: 100%; max-width: 650px; max-height: 90vh; overflow-y: auto;
    border-radius: 12px; 
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border: 1px solid var(--ifm-color-emphasis-200);
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ts-modal-header {
    padding: 1.5rem; border-bottom: 1px solid var(--ifm-color-emphasis-200);
    display: flex; justify-content: space-between; align-items: center;
  }
  .ts-modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
  
  /* FORM ELEMENTS */
  .ts-form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .ts-form-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4px; }
  .ts-label { font-size: 0.9rem; font-weight: 600; color: var(--ifm-color-emphasis-800); margin: 0; }
  .ts-helper { font-size: 0.8rem; color: var(--ifm-color-emphasis-600); margin-top: 2px; }
  .ts-link-btn { background: none; border: none; padding: 0; color: var(--ifm-color-primary); font-size: 0.85rem; cursor: pointer; text-decoration: underline; }
  
  /* --- TABS (Segmented Control Style) --- */
  .ts-tabs { 
    display: flex; gap: 2px; 
    background: var(--ifm-color-emphasis-200); 
    padding: 3px; border-radius: 6px; 
    align-items: center;
  }
  
  .ts-tab-btn {
    background: transparent; border: none; padding: 4px 12px; 
    font-size: 0.75rem; font-weight: 600;
    color: var(--ifm-color-emphasis-600); 
    cursor: pointer; border-radius: 4px; transition: all 0.2s;
  }
  
  .ts-tab-btn:hover {
    color: var(--ifm-color-emphasis-800);
  }

  /* Active Tab: LIGHT Mode (White Pill) */
  .ts-tab-btn.active { 
    background: #fff; 
    color: var(--ifm-color-primary); 
    box-shadow: 0 1px 2px rgba(0,0,0,0.15); 
  }
  
  /* Active Tab: DARK Mode (Lighter Grey Pill) */
  [data-theme='dark'] .ts-tab-btn.active { 
    background-color: var(--ifm-color-emphasis-300); /* Distinct from container */
    color: #fff; /* High visibility white */
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* --- INPUTS & ALIGNMENT --- */
  .ts-input, .ts-select {
    padding: 0 12px;
    padding-right: 32px; /* Space for arrow */
    border-radius: 6px;
    border: 1px solid var(--ifm-color-emphasis-400);
    background-color: var(--ifm-background-surface-color);
    color: var(--ifm-font-color-base); 
    font-size: 0.95rem; 
    width: 100%;
    height: 42px; /* Fixed match */
    box-sizing: border-box;
  }

  /* Custom Arrow for Dropdown */
  .ts-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Grey Arrow for Light Mode */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }

  /* White Arrow for Dark Mode */
  [data-theme='dark'] .ts-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  }
  
  .ts-textarea { 
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid var(--ifm-color-emphasis-400);
    background: var(--ifm-background-surface-color);
    color: var(--ifm-font-color-base); 
    font-size: 0.95rem; 
    width: 100%;
    min-height: 100px; 
    resize: vertical; 
    font-family: inherit; 
    box-sizing: border-box;
  }
  
  .ts-input:focus, .ts-textarea:focus, .ts-select:focus { 
    outline: none; border-color: var(--ifm-color-primary); 
  }

  .ts-preview-box {
    padding: 12px; border: 1px solid var(--ifm-color-emphasis-300); border-radius: 6px;
    background: var(--ifm-color-emphasis-0); min-height: 100px;
    font-size: 0.95rem;
  }

  .ts-modal-footer {
    padding: 1.5rem; border-top: 1px solid var(--ifm-color-emphasis-200);
    display: flex; justify-content: flex-end; gap: 1rem;
    align-items: center;
    background: var(--ifm-color-emphasis-100);
  }

  .ts-batch-indicator {
    margin-right: auto; 
    font-size: 0.85rem; 
    font-weight: 600; 
    color: var(--ifm-color-success);
    background: var(--ifm-color-emphasis-200);
    padding: 4px 8px;
    border-radius: 4px;
  }

  /* BUTTONS */
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

  /* Save & Add Another (Distinct Secondary) */
  .ts-btn-add {
    border: 1px solid var(--ifm-color-primary) !important;
    color: var(--ifm-color-primary) !important;
  }
  .ts-btn-add:hover {
    background-color: var(--ifm-color-emphasis-200) !important;
  }
  [data-theme='dark'] .ts-btn-add {
    color: #fff !important; border-color: #fff !important;
  }
  [data-theme='dark'] .ts-btn-add:hover {
    background-color: rgba(255,255,255,0.1) !important;
  }

  .ts-btn-primary {
    border: 1px solid var(--ifm-color-primary) !important;
    color: var(--ifm-color-primary) !important;
  }
  .ts-btn-primary:hover {
    background-color: rgba(0,0,0,0.05) !important;
    text-decoration: none !important;
  }
  
  [data-theme='dark'] .ts-btn-primary {
    border-color: #fff !important; 
    color: #fff !important;
  }
  [data-theme='dark'] .ts-btn-primary:hover {
    border-color: #FFD700 !important;
    color: #FFD700 !important;
    background-color: rgba(255, 215, 0, 0.1) !important;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @media (max-width: 900px) {
    .ts-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .ts-sidebar { position: static; flex-direction: row; overflow-x: auto; padding-bottom: 1rem; border-bottom: 1px solid var(--ifm-color-emphasis-200); }
    .ts-btn { width: auto; white-space: nowrap; border: 1px solid var(--ifm-color-emphasis-200); }
    .ts-header-row { height: auto !important; min-height: 80px; padding: 1rem; }
    .ts-modal { max-height: 100vh; border-radius: 0; height: 100%; }
    .ts-modal-footer { flex-direction: column; gap: 0.5rem; }
    .ts-batch-indicator { margin-right: 0; margin-bottom: 0.5rem; width: 100%; text-align: center; }
    .ts-btn-action { width: 100%; }
  }
`;

// Simple SVG Icons
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// --- HELPER COMPONENT: MARKDOWN INPUT ---
const MarkdownInput = ({ label, name, value, onChange, placeholder, helperText, isSteps = false, isImages = false }) => {
  const [mode, setMode] = useState('write'); 

  const renderPreview = () => {
    if (!value) return <span style={{color: 'var(--ifm-color-emphasis-500)', fontStyle: 'italic'}}>Nothing to preview</span>;

    if (isImages) {
      const urls = value.split(',').map(u => u.trim()).filter(u => u);
      if (urls.length === 0) return <span style={{color: 'var(--ifm-color-emphasis-500)', fontStyle: 'italic'}}>No valid URLs found</span>;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {urls.map((url, i) => (
            <ReactMarkdown key={i}>{`![Screenshot ${i+1}](${url})`}</ReactMarkdown>
          ))}
        </div>
      );
    }

    if (isSteps) {
      return (
        <ol style={{paddingLeft: '1.2rem', margin: 0}}>
          {value.split('\n').filter(line => line.trim() !== '').map((step, i) => (
            <li key={i}><ReactMarkdown>{step}</ReactMarkdown></li>
          ))}
        </ol>
      );
    }

    return <ReactMarkdown>{value}</ReactMarkdown>;
  };

  return (
    <div className="ts-form-group">
      <div className="ts-form-header">
        <label className="ts-label">{label}</label>
        <div className="ts-tabs">
          <button type="button" className={`ts-tab-btn ${mode==='write'?'active':''}`} onClick={()=>setMode('write')}>Write</button>
          <button type="button" className={`ts-tab-btn ${mode==='preview'?'active':''}`} onClick={()=>setMode('preview')}>Preview</button>
        </div>
      </div>
      
      {mode === 'write' ? (
        <textarea 
          required={!isImages && !isSteps} 
          name={name} 
          className="ts-textarea" 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange} 
        />
      ) : (
        <div className="ts-preview-box ts-md">
          {renderPreview()}
        </div>
      )}
      
      {mode === 'write' && helperText && (
        <small className="ts-helper">{helperText}</small>
      )}
    </div>
  );
};

export default function TroubleshootingGuide() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [batch, setBatch] = useState([]); // --- BATCH STATE ---

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

  // --- HELPER: Process Form Data into Object ---
  const getFaqObject = () => {
    if (!formData.title || !formData.problem) return null; // Minimal validation

    const stepsArray = formData.steps.split('\n').filter(line => line.trim() !== '');
    const imagesArray = formData.images
      ? formData.images.split(',').map(img => img.trim()).filter(img => img !== '')
      : [];

    return {
      id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      title: formData.title,
      summary: formData.problem.substring(0, 80) + "...",
      problem: formData.problem,
      rootCause: formData.rootCause || "N/A",
      steps: stepsArray,
      images: imagesArray
    };
  };

  // --- HANDLER: Add to Batch ---
  const handleAddToBatch = () => {
    if (!formData.title || !formData.problem || !formData.steps) {
      alert("Please fill in all required fields (Title, Problem, Steps).");
      return;
    }
    const obj = getFaqObject();
    if (obj) {
      setBatch(prev => [...prev, obj]);
      // Reset form but keep category
      setFormData(prev => ({ ...prev, title: "", problem: "", rootCause: "", steps: "", images: "" }));
    }
  };

  // --- HANDLER: Submit All ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine batch + current form (if filled)
    let finalBatch = [...batch];
    if (formData.title && formData.problem && formData.steps) {
      const currentObj = getFaqObject();
      if (currentObj) finalBatch.push(currentObj);
    }

    if (finalBatch.length === 0) {
      alert("Please fill in the form or add items to the batch first.");
      return;
    }

    // Generate JSON string
    const jsonString = finalBatch.map(item => JSON.stringify(item, null, 2)).join(",\n");

    navigator.clipboard.writeText("\n" + jsonString + ",\n").then(() => {
      alert(`✅ ${finalBatch.length} FAQ(s) copied to clipboard!\n\nRedirecting to GitHub...\n\n1. Wait for file to load.\n2. Paste (Ctrl+V) right after the opening bracket ' [ ' at the VERY TOP of the file.\n3. Click 'Propose changes'.`);
      const githubEditUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/edit/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`;
      window.open(githubEditUrl, '_blank');
      
      // Reset everything
      setIsModalOpen(false);
      setIsCustomCategory(false);
      setBatch([]);
      setFormData({ title: "", category: "Installation", problem: "", rootCause: "", steps: "", images: "" });
    }).catch(err => {
      alert("Failed to copy data.");
    });
  };

  const handleEdit = (e, item) => {
    e.stopPropagation(); 
    navigator.clipboard.writeText(item.id).then(() => {
      alert(`✅ ID copied: "${item.id}"\n\nRedirecting to GitHub...\n\n1. Press Ctrl+F (or Cmd+F) in the editor.\n2. Paste (Ctrl+V) to find this block.\n3. Edit or Delete the JSON block.\n4. Click 'Propose changes'.`);
      const githubEditUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/edit/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`;
      window.open(githubEditUrl, '_blank');
    });
  };

  return (
    <Layout
      title="Troubleshooting"
      description="Find solutions for common Devtron issues."
    >
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
              
              <button onClick={() => setIsModalOpen(true)} className="ts-btn-action ts-btn-primary">
                + Add FAQ
              </button>
            </div>

            {filteredData.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div key={item.id} className="ts-card">
                  
                  {/* CARD HEADER */}
                  <div className="ts-header-row" onClick={() => toggleItem(item.id)}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ifm-color-emphasis-600)', marginBottom: '6px' }}>{item.category}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</span>
                    </div>
                    <div className="ts-icon-btn" title="Edit or Delete" onClick={(e) => handleEdit(e, item)}>
                      <EditIcon />
                    </div>
                    <div className="ts-icon-btn ts-rotate-icon" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                      <ArrowIcon />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
                    <div style={{ overflow: 'hidden', minWidth: 0 }}>
                      <div className="ts-content ts-md">
                        {item.problem && (<><h4>Problem</h4><ReactMarkdown>{item.problem}</ReactMarkdown></>)}
                        {item.rootCause && (<><h4>Root Cause</h4><ReactMarkdown>{item.rootCause}</ReactMarkdown></>)}
                        {item.steps && item.steps.length > 0 && (<><h4>Resolution</h4><ol style={{ paddingLeft: '1.2rem', margin: 0 }}>{item.steps.map((step, idx) => (<li key={idx}><ReactMarkdown>{step}</ReactMarkdown></li>))}</ol></>)}
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
                  
                  {/* --- CATEGORY SELECTOR --- */}
                  <div className="ts-form-group">
                    <div className="ts-form-header">
                      <label className="ts-label">Category</label>
                      {isCustomCategory ? (
                        <button 
                          type="button" 
                          className="ts-link-btn" 
                          onClick={() => { setIsCustomCategory(false); setFormData(prev => ({...prev, category: categories[1] || "Installation"})) }}
                        >
                          Select existing
                        </button>
                      ) : null}
                    </div>

                    {isCustomCategory ? (
                      <input
                        required
                        name="category"
                        className="ts-input"
                        placeholder="Enter new category name..."
                        value={formData.category}
                        onChange={handleInputChange}
                        autoFocus
                      />
                    ) : (
                      <select
                        name="category"
                        className="ts-select"
                        value={formData.category}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setIsCustomCategory(true);
                            setFormData(prev => ({...prev, category: ""}));
                          } else {
                            handleInputChange(e);
                          }
                        }}
                      >
                        <option value="__NEW__" style={{fontWeight: 'bold', color: 'var(--ifm-color-primary)'}}>+ Create New Category</option>
                        {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    )}
                  </div>
                  
                  <div className="ts-form-group">
                    <label className="ts-label">Issue Title</label>
                    <input required name="title" className="ts-input" placeholder="e.g. Pipeline failing with error 403" value={formData.title} onChange={handleInputChange} />
                  </div>

                  <MarkdownInput label="Problem Description" name="problem" value={formData.problem} onChange={handleInputChange} placeholder="What is the error? (Markdown supported)" />
                  <MarkdownInput label="Root Cause (Optional)" name="rootCause" value={formData.rootCause} onChange={handleInputChange} placeholder="Why did this happen? (Markdown supported)" />
                  <MarkdownInput label="Resolution Steps" name="steps" value={formData.steps} onChange={handleInputChange} placeholder="Step 1...&#10;Step 2... (One step per line)" isSteps={true} helperText="💡 Enter each step on a new line." />
                  <MarkdownInput label="Screenshot URLs (Optional)" name="images" value={formData.images} onChange={handleInputChange} placeholder="https://example.com/img1.png, https://example.com/img2.png" isImages={true} helperText="💡 Paste image URLs separated by commas." />

                </div>

                <div className="ts-modal-footer">
                  {batch.length > 0 && <span className="ts-batch-indicator">{batch.length} FAQ{batch.length > 1 ? 's' : ''} in batch</span>}
                  <button type="button" className="ts-btn-action ts-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="button" className="ts-btn-action ts-btn-add" onClick={handleAddToBatch}>Save & Add Another</button>
                  <button type="submit" className="ts-btn-action ts-btn-primary">
                    {batch.length > 0 ? `Submit All (${batch.length + (formData.title ? 1 : 0)})` : "Submit to GitHub"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}