import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { 
  BookOpen, 
  Download, 
  Box, 
  Server, 
  Package, 
  DollarSign, 
  Shield, 
  Zap, 
  Database, 
  Brain, 
  Settings, 
  FileText 
} from 'lucide-react';
import styles from './index.module.css';

// Icon component wrapper
const IconWrapper = ({ Icon, className }) => (
  <Icon className={className} size={32} strokeWidth={1.5} />
);

// Feature sections based on sidebar structure
const features = [
  {
    title: 'Getting Started',
    Icon: BookOpen,
    description: 'Learn the basics and get up and running with Devtron quickly.',
    link: '/docs',
    color: '#4F46E5',
  },
  {
    title: 'Install Devtron',
    Icon: Download,
    description: 'Choose from OSS, Freemium, or Enterprise installation options.',
    link: '/docs/setup/install',
    color: '#7C3AED',
  },
  {
    title: 'Application Management',
    Icon: Box,
    description: 'Create, configure, and deploy applications with ease.',
    link: '/docs/user-guide/app-management',
    color: '#2563EB',
  },
  {
    title: 'Infrastructure Management',
    Icon: Server,
    description: 'Browse resources, manage clusters, and monitor your infrastructure.',
    link: '/docs/user-guide/infra-management',
    color: '#0891B2',
  },
  {
    title: 'Software Release Management',
    Icon: Package,
    description: 'Manage tenants and distribute releases efficiently.',
    link: '/docs/user-guide/software-distribution-hub',
    color: '#059669',
  },
  {
    title: 'Cost Visibility',
    Icon: DollarSign,
    description: 'Track and optimize your infrastructure costs.',
    link: '/docs/user-guide/finops',
    color: '#10B981',
  },
  {
    title: 'Security',
    Icon: Shield,
    description: 'Implement security scans and policies for your applications.',
    link: '/docs/user-guide/security-features',
    color: '#DC2626',
  },
  {
    title: 'Automation & Enablement',
    Icon: Zap,
    description: 'Automate workflows and create jobs for your pipelines.',
    link: '/docs/user-guide/automation',
    color: '#F59E0B',
  },
  {
    title: 'Backup & Restore',
    Icon: Database,
    description: 'Protect your data with backup and restore capabilities.',
    link: '/docs/user-guide/storageops/backup-and-restore',
    color: '#8B5CF6',
  },
  {
    title: 'AI Recommendations',
    Icon: Brain,
    description: 'Get intelligent recommendations for your applications.',
    link: '/docs/user-guide/ai-recommendations',
    color: '#EC4899',
  },
  {
    title: 'Global Configurations',
    Icon: Settings,
    description: 'Configure clusters, authorization, and system-wide settings.',
    link: '/docs/user-guide/global-configurations',
    color: '#6366F1',
  },
  {
    title: 'Resources',
    Icon: FileText,
    description: 'Access glossary, FAQs, integrations, and upgrade guides.',
    link: '/docs/reference/resources',
    color: '#64748B',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>Devtron Documentation</h1>
        <p className={styles.heroSubtitle}>
          Your comprehensive guide to Kubernetes application delivery and management
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.primaryButton)}
            to="docs">
            Get Started
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.secondaryButton)}
            to="/docs/setup/install">
            Install Devtron
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, Icon, description, link, color }) {
  return (
    <div className={styles.featureCard}>
      <Link to={link} className={styles.featureCardLink}>
        <div className={styles.featureIconWrapper} style={{ backgroundColor: `${color}15` }}>
          <IconWrapper Icon={Icon} className={styles.featureIcon} style={{ color }} />
        </div>
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureArrow} style={{ color }}>→</div>
      </Link>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2 className={styles.sectionTitle}>Explore Devtron</h2>
          <p className={styles.sectionSubtitle}>
            Navigate through comprehensive guides and documentation for all Devtron features
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  const quickLinks = [
    { title: 'CI/CD Pipeline Setup', link: '/docs/user-guide/creating-application/workflow' },
    { title: 'Chart Store', link: '/docs/user-guide/deploy-chart' },
    { title: 'Troubleshooting', link: '/docs/FAQs/devtron-troubleshoot' },
  ];

  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.quickLinksGrid}>
          {quickLinks.map((link, idx) => (
            <Link key={idx} to={link.link} className={styles.quickLinkCard}>
              <span className={styles.quickLinkTitle}>{link.title}</span>
              <span className={styles.quickLinkArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Devtron Documentation - Comprehensive guide for Kubernetes application delivery">
      <HomepageHeader />
      <main>
        <FeaturesSection />
        {/* <QuickLinks /> */}
      </main>
    </Layout>
  );
}
