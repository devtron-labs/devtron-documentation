/**
 * 14-Day Devtron Learning Journey - Course Content
 * Enterprise-first, capability-driven onboarding
 */

export const journeyData = {
  title: "14-Day Devtron Mastery Journey",
  subtitle: "Build, Release, Govern, and Operate at Scale",
  description:
    "Experience Devtron as a production-grade platform. Over 14 days, deploy real applications, solve real problems, and unlock Enterprise capabilities as solutions.",
  days: [
    {
      day: 0,
      title: "Bootstrap Devtron Freemium",
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
      ]
    },

    {
      day: 3,
      title: "Promote Releases Across Multiple Environments",
      description:
        "Move releases from development to production without rebuilding artifacts",
      duration: "75 mins",
      difficulty: "Intermediate",
      targets: [
        "Create Dev, UAT, and Prod environments",
        "Promote images across environments",
        "Compare and filter environment changes"
      ]
    },

    {
      day: 4,
      title: "Orchestrate Multi-Application Releases with SDH",
      description:
        "Release multiple microservices together using synchronized deployment orchestration",
      duration: "75 mins",
      difficulty: "Intermediate",
      targets: [
        "Create multiple microservices",
        "Group applications logically",
        "Deploy applications together using SDH"
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
      ]
    },

    {
      day: 6,
      title: "Scale Builds Using Dedicated Build Infrastructure",
      description:
        "Safely scale CI workloads using isolated and configurable build infrastructure",
      duration: "60 mins",
      difficulty: "Intermediate",
      targets: [
        "Configure build infrastructure",
        "Assign builds to dedicated build nodes",
        "Understand build isolation and scaling"
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
        "Understand break-glass and kubectl access"
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
      ]
    }
  ]
};
