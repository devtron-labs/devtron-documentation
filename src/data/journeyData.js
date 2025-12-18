/**
 * 14-Day Devtron Learning Journey - Course Content
 * Edit this file to update course content for each day
 */

export const journeyData = {
  title: "14-Day Devtron Mastery Journey",
  subtitle: "From Beginner to Pro User",
  description: "Master Devtron Freemium and all the enterprise features in just 14 days with our structured learning path",
  days: [
    {
      day: 0,
      title: "Devtron Freemium Installation",
      description: "One-time setup to experience all Devtron Enterprise Features",
      duration: "10–15 mins",
      difficulty: "Beginner",
      targets: [
        "Install Devtron Freemium on a cluster",
        "Verify Devtron UI access",
        "Familiarize yourself with core navigation"
      ],
      videos: [
        {
          title: "What is Devtron and how it works",
          url: "https://youtube.com/watch?v=example1",
          duration: "12:30"
        },
        {
          title: "Installing Devtron on Kubernetes",
          url: "https://youtube.com/watch?v=example2",
          duration: "18:45"
        }
      ],
      resources: [
        {
          title: "Devtron Installation Guide",
          url: "https://docs.devtron.ai/setup/install"
        }
      ]
    },    
    {
      day: 1,
      title: "Getting Started with Devtron",
      description: "Set up your environment and understand the Devtron dashboard",
      duration: "45 mins",
      difficulty: "Beginner",
      objectives: [
        "Understand what Devtron is and its core benefits",
        "Navigate the Devtron dashboard confidently",
        "Set up your first Devtron environment"
      ],
      targets: [
        "Complete Devtron installation",
        "Explore all dashboard sections",
        "Connect your first cluster"
      ],
      videos: [
        {
          title: "Introduction to Devtron",
          url: "https://youtube.com/watch?v=example1",
          duration: "12:30"
        },
        {
          title: "Dashboard Walkthrough",
          url: "https://youtube.com/watch?v=example2",
          duration: "18:45"
        }
      ],
      resources: [
        {
          title: "Devtron Documentation",
          url: "https://docs.devtron.ai"
        }
      ]
    },
    {
      day: 2,
      title: "Understanding Applications",
      description: "Learn how to create and manage applications in Devtron",
      duration: "60 mins",
      difficulty: "Beginner",
      objectives: [
        "Create your first application in Devtron",
        "Understand application configurations",
        "Learn about Git repository integration"
      ],
      targets: [
        "Create a sample application",
        "Configure Git source",
        "Set up build configuration"
      ],
      videos: [
        {
          title: "Creating Your First App",
          url: "https://youtube.com/watch?v=example3",
          duration: "15:00"
        }
      ],
      resources: []
    },
    {
      day: 3,
      title: "CI/CD Pipelines Basics",
      description: "Build your first continuous integration pipeline",
      duration: "75 mins",
      difficulty: "Beginner",
      objectives: [
        "Understand CI/CD concepts in Devtron",
        "Create a basic CI pipeline",
        "Trigger your first build"
      ],
      targets: [
        "Configure CI pipeline",
        "Run successful build",
        "View build logs and artifacts"
      ],
      videos: [
        {
          title: "CI Pipeline Deep Dive",
          url: "https://youtube.com/watch?v=example4",
          duration: "22:00"
        }
      ],
      resources: []
    },
    {
      day: 4,
      title: "Deployment Configurations",
      description: "Master deployment templates and configurations",
      duration: "60 mins",
      difficulty: "Intermediate",
      objectives: [
        "Understand deployment templates",
        "Configure environment variables",
        "Set up resource limits"
      ],
      targets: [
        "Customize deployment template",
        "Add environment variables",
        "Configure health checks"
      ],
      videos: [
        {
          title: "Deployment Templates Explained",
          url: "https://youtube.com/watch?v=example5",
          duration: "20:00"
        }
      ],
      resources: []
    },
    {
      day: 5,
      title: "Environment Management",
      description: "Set up and manage multiple environments",
      duration: "60 mins",
      difficulty: "Intermediate",
      objectives: [
        "Create development, staging, and production environments",
        "Understand environment overrides",
        "Manage environment-specific configurations"
      ],
      targets: [
        "Set up 3 environments",
        "Configure environment overrides",
        "Deploy to different environments"
      ],
      videos: [
        {
          title: "Multi-Environment Setup",
          url: "https://youtube.com/watch?v=example6",
          duration: "18:00"
        }
      ],
      resources: []
    },
    {
      day: 6,
      title: "CD Pipelines & Workflows",
      description: "Create sophisticated deployment workflows",
      duration: "75 mins",
      difficulty: "Intermediate",
      objectives: [
        "Build CD pipelines with multiple stages",
        "Configure manual and automatic triggers",
        "Implement approval workflows"
      ],
      targets: [
        "Create multi-stage CD pipeline",
        "Set up approval gates",
        "Test end-to-end deployment"
      ],
      videos: [
        {
          title: "Advanced CD Workflows",
          url: "https://youtube.com/watch?v=example7",
          duration: "25:00"
        }
      ],
      resources: []
    },
    {
      day: 7,
      title: "Secrets & ConfigMaps",
      description: "Securely manage application secrets and configurations",
      duration: "60 mins",
      difficulty: "Intermediate",
      objectives: [
        "Understand Kubernetes secrets in Devtron",
        "Create and manage ConfigMaps",
        "Integrate external secret managers"
      ],
      targets: [
        "Create application secrets",
        "Use ConfigMaps in deployments",
        "Mount secrets as files"
      ],
      videos: [
        {
          title: "Secrets Management",
          url: "https://youtube.com/watch?v=example8",
          duration: "16:00"
        }
      ],
      resources: []
    },
    {
      day: 8,
      title: "Monitoring & Observability",
      description: "Set up monitoring and understand application metrics",
      duration: "75 mins",
      difficulty: "Intermediate",
      objectives: [
        "Navigate the App Details page",
        "Understand pod logs and metrics",
        "Set up basic alerting"
      ],
      targets: [
        "Monitor a running application",
        "Analyze pod metrics",
        "Debug using logs"
      ],
      videos: [
        {
          title: "Observability in Devtron",
          url: "https://youtube.com/watch?v=example9",
          duration: "20:00"
        }
      ],
      resources: []
    },
    {
      day: 9,
      title: "Helm Charts & Chart Store",
      description: "Deploy applications using Helm charts",
      duration: "60 mins",
      difficulty: "Advanced",
      objectives: [
        "Understand Helm chart basics",
        "Deploy from Chart Store",
        "Customize Helm values"
      ],
      targets: [
        "Deploy a Helm chart app",
        "Modify chart values",
        "Upgrade deployed charts"
      ],
      videos: [
        {
          title: "Helm Charts in Devtron",
          url: "https://youtube.com/watch?v=example10",
          duration: "22:00"
        }
      ],
      resources: []
    },
    {
      day: 10,
      title: "Security & RBAC",
      description: "Implement role-based access control",
      duration: "75 mins",
      difficulty: "Advanced",
      objectives: [
        "Understand Devtron's permission model",
        "Create user groups and roles",
        "Implement least-privilege access"
      ],
      targets: [
        "Set up user groups",
        "Configure role permissions",
        "Test access controls"
      ],
      videos: [
        {
          title: "RBAC Deep Dive",
          url: "https://youtube.com/watch?v=example11",
          duration: "24:00"
        }
      ],
      resources: []
    },
    {
      day: 11,
      title: "GitOps & ArgoCD Integration",
      description: "Implement GitOps workflows with Devtron",
      duration: "75 mins",
      difficulty: "Advanced",
      objectives: [
        "Understand GitOps principles",
        "Configure GitOps in Devtron",
        "Sync applications from Git"
      ],
      targets: [
        "Enable GitOps mode",
        "Configure Git sync",
        "Implement drift detection"
      ],
      videos: [
        {
          title: "GitOps with Devtron",
          url: "https://youtube.com/watch?v=example12",
          duration: "28:00"
        }
      ],
      resources: []
    },
    {
      day: 12,
      title: "Advanced CI Features",
      description: "Master pre/post build scripts and custom pipelines",
      duration: "60 mins",
      difficulty: "Advanced",
      objectives: [
        "Write custom pre-build scripts",
        "Implement post-build actions",
        "Configure build plugins"
      ],
      targets: [
        "Add pre-build script",
        "Configure build plugins",
        "Optimize build times"
      ],
      videos: [
        {
          title: "Advanced CI Techniques",
          url: "https://youtube.com/watch?v=example13",
          duration: "20:00"
        }
      ],
      resources: []
    },
    {
      day: 13,
      title: "Debugging & Troubleshooting",
      description: "Master debugging techniques for production issues",
      duration: "75 mins",
      difficulty: "Advanced",
      objectives: [
        "Use ephemeral containers for debugging",
        "Analyze resource utilization",
        "Troubleshoot common deployment issues"
      ],
      targets: [
        "Debug a failing deployment",
        "Use terminal access",
        "Resolve resource issues"
      ],
      videos: [
        {
          title: "Production Debugging",
          url: "https://youtube.com/watch?v=example14",
          duration: "26:00"
        }
      ],
      resources: []
    },
    {
      day: 14,
      title: "Best Practices & Optimization",
      description: "Production-ready deployments and team workflows",
      duration: "90 mins",
      difficulty: "Advanced",
      objectives: [
        "Implement deployment best practices",
        "Optimize resource utilization",
        "Set up team collaboration workflows"
      ],
      targets: [
        "Review and optimize existing apps",
        "Document team workflows",
        "Complete certification checklist"
      ],
      videos: [
        {
          title: "Devtron Best Practices",
          url: "https://youtube.com/watch?v=example15",
          duration: "30:00"
        }
      ],
      resources: []
    }
  ]
};
