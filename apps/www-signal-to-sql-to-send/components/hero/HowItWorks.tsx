"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

// Define types for better TypeScript support
type IconType =
  | "target-audience"
  | "ai-search"
  | "analytics"
  | "integration"
  | "message";
type TagType =
  | "AI-Powered"
  | "Time-Saving"
  | "Data-Driven"
  | "Integration"
  | "Automation"
  | "Cost-Effective";

interface Step {
  number: string;
  title: string;
  description: string;
  extendedDescription: string;
  icon: IconType;
  color: string;
  imageUrl: string;
  tags: TagType[];
  stats?: {
    value: string;
    label: string;
  }[];
}

// Tag badge component with variants
const tagVariants = cva(
  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium gap-1.5 transition-all duration-300 shadow-sm",
  {
    variants: {
      variant: {
        "AI-Powered":
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        "Time-Saving":
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-gray-300/10 hover:scale-105",
        "Data-Driven":
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-gray-300/10 hover:scale-105",
        Integration:
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-gray-300/10 hover:scale-105",
        Automation:
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-gray-300/10 hover:scale-105",
        "Cost-Effective":
          "bg-background text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-gray-300/10 hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "AI-Powered",
    },
  },
);

// Enhanced Tag component with appropriate icons for each type
const Tag = ({ type }: { type: TagType }) => {
  // Icons for each tag type
  const tagIcons = {
    "AI-Powered": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path d="M13.5 4.938a7 7 0 0 1 1.5 4.312m0 0a7 7 0 0 1-14 0m14 0a7 7 0 0 0-14 0m14 0-1 1.5m-13 0 1 1.5m13-3-1-1.5m-13 0 1-1.5M6.75 7A.75.75 0 0 1 7.5 7.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 6.75 7Zm4 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10.75 7Z" />
      </svg>
    ),
    "Time-Saving": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "Data-Driven": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
      </svg>
    ),
    Integration: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path
          fillRule="evenodd"
          d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H18v8.75A2.75 2.75 0 0 1 15.25 15h-1.072l.798 3.06a.75.75 0 0 1-1.452.38L12.6 15H7.4l-.924 3.44a.75.75 0 0 1-1.452-.38L5.823 15H4.75A2.75 2.75 0 0 1 2 12.25V3.5h-.25A.75.75 0 0 1 1 2.75ZM7.373 15l-.391 1.464h6.037l-.392-1.464H7.373ZM13.25 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm-6.5 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 6.75 9Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    Automation: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path
          fillRule="evenodd"
          d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 0 0 1.5h2.5v.25a.75.75 0 0 1-.75.75h-11.5a.75.75 0 0 1-.75-.75v-.25h2.5a.75.75 0 0 0 0-1.5h-2.5a.75.75 0 0 1-.75-.75v-7.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "Cost-Effective": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path
          fillRule="evenodd"
          d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 0 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 0-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <span className={tagVariants({ variant: type })}>
      {tagIcons[type]}
      {type}
    </span>
  );
};

const HowItWorks = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Strategic Advantage for Business Growth",
      description:
        "Advanced AI technology transforms how businesses identify and cultivate high-quality prospects through intelligent automation and precision targeting.",
      extendedDescription:
        "Organizations with limited resources gain substantial advantages through AI-driven lead generation. Businesses implementing these solutions experience significant improvements in qualified lead volume and substantial reduction in acquisition costs. Research confirms that a majority of decision-makers recognize AI implementation as a critical competitive differentiator in today's market.",
      icon: "target-audience",
      color: "from-gray-100 to-gray-200",
      imageUrl: "/images/how-it-works/define-prospect.svg",
      tags: ["AI-Powered", "Data-Driven"],
      stats: [
        {
          value: "74%",
          label: "of executives confirm AI delivers competitive advantages",
        },
        { value: "60%", label: "reduction in customer acquisition expenses" },
      ],
    },
    {
      number: "02",
      title: "Intelligence-Driven Prospecting",
      description:
        "Modern lead generation has evolved from manual processes to sophisticated, data-powered identification systems.",
      extendedDescription:
        "The business development landscape has fundamentally transformed, moving from traditional list-building and cold outreach to intelligent, data-powered identification systems. Rather than relying on intuition or generic approaches, organizations now leverage advanced algorithms to analyze customer behaviors and digital footprints, precisely identifying the most promising opportunities.",
      icon: "ai-search",
      color: "from-gray-100 to-gray-200",
      imageUrl: "/images/how-it-works/ai-enrichment.svg",
      tags: ["AI-Powered", "Time-Saving", "Data-Driven"],
      stats: [
        { value: "50%", label: "increase in conversion-ready prospects" },
        {
          value: "87%",
          label: "contact accuracy with algorithmic verification",
        },
      ],
    },
    {
      number: "03",
      title: "Predictive Opportunity Identification",
      description:
        "Advanced algorithms detect potential customers before they actively engage by recognizing behavioral patterns associated with purchase intent.",
      extendedDescription:
        "Machine learning-powered predictive analytics identifies valuable prospects before they actively initiate contact by recognizing behavioral patterns strongly correlated with purchasing intent. Organizations benefit by allocating valuable resources exclusively toward opportunities with the highest conversion potential, maximizing efficiency and effectiveness.",
      icon: "analytics",
      color: "from-gray-100 to-gray-200",
      imageUrl: "/images/how-it-works/ai-scoring.svg",
      tags: ["AI-Powered", "Data-Driven", "Automation"],
      stats: [
        {
          value: "30%",
          label:
            "reduction in sales cycle duration through intelligent prioritization",
        },
        {
          value: "2x",
          label: "increase in qualified prospects using data-driven targeting",
        },
      ],
    },
    {
      number: "04",
      title: "Addons (Integration Marketplace)",
      description:
        "The vast majority of growing businesses utilize CRM platforms as the foundation of their revenue operations.",
      extendedDescription:
        "An overwhelming majority of growing businesses utilize customer relationship management systems as the foundation of their revenue operations. Effective lead generation solutions must integrate seamlessly with existing CRM infrastructure. Organizations require new opportunities to flow directly into their established systems with automatic synchronization of enrichment data and engagement metrics.",
      icon: "integration",
      color: "from-gray-100 to-gray-200",
      imageUrl: "/images/how-it-works/crm-integration.svg",
      tags: ["Integration", "Time-Saving", "Automation"],
      stats: [
        { value: "87%", label: "of growing businesses depend on CRM systems" },
        {
          value: "100%",
          label: "data consistency with bi-directional synchronization",
        },
      ],
    },
    {
      number: "05",
      title: "Optimized Prospect Engagement",
      description:
        "Our platform connects with leading CRM systems to create a comprehensive pipeline generation ecosystem.",
      extendedDescription:
        "Our solution integrates effortlessly with industry-standard CRM platforms to align with established workflows. The result is a comprehensive system that optimizes the entire prospect journey from identification through qualification. Through algorithm-based scoring and intent analysis, we enable organizations to recognize and prioritize their most valuable opportunities.",
      icon: "message",
      color: "from-gray-100 to-gray-200",
      imageUrl: "/images/how-it-works/ai-engagement.svg",
      tags: ["AI-Powered", "Automation", "Time-Saving"],
      stats: [
        {
          value: "200%",
          label:
            "improvement in communication effectiveness through intelligent personalization",
        },
        { value: "3x", label: "acceleration in prospect response time" },
      ],
    },
  ];

  // Icons for each step with enhanced colors
  const getIconColor = (step: Step) => {
    return "text-blue-500 dark:text-blue-400";
  };

  const icons: Record<IconType, (step: Step) => React.ReactNode> = {
    "target-audience": (step) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 ${getIconColor(step)}`}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    "ai-search": (step) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 ${getIconColor(step)}`}
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    analytics: (step) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 ${getIconColor(step)}`}
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    integration: (step) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 ${getIconColor(step)}`}
      >
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"></path>
        <path d="M3 15h10"></path>
        <path d="M20 21v-9a2 2 0 0 0-2-2h-8v11"></path>
        <path d="M12 5l3 3-3 3"></path>
      </svg>
    ),
    message: (step) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 ${getIconColor(step)}`}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <line x1="9" y1="10" x2="15" y2="10"></line>
        <line x1="12" y1="7" x2="12" y2="13"></line>
      </svg>
    ),
  };

  // Get title gradient color based on step
  const getTitleColor = (index: number) => {
    return "text-gray-900 dark:text-gray-100";
  };

  // Get stat box color based on step
  const getStatBgColor = (index: number) => {
    return "bg-background dark:bg-gray-800 border-gray-200 dark:border-gray-700";
  };

  // Get stat value color based on step
  const getStatValueColor = (index: number) => {
    return "text-blue-500 dark:text-blue-400";
  };

  // Get number color based on step
  const getNumberColor = (index: number) => {
    return "text-blue-500 dark:text-blue-400";
  };

  // Custom animation variants for better interactions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="dark:text-white relative overflow-hidden py-32 text-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_45%)]"></div>
        <div className="absolute right-0 top-0 h-[50%] w-[70%] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.02)_0,rgba(0,0,0,0)_50%)]"></div>
        <div className="absolute bottom-0 left-0 h-[30%] w-[30%] bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.015)_0,rgba(0,0,0,0)_60%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="dark:text-white mb-4 inline-block rounded-full border border-blue-500/30 bg-background px-4 py-1 text-sm font-medium text-gray-900 backdrop-blur-sm dark:bg-gray-800"
          >
            Prospect Identification
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            For{" "}
            <span className="relative inline-block">
              <span className="dark:text-white relative z-10 text-gray-900">
                Growth-Focused{" "}
                <span className="text-blue-500">Organizations</span>
              </span>
              <span className="absolute bottom-2 left-0 right-0 -z-10 h-3 skew-x-12 transform bg-blue-500/20"></span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl"
          >
            Advanced artificial intelligence is fundamentally transforming how
            organizations identify and cultivate business opportunities.
            Traditional prospecting methods are being replaced by sophisticated
            platforms that automate discovery, enrichment, and prioritization.
            Organizations implementing these solutions report a{" "}
            <span className="font-semibold text-blue-500">
              substantial increase in qualified leads
            </span>{" "}
            and a{" "}
            <span className="dark:text-white font-semibold text-gray-900">
              significant reduction in acquisition costs
            </span>
            .
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Connecting line with gradient */}
          <div className="absolute bottom-12 left-1/2 top-12 hidden w-[3px] -translate-x-1/2 transform rounded-full bg-gradient-to-b from-blue-500/30 via-gray-300 to-gray-300 dark:from-blue-500/30 dark:via-gray-700 dark:to-gray-700 lg:block"></div>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
              >
                <div className="w-full text-center lg:w-1/2 lg:text-left">
                  <div
                    className={`mb-6 inline-flex items-center justify-center rounded-full border border-gray-300 bg-background px-4 py-1 text-sm font-medium backdrop-blur-sm dark:border-gray-700`}
                  >
                    <span className="mr-2">{icons[step.icon](step)}</span>
                    <span className={getNumberColor(index)}>
                      Step {step.number}
                    </span>
                  </div>
                  <h3
                    className={`mb-4 text-2xl font-bold md:text-3xl ${getTitleColor(index)}`}
                  >
                    {step.title}
                  </h3>

                  <motion.div
                    variants={tagContainerVariants}
                    className="mb-5 flex flex-wrap gap-2"
                  >
                    {step.tags.map((tag) => (
                      <motion.div key={tag} variants={tagVariants}>
                        <Tag type={tag} />
                      </motion.div>
                    ))}
                  </motion.div>

                  <p className="mx-auto mb-6 max-w-md text-lg leading-relaxed text-gray-700 dark:text-gray-300 lg:mx-0">
                    {step.description}
                  </p>

                  <motion.p
                    variants={fadeInUpVariants}
                    className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:mx-0"
                  >
                    {step.extendedDescription}
                  </motion.p>

                  {step.stats && (
                    <motion.div
                      variants={statVariants}
                      className="mt-8 grid grid-cols-2 gap-6"
                    >
                      {step.stats.map((stat, i) => (
                        <div
                          key={i}
                          className={`rounded-xl border border-gray-300 bg-background p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800`}
                        >
                          <p
                            className={`text-2xl font-bold text-blue-500 dark:text-blue-400`}
                          >
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="relative w-full lg:w-1/2">
                  <div
                    className={`flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-300 bg-background p-8 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800`}
                  >
                    {/* For development, showing a placeholder. In production, use actual illustrations */}
                    <div className="relative flex h-full w-full items-center justify-center">
                      {/* This is where your actual illustration would go */}
                      <div className="flex h-full items-center justify-center text-5xl font-bold text-gray-400 dark:text-gray-600">
                        <div
                          className={`flex flex-col items-center gap-6 rounded-2xl border border-gray-300 bg-gray-200 p-10 shadow-inner backdrop-blur-sm dark:border-gray-600 dark:bg-gray-700`}
                        >
                          <div
                            className={`flex h-16 w-16 items-center justify-center text-blue-500 dark:text-blue-400`}
                          >
                            {icons[step.icon](step)}
                          </div>
                          <div
                            className={`h-1 w-16 rounded-full bg-blue-500/50 dark:bg-blue-500/30`}
                          ></div>
                          <span
                            className={`text-6xl font-bold text-gray-700 dark:text-gray-300`}
                          >
                            {step.number}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Abstract decoration elements with matching colors */}
                    <div
                      className={`absolute -right-3 -top-3 h-20 w-20 rounded-full bg-blue-500/10 opacity-60 blur-xl dark:bg-blue-500/5`}
                    ></div>
                    <div
                      className={`absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-gray-300 opacity-40 blur-xl dark:bg-gray-700`}
                    ></div>

                    {/* Design elements */}
                    <div className="absolute right-4 top-4 h-20 w-20">
                      <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-full w-full text-gray-400 opacity-20 dark:text-gray-600`}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="25"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-4 left-4 h-20 w-20">
                      <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-full w-full text-gray-400 opacity-20 dark:text-gray-600`}
                      >
                        <rect
                          x="20"
                          y="20"
                          width="60"
                          height="60"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                        <rect
                          x="30"
                          y="30"
                          width="40"
                          height="40"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Connection point with colored glow */}
                  <div className="absolute top-1/2 hidden -translate-y-1/2 transform lg:block">
                    <div
                      className={`${index % 2 === 0 ? "-left-3" : "-right-3"} absolute`}
                    >
                      <div
                        className={`relative flex h-6 w-6 items-center justify-center rounded-full text-blue-500 shadow-lg dark:text-blue-400`}
                      >
                        <div className="bg-white h-2 w-2 rounded-full dark:bg-gray-300"></div>
                        <div
                          className={`absolute -inset-2 animate-pulse rounded-full bg-blue-500/20 opacity-70 dark:bg-blue-500/10`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics banner with gradients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 rounded-2xl border border-gray-300 bg-background p-8 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h4 className="mb-2 text-5xl font-bold text-blue-500 dark:text-blue-400">
                74%
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                of executives confirm AI delivers competitive advantages
              </p>
            </div>
            <div className="text-center">
              <h4 className="mb-2 text-5xl font-bold text-gray-900 dark:text-gray-100">
                87%
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                of growing organizations utilize CRM platforms
              </p>
            </div>
            <div className="text-center">
              <h4 className="mb-2 text-5xl font-bold text-blue-500 dark:text-blue-400">
                50%
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                increase in conversion-ready prospects with AI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial with gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-blue-500/40 dark:text-blue-500/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
            </svg>
          </div>
          <blockquote className="mb-6 text-xl font-medium italic text-gray-900 dark:text-gray-100 md:text-2xl">
            &quot; Organizations with limited resources gain a substantial{" "}
            <span className="text-blue-500">strategic advantage</span> from
            intelligent, data-driven prospect identification systems. &quot;
          </blockquote>
          <p className="text-gray-600 dark:text-gray-400">
            Growth Strategy Report, 2025
          </p>
        </motion.div>

        {/* Final call-to-action with enhanced gradient */}
        <Link href="/contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 text-center"
          >
            <div className="inline-block rounded-full bg-blue-500 p-0.5">
              <button className="bg-white group inline-flex items-center justify-center rounded-full px-8 py-4 font-medium text-gray-900 shadow-xl backdrop-blur-sm transition-colors hover:bg-background dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800">
                <span className="text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Begin Implementation Today
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4 text-blue-500 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Join the <span className="text-blue-500">74%</span> of
              organizations leveraging advanced technology for market
              differentiation
            </p>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
