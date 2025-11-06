# Devtron Documentation

Welcome to the official **Devtron Documentation Repository**
This repo hosts the complete documentation for installing, using, and managing Devtron, an open-source software delivery platform built on Kubernetes.

---

## 🚀 What is Devtron?

**[Devtron](https://devtron.ai)** is an open-source Kubernetes-native software delivery platform that simplifies complex CI/CD, infrastructure, and release management workflows.  

It provides:
* Unified dashboards for build, deploy, and monitoring
* GitOps-driven deployment (powered by ArgoCD)
* AI-powered debugging and recommendations
* Built-in vulnerability scanning
* Plugin ecosystem for extensibility
* Cluster and cost visibility
* Role-based access control (RBAC) and SSO integrations

With Devtron, teams can deploy and manage applications across multiple environments without the steep Kubernetes learning curve.

---

## 🧩 Repository Overview

This repository powers the **[Devtron Docs site](https://docs.devtron.ai)** using **Docusaurus v3**.  
It contains all documentation files, categorized and rendered as website pages.

### 📁 Folder Structure

| Path | Description |
|------|--------------|
| `/docs/` | Main documentation directory containing Markdown (`.md`) and MDX files. |
| `/docs/setup/` | Installation and configuration guides. |
| `/docs/user-guide/` | Core user guides including Application Management, Infra, Policies, etc. |
| `/docs/reference/` | FAQs, troubleshooting, and glossaries. |
| `/static/` | Static assets such as images and icons. |
| `/sidebars.js` | Defines documentation hierarchy and navigation structure. |
| `/docusaurus.config.js` | Core site configuration including theme and plugins. |
| `/src/` | Contains React components, layouts, and theme overrides. |

---

## 🧱 Docs Scaffolding Explained

The documentation follows a structured hierarchy defined in [`sidebars.js`](./sidebars.js):

| Section | Purpose |
|----------|----------|
| **Getting Started** | Onboarding and installation instructions for new users. |
| **Application Management** | Creating, configuring, and managing applications in Devtron. |
| **Infrastructure Management** | Managing clusters, resources, and node-level operations. |
| **Software Release Management** | Handling multi-tenant releases and deployment visibility. |
| **Cost Visibility** | Insights into FinOps capabilities of Devtron. |
| **Security** | Insights into security scanning and policies. |
| **Automation & Enablement** | Job automation, task configuration, and workflow management. |
| **AI Recommendations** | Features powered by Devtron’s AI system. |
| **Global Configurations** | Managing host URL, GitOps, SSO, permissions, and global policies. |
| **Resources** | References, integrations, upgrades, and use cases. |

Each folder contains a `README.md` file that serves as an index page and links to nested topics.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
* **Node.js** ≥ 18.x  
* **npm** or **Yarn** or 

### Installation

```bash
# Clone the repo
git clone https://github.com/devtron-labs/devtron-documentation.git
cd devtron-docs

# Install dependencies
npm install
# or
yarn install
```

### Run the Docs Locally

```bash
npm run start
# or
yarn start
```

Your site will be available at 👉 **http://localhost:3000**

---

## 📦 Build for Production

To generate an optimized static build resembling production behavior:

```bash
npm run build
# or
yarn build
```

This will create a production-ready site in the `/build` directory. Use the following command to access it:

```bash
npm run serve
# or
yarn serve
```

Your site will be available at 👉 **http://localhost:3000**

---

## 🧑‍💻 Contributing Guidelines

We welcome contributions from both internal as well as external contributors.  
Whether it’s fixing typos, improving clarity, or adding new guides, your help makes our documentation better.

### Quick Start
1. Fork this repository  
2. Create a branch (`git checkout -b feature/add-new-guide`)  
3. Make your changes  
4. Commit and push  
5. Open a Pull Request (PR) to the `main` branch  

---

## 🧭 Writing Guidelines

* Use clear, concise language  
* Use title case for titles and headings.
* Prefer active voice (e.g., “Click Deploy” instead of “The button should be clicked”)  
* Use fenced code blocks for commands or YAML  
* Use Docusaurus admonitions (`:::tip`, `:::warning`, etc.) for emphasis  
* Keep paragraphs short and scannable  

---

## 📘 License

This repository is licensed under the **Apache 2.0 License**.  
See the [LICENSE](./LICENSE) file for more details.

---

## 🌐 Useful Links

* [Devtron Website](https://devtron.ai)  
* [Docs Portal](https://docs.devtron.ai)  
* [GitHub Repository](https://github.com/devtron-labs/devtron)  
* [Join the Slack Community](https://devtron.ai/community)  
* [Release Notes](https://github.com/devtron-labs/devtron/releases)
