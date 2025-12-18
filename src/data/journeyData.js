/**
 * 14-Day Devtron Learning Journey - Course Content
 * Enterprise-first, capability-driven onboarding
 */

export const journeyData = {
  title: "14-Day Devtron Mastery Journey",
  subtitle: "Experience Devtron Freemium",
  description:
    "Go from a Beginner to a Pro in just 2 weeks",
  days: [
    {
      day: 0,
      title: "Install Devtron Freemium",
      description:
        "One-time setup to unlock all Devtron Enterprise capabilities during the trial",
      duration: "10–15 mins",
      difficulty: "Beginner",
      targets: [
        "Install Devtron Freemium on a Kubernetes cluster",
        "Access Devtron UI successfully",
        "Verify cluster connectivity"
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
          title: "Devtron Freemium Installation Guide",
          url: "https://docs.devtron.ai/docs/setup/install/devtron-freemium"
        }
      ]
    },

    {
      day: 1,
      title: "Create and Deploy Your First Application with CI-CD",
      description:
        "Create, build, and deploy your first application using Devtron’s unified CI-CD",
      duration: "60 mins",
      difficulty: "Beginner",
      targets: [
        "Create an application in Devtron",
        "Configure CI and CD pipelines",
        "Deploy the application successfully"
      ],
      resources: [
        {
          title: "Create Devtron App",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/create-application"
        },
        {
          title: "Configure Devtron App",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application"
        },
        {
          title: "Deploy Devtron App",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/deploying-application"
        },
      ]
    },

    {
      day: 2,
      title: "Configure, Compare, and Roll Back Application Changes",
      description:
        "Understand how configuration changes affect deployments and recover safely",
      duration: "75 mins",
      difficulty: "Beginner",
      targets: [
        "Manage runtime configuration",
        "Use diff view before deployment",
        "Roll back to a previous stable version"
      ],
      resources: [
        {
          title: "Hibernate Devtron App",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/app-details/application-summary#hibernate"
        },
        {
          title: "Rollback Deployment Devtron App",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/app-details/application-summary#rollback"
        },
        {
          title: "Environment Configurations",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/app-details/application-summary#environment-configurations"
        },
      ]
    },

    {
      day: 3,
      title: "Security Scanning and Policies",
      description: "Shift security left and enforce policies across apps, environments, and clusters",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Enable vulnerability scanning",
        "Configure security policies",
        "Apply policy enforcement in pipelines",
      ],
      resources: [
        {
          title: "Security Features",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/security-features"
        },
        {
          title: "Security Scanning",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/security-features/security-scans"
        },
        {
          title: "Security Policies",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/security-features/security-policies"
        },
      ]
    },

    {
      day: 4,
      title: "Perform Bulk Operations and Orchestrate Releases",
      description:
        "Release multiple microservices together using synchronized deployment orchestration",
      duration: "75 mins",
      difficulty: "Intermediate",
      targets: [
        "Create multiple microservices",
        "Group applications logically",
        "Deploy applications together using SDH"
      ],
      resources: [
        {
          title: "Application Groups",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/application-groups"
        },
        {
          title: "Software Distribution Hub",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/software-distribution-hub"
        },
        {
          title: "Bulk Edit",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/bulk-update"
        },
        {
          title: "Jobs",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/jobs"
        },
      ]
    },

    {
      day: 5,
      title: "Debug and Recover Applications Using Resource Browser",
      description:
        "Investigate failures and restore applications using visual Kubernetes insights",
      duration: "75 mins",
      difficulty: "Intermediate",
      targets: [
        "Inspect Kubernetes resources visually",
        "Debug using logs and terminal access",
        "Reset environments safely"
      ],
      resources: [
        {
          title: "Resource Browser",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/resource-browser"
        },
        {
          title: "Resource Watcher",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/resource-watcher"
        },
      ]
    },

    {
      day: 6,
      title: "Infrastructure Management",
      description:
        "Safely scale CI/CD workloads and resources",
      duration: "60 mins",
      difficulty: "Intermediate",
      targets: [
        "Configure build infrastructure",
        "Assign builds to dedicated build nodes",
        "Understand build isolation and scaling"
      ],
      resources: [
        {
          title: "Build Infra",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/build-infra"
        },
        {
          title: "Configure Deployment Template",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/base-config/deployment-template#configure-the-deployment-template"
        },
        {
          title: "Resource Recommender",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/resource-browser/resource-recommender"
        },
      ]
    },

    {
      day: 7,
      title: "Enforce Release Governance with Core Policies",
      description:
        "Introduce control and predictability into releases using policy enforcement",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Configure approval policies",
        "Define deployment windows",
        "Lock deployment configurations"
      ],
      resources: [
        {
          title: "Approval Policy",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/approval-policy"
        },
        {
          title: "Deployment Window",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/deployment-window"
        },
        {
          title: "Lock Deployment Configurations",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/lock-deployment-config"
        },
      ]
    },

    {
      day: 8,
      title: "Control Image Integrity and Promotion",
      description:
        "Ensure only trusted images are promoted and deployed across environments",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Promote images safely across environments",
        "Deploy images using digests",
        "Apply tag-based deployment rules"
      ],
      resources: [
        {
          title: "Image Promotion Policy",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/image-promotion-policy"
        },
        {
          title: "Pull Image Digest",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/pull-image-digest"
        },
        {
          title: "Tags Policy",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/tags-policy"
        },
      ]
    },

    {
      day: 9,
      title: "Extend and Restrict CI-CD Using Plugins and Advanced Policies",
      description:
        "Customize pipelines while retaining control using plugins and policy enforcement",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Add pre and post build plugins",
        "Apply plugin policies",
        "Restrict unsafe or unapproved pipeline behavior"
      ],
      resources: [
        {
          title: "Pre-build/Post-build and Pre-deployment/Post-deployment Stages",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/workflow/pre-post-tasks"
        },
        {
          title: "Create Your Plugin",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/plugins/create-plugin"
        },
        {
          title: "Pipeline Plugins",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/plugins/plugin-list"
        },
        {
          title: "Plugin Policy",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/plugin-policy"
        },
      ]
    },

    {
      day: 10,
      title: "Adopt GitOps with ArgoCD Integration",
      description:
        "Operate deployments using Git as the source of truth with Devtron and ArgoCD",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Enable GitOps mode",
        "Integrate Devtron with ArgoCD",
        "Understand sync and drift detection"
      ],
      resources: [
        {
          title: "GitOps",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/gitops"
        },
        {
          title: "GitOps Config",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/gitops-config"
        },
        {
          title: "GitOps Deployment using Flux",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/fluxcd"
        },
        {
          title: "Migrate ArgoCD Apps",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/workflow/cd-pipeline#migrate-argo-cd-application"
        },
      ]
    },

    {
      day: 11,
      title: "Manage Clusters and Environment Lifecycle",
      description:
        "Operate Devtron across multiple clusters and environments at scale",
      duration: "60 mins",
      difficulty: "Advanced",
      targets: [
        "Add and manage Kubernetes clusters",
        "Enable or disable environments",
        "Control environment lifecycle operations"
      ],
      resources: [
        {
          title: "Add Existing Kubernetes Cluster",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/cluster-and-environments#add-kubernetes-cluster"
        },
        {
          title: "Create Kubernetes Cluster",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/cluster-and-environments#create-kubernetes-cluster-"
        },
        {
          title: "Add Isolated Cluster",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/cluster-and-environments#add-isolated-cluster-"
        },
        {
          title: "Environments",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/cluster-and-environments#add-environment-to-a-cluster"
        },
      ]
    },

    {
      day: 12,
      title: "Control Access with SSO and RBAC",
      description:
        "Secure platform access across teams using authentication and authorization",
      duration: "75 mins",
      difficulty: "Advanced",
      targets: [
        "Enable Single Sign-On",
        "Configure RBAC for users and teams",
        "Understand kubectl access"
      ],
      resources: [
        {
          title: "SSO Login Services",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/sso-login"
        },
        {
          title: "User Permissions",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/authorization/user-access"
        },
        {
          title: "Running Kubectl Locally to Access Clusters",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/resource-browser/kubectl-local"
        },
      ]
    },

    {
      day: 13,
      title: "Deploy Applications Using Helm and Chart Store",
      description:
        "Deploy and manage applications using Helm charts and reusable configurations",
      duration: "60 mins",
      difficulty: "Advanced",
      targets: [
        "Deploy applications via Helm charts",
        "Explore the Devtron Chart Store",
        "Use chart groups and preset values"
      ],
      resources: [
        {
          title: "Chart Store",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/deploy-chart"
        },
      ]
    },

    {
      day: 14,
      title: "Run Devtron Confidently in Production",
      description:
        "Complete the journey by operating Devtron effectively in real production setups",
      duration: "60 mins",
      difficulty: "Advanced",
      targets: [
        "Configure notifications",
        "Optimize resource usage",
        "Review production readiness best practices"
      ],
      resources: [
        {
          title: "Notifications",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/global-configurations/manage-notification"
        },
        {
          title: "Monitoring Graphs",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/resource-browser/monitoring-graphs"
        },
        {
          title: "Application Metrics",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/creating-application/app-metrics"
        },
        {
          title: "Configure Lock Schema",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/operations/edit-lock-schema"
        },
        {
          title: "Configure GUI Schema",
          url: "https://docs.devtron.ai/docs/devtron/v1.8/user-guide/operations/edit-gui-schema"
        },
      ]
    }
  ]
};
