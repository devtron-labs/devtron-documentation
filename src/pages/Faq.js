import React, { useState, useMemo } from "react";

/**
 * Updated FAQ page with robust color handling for Docusaurus light/dark themes.
 * Replace src/pages/Faq.jsx with this file.
 */

const faqData = [
  { category: "Getting Started", question: "What is Devtron?", answer: "Devtron is a comprehensive Kubernetes platform that simplifies application deployment and management. It provides tools for CI/CD, security scanning, resource management, and more." },
  { category: "Getting Started", question: "How do I get started with Devtron?", answer: "Start by installing Devtron on your Kubernetes cluster. You can choose from OSS, Freemium, or Enterprise editions. Follow the installation guide to set up your environment." },
  { category: "Installation", question: "What are the system requirements for Devtron?", answer: "Devtron requires a Kubernetes cluster (v1.16+), sufficient resources (minimum 2 vCPUs and 4GB RAM), and kubectl access to your cluster." },
  { category: "Installation", question: "How do I install Devtron?", answer: "You can install Devtron using Helm charts. Run the installation command with your preferred configuration and follow the setup wizard to complete the installation." },
  { category: "Application Management", question: "How do I create a new application?", answer: "Navigate to Applications → Create New App. Fill in the application details, select your Git repository, configure the build and deployment pipelines, and save your application." },
  { category: "Application Management", question: "Can I deploy multiple environments for one application?", answer: "Yes, Devtron supports multi-environment deployments. You can configure different environments (dev, staging, production) with specific configurations for each." },
  { category: "Security", question: "What security features does Devtron provide?", answer: "Devtron includes vulnerability scanning, security policy enforcement, RBAC, secrets management, and compliance reporting to ensure your applications are secure." },
  { category: "Security", question: "How are secrets managed in Devtron?", answer: "Secrets are encrypted at rest and in transit. You can manage secrets through the UI or integrate with external secret management systems like HashiCorp Vault." },
  { category: "Infrastructure Management", question: "How do I connect a Kubernetes cluster?", answer: "Go to Clusters & Environments → Add Cluster. Provide your cluster credentials (kubeconfig) and Devtron will establish the connection for resource management." },
  { category: "Infrastructure Management", question: "Can I manage multiple clusters?", answer: "Yes, Devtron supports multi-cluster management. You can connect and manage multiple Kubernetes clusters from a single Devtron instance." },
  { category: "Cost & Performance", question: "How does cost visibility work?", answer: "Devtron tracks resource usage across your clusters and applications, providing detailed cost breakdowns by namespace, application, and resource type." },
  { category: "Cost & Performance", question: "Can I set cost alerts?", answer: "Yes, you can configure cost thresholds and receive alerts when spending exceeds your defined limits." },
  { category: "Troubleshooting", question: "My deployment is failing, how do I debug?", answer: "Check the deployment logs in the App Details page. Review the CI/CD pipeline logs, examine pod events, and verify your configuration settings." },
  { category: "Troubleshooting", question: "How do I access application logs?", answer: "Navigate to your application, select the environment, and click on the pod to view real-time logs. You can also download logs for offline analysis." }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const categories = useMemo(() => Array.from(new Set(faqData.map((f) => f.category))), []);
  const filteredFAQs = useMemo(() => {
    return faqData.filter((f) => {
      const matchesSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const grouped = useMemo(() => {
    const groups = {};
    filteredFAQs.forEach((f) => {
      if (!groups[f.category]) groups[f.category] = [];
      groups[f.category].push(f);
    });
    return groups;
  }, [filteredFAQs]);

  return (
    <div className="faq-page-root" style={{ padding: "3.5rem 1rem", minHeight: "100vh" }}>
      {/* Localized CSS variables to make color behavior robust across themes */}
      <style>{`
        /* .faq-page container defines local variables that map to Docusaurus theme vars with fallbacks */
        .faq-page {
          --faq-text: var(--ifm-font-color-base, #0f172a);
          --faq-muted: var(--ifm-font-color-secondary, rgba(15,23,42,0.65));
          --faq-bg: var(--ifm-background-color, #ffffff);
          --faq-surface: var(--ifm-background-surface-color, #ffffff);
          --faq-border: var(--ifm-color-emphasis-200, rgba(15,23,42,0.08));
          --faq-primary: var(--ifm-color-primary, #10266b);
          --faq-emphasis-50: var(--ifm-color-emphasis-50, #f7fafc);
        }
        /* Ensure dark-mode-friendly fallbacks */
        @media (prefers-color-scheme: dark) {
          .faq-page {
            --faq-text: var(--ifm-font-color-base, #e6edf3);
            --faq-muted: var(--ifm-font-color-secondary, rgba(255,255,255,0.72));
            --faq-bg: var(--ifm-background-color, #0b0b0b);
            --faq-surface: var(--ifm-background-surface-color, #0f1720);
            --faq-border: var(--ifm-color-emphasis-200, rgba(255,255,255,0.06));
            --faq-primary: var(--ifm-color-primary, #1f6feb);
            --faq-emphasis-50: #022b46;;
          };
        }

        /* small cosmetic rules to keep layout neat */
        .faq-container { max-width: 900px; margin: 0 auto; color: var(--faq-text); background: var(--faq-bg); }
        .faq-search { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--faq-border); background: var(--faq-surface); color: var(--faq-text); font-size: 1rem; }
        .faq-badges { display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; margin-bottom: 10px; }
        .faq-badge { border-radius: 999px; border: 1px solid var(--faq-primary); padding: 8px 14px; font-size: 0.9rem; cursor:pointer; color:var(--faq-primary); background: transparent; user-select:none; display:inline-flex; align-items:center;}
        .faq-badge.active { background: var(--faq-primary); color: #fff; }
        .faq-card { background: var(--faq-surface); border: 1px solid var(--faq-border); border-radius: 8px; padding: 14px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.04); cursor:pointer; transition: all .16s ease; }
        .faq-card.open { background: var(--faq-emphasis-50); }
        html[data-theme="dark"] .faq-card.open { background: #022b46 !important; border-color: #1f6feb; }
        html[data-theme="dark"] .faq-card.open .faq-question { color: #ffffff; }
        html[data-theme="dark"] .faq-badge.active { background: #02385b; }
        html[data-theme="dark"] .faq-card.open .faq-answer { color: rgba(255,255,255,0.85); }
        html[data-theme="dark"] .faq-help { background: #333333; }
        html[data-theme="dark"] .faq-btn-primary { background: #02385b; color: var(--faq-primary); padding: 9px 16px; border-radius: 8px; text-decoration:none; font-weight:500;}
        .faq-question { display:flex; justify-content:space-between; align-items:center; font-weight:600; color: var(--faq-text); }
        .faq-answer { margin-top: 10px; color: var(--faq-muted); line-height:1.6; }
        .faq-section-title { font-size:1.5rem; margin-bottom: 12px; border-bottom: 2px solid var(--faq-border); padding-bottom: 8px; }
        .faq-help { margin-top: 2.5rem; padding: 18px; border-radius: 10px; background: var(--faq-emphasis-50); text-align:center; color: var(--faq-muted); }
        .faq-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:10px; }
        .faq-btn-primary { background: var(--faq-primary); color: #fff; padding: 9px 16px; border-radius: 8px; text-decoration:none; font-weight:500;}
        .faq-btn-outline { border: 1px solid var(--faq-border); color: var(--faq-primary); padding: 9px 16px; border-radius: 8px; text-decoration:none; font-weight:500; background: transparent; }
      `}</style>

      <div className="faq-page faq-container">
        <h1 style={{ textAlign: "center", fontSize: "2.6rem", marginBottom: 6 }}>Frequently Asked Questions</h1>
        <p style={{ textAlign: "center", color: "var(--faq-muted)", marginBottom: 20 }}>Find answers to common questions about Devtron</p>

        <div style={{ marginBottom: 10 }}>
          <input
            className="faq-search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="faq-badges" style={{ marginBottom: 8 }}>
          <div
            className={`faq-badge ${selectedCategory === null ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`faq-badge ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div style={{ color: "var(--faq-muted)", marginBottom: 14 }}>
          Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"}
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0", color: "var(--faq-muted)" }}>No questions found.</div>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} style={{ marginBottom: 26 }}>
              <h2 className="faq-section-title">{cat}</h2>
              {items.map((item, idx) => {
                const id = `${cat}-${idx}`;
                const open = openIndex === id;
                return (
                  <div
                    key={id}
                    className={`faq-card ${open ? "open" : ""}`}
                    onClick={() => setOpenIndex(open ? null : id)}
                    role="button"
                    aria-expanded={open}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setOpenIndex(open ? null : id);
                    }}
                  >
                    <div className="faq-question">
                      <div>{item.question}</div>
                      <div style={{ fontWeight: 700, color: "var(--faq-primary)" }}>{open ? "–" : "+"}</div>
                    </div>
                    {open && <div className="faq-answer">{item.answer}</div>}
                  </div>
                );
              })}
            </section>
          ))
        )}

        <div className="faq-help">
          <h3 style={{ margin: 0, marginBottom: 8, color: "var(--faq-text)" }}>Still have questions?</h3>
          <p style={{ margin: 0, marginBottom: 12 }}>Can’t find what you’re looking for? Visit our documentation or contact support.</p>
          <div className="faq-actions">
            <a className="faq-btn-primary" href="https://docs.venz.shop/" target="_blank" rel="noreferrer">View Documentation</a>
            <a className="faq-btn-outline" href="mailto:support@devtron.ai">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
