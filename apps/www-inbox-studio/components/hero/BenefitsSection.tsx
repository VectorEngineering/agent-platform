"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  BookOpen,
  Brain,
  Briefcase,
  ChevronDown,
  Clock,
  DollarSign,
  LineChart,
  Rocket,
  Shield,
  Target,
  Users,
} from "lucide-react";
import React, { useState } from "react";

import Link from "next/link";
import { cva } from "class-variance-authority";

// Define types for better TypeScript support
type BenefitCategory =
  | "Efficiency"
  | "Sales"
  | "Analytics"
  | "Integration"
  | "Cost-Saving"
  | "Growth";

interface BenefitInfo {
  title: string;
  description: string;
  extendedDescription: string;
  icon: React.ElementType;
  categories: BenefitCategory[];
  stats?: {
    value: string;
    label: string;
  };
  highlight?: string;
  bookColor?: string;
  primaryColor?: string; // For vibrant colors
  gradientFrom?: string;
  gradientTo?: string;
}

// Tag badge component with variants
const categoryVariants = cva(
  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium gap-1.5 transition-all duration-300 shadow-sm",
  {
    variants: {
      variant: {
        Efficiency:
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        Sales:
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        Analytics:
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        Integration:
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        "Cost-Saving":
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
        Growth:
          "bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:shadow-blue-500/10 hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "Efficiency",
    },
  },
);

// Enhanced Category component with appropriate icons
const BenefitCategory = ({ type }: { type: BenefitCategory }) => {
  // Icons for each category type
  const categoryIcons = {
    Efficiency: (
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
    Sales: (
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
    Analytics: (
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
        <path d="M12 4a2.5 2.5 0 1 0-4.996.076 2.5 2.5 0 0 0 4.996-.076ZM12 13a2.5 2.5 0 1 0-4.996.076 2.5 2.5 0 0 0 4.996-.076ZM5 10a2.5 2.5 0 1 0 .073-4.996A2.5 2.5 0 0 0 5 10ZM15 10a2.5 2.5 0 1 0 .073-4.996A2.5 2.5 0 0 0 15 10Z" />
      </svg>
    ),
    "Cost-Saving": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3 w-3"
      >
        <path
          fillRule="evenodd"
          d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    Growth: (
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
    <span className={categoryVariants({ variant: type })}>
      {categoryIcons[type]}
      {type}
    </span>
  );
};

// Animation variants
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

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.1,
    },
  },
};

// Book animation variants
const bookCoverVariants = {
  closed: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  open: {
    rotateY: -180,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const bookContentVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};

const spineVariants = {
  closed: {
    width: "20px",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  open: {
    width: "10px",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Helper function to get color based on category (simplified to just blue)
const getCategoryColor = (benefit: BenefitInfo) => {
  return "text-blue-500 dark:text-blue-400";
};

// Helper function to get gradient based on category (simplified to white with blue border)
const getCategoryGradient = (benefit: BenefitInfo) => {
  return "from-white to-white";
};

// Helper function to get stat background based on category (simplified to just blue)
const getStatBackground = (benefit: BenefitInfo) => {
  return "bg-gradient-to-r from-blue-500/10 to-blue-400/5 border-blue-500/20";
};

// Helper function to get highlight border color based on category (simplified to just blue)
const getHighlightBorder = (benefit: BenefitInfo) => {
  return "border-blue-500/30 dark:border-blue-400/30";
};

const BenefitBook = ({ benefit }: { benefit: BenefitInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryColor = getCategoryColor(benefit);
  const statBg = getStatBackground(benefit);
  const highlightBorder = getHighlightBorder(benefit);

  const toggleBook = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="perspective-1000 h-[450px] cursor-pointer"
      onClick={toggleBook}
      variants={itemVariants}
    >
      <div className="transform-style-3d relative h-full w-full">
        {/* Book spine */}
        <motion.div
          className="book-spine bg-white border-r border-blue-200 dark:border-blue-800 dark:bg-gray-900"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={spineVariants}
        />

        {/* Book page edge - visible when open */}
        {isOpen && <div className="book-page-edge" />}

        {/* Book cover */}
        <motion.div
          className="book-cover bg-white border border-blue-200 shadow-md dark:border-blue-800 dark:bg-gray-900"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={bookCoverVariants}
        >
          {/* Cover content */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-r-md p-6 backdrop-blur-sm">
            <div>
              <motion.div
                variants={iconVariants}
                className={`mb-6 inline-flex items-center justify-center rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20 ${categoryColor}`}
              >
                <benefit.icon className="h-7 w-7" strokeWidth={1.5} />
              </motion.div>

              <h3 className="dark:text-white mb-3 text-xl font-bold text-black">
                {benefit.title}
              </h3>

              <p className="dark:text-white/70 mb-4 line-clamp-3 text-black/70">
                {benefit.description}
              </p>
            </div>

            {/* Stats badge on cover */}
            {benefit.stats && (
              <div
                className={`inline-flex items-center gap-2 rounded-2xl ${statBg} border px-3 py-1.5`}
              >
                <span className={`text-xl font-bold ${categoryColor}`}>
                  {benefit.stats.value}
                </span>
                <span className="dark:text-white/60 text-xs text-black/60">
                  {benefit.stats.label}
                </span>
              </div>
            )}

            {/* Open instruction */}
            <div className="dark:text-white/50 mt-3 flex items-center justify-center gap-1 text-sm text-black/50">
              <BookOpen className="h-4 w-4" />
              <span>Click to open</span>
            </div>
          </div>

          {/* Back of cover (visible when open) */}
          <div className="rotateY-180 backface-hidden absolute inset-0 flex flex-col justify-between p-6">
            <div className="bg-white/5 h-full w-full rounded-2xl dark:bg-black/5" />
          </div>
        </motion.div>

        {/* Book pages (content) */}
        <motion.div
          className="book-pages"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={bookContentVariants}
        >
          {/* Categories tags */}
          <motion.div
            variants={tagContainerVariants}
            className="mb-4 flex flex-wrap gap-2"
          >
            {benefit.categories.map((category) => (
              <motion.div key={category} variants={tagVariants}>
                <BenefitCategory type={category} />
              </motion.div>
            ))}
          </motion.div>

          <h3
            className={`dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-xl font-bold text-black text-transparent dark:from-blue-400 dark:to-blue-300`}
          >
            {benefit.title}
          </h3>

          <p className="dark:text-white/70 mb-5 text-black/70">
            {benefit.description}
          </p>

          {/* Extended description */}
          <div className="dark:text-white/60 mt-4 text-sm text-black/60">
            {benefit.extendedDescription}
          </div>

          {benefit.highlight && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-2xl border-l-2 p-3 ${highlightBorder} bg-blue-50/50 dark:bg-blue-900/10`}
            >
              <Rocket className={`h-4 w-4 ${categoryColor}`} />
              <p className="dark:text-white/80 text-sm font-medium text-black/80">
                {benefit.highlight}
              </p>
            </div>
          )}

          {/* Close instruction */}
          <div className="dark:text-white/50 absolute bottom-4 left-0 right-0 mt-6 flex items-center justify-center gap-1 text-sm text-black/50">
            <ChevronDown className="h-4 w-4" />
            <span>Click to close</span>
          </div>
        </motion.div>

        {/* Book shadow */}
        <div className="book-shadow"></div>
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  // Benefits data with content from manifest.md
  const benefits: BenefitInfo[] = [
    {
      title: "50%+ Increase in Sales-Ready Leads",
      description:
        "Companies using AI for lead generation have seen over 50% increases in sales-ready leads while reducing lead acquisition costs.",
      extendedDescription:
        "Traditional lead sourcing – manual prospecting, purchasing static contact lists, or relying on gut feeling – is being replaced by AI-driven platforms that automate discovery, enrichment, and prioritization of prospects.",
      icon: LineChart,
      categories: ["Sales", "Efficiency", "Growth"],
      stats: {
        value: "50%+",
        label: "more qualified leads",
      },
      highlight: "AI-driven lead scoring can shorten sales cycles by 30%",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
    {
      title: "60% Reduction in Lead Sourcing Costs",
      description:
        "Small businesses report significant cost savings when using AI-powered lead generation compared to traditional methods.",
      extendedDescription:
        "By leveraging AI to analyze customer data and online behavior to pinpoint the most promising prospects, small firms achieve smarter targeting and higher quality leads while drastically reducing costs.",
      icon: DollarSign,
      categories: ["Cost-Saving", "Efficiency", "Analytics"],
      stats: {
        value: "60%",
        label: "cost reduction",
      },
      highlight:
        "Companies using AI tools save 5+ hours per week on lead research",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
    {
      title: "74% Report Competitive Advantage",
      description:
        "The vast majority of small business owners believe employees using AI tools give them a significant competitive edge over peers.",
      extendedDescription:
        "Small business owners are taking note: 74% believe employees using AI tools give them a competitive edge over peers. This competitive advantage comes from better lead quality, faster sales cycles, and more effective outreach.",
      icon: Target,
      categories: ["Growth", "Sales", "Analytics"],
      stats: {
        value: "74%",
        label: "competitive advantage",
      },
      highlight:
        "Three in four small firms think AI can save time and money long-term",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
    {
      title: "Seamless Integration with Your Workflow",
      description:
        "Our platform integrates with the tools you already use, with 87% of small businesses already having CRM systems in place.",
      extendedDescription:
        "About 87% of companies with 10–100 employees use a CRM system. Our platform's bi-directional sync ensures your lead data stays fresh across all your tools, with no manual updates required.",
      icon: Briefcase,
      categories: ["Integration", "Efficiency", "Cost-Saving"],
      stats: {
        value: "87%",
        label: "of small businesses use CRMs",
      },
      highlight: "Any lead sourcing platform must play nicely with CRMs",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
    {
      title: "AI-Powered Personalization at Scale",
      description:
        "Generate tailored outreach for each prospect, with small businesses reporting 200% higher engagement rates.",
      extendedDescription:
        "Personalization at scale – such as tailoring emails or website content dynamically for each prospect – is becoming standard. Small businesses using AI have reported significantly higher engagement, for example a 200% increase in email click-through by using AI-personalized content.",
      icon: Users,
      categories: ["Sales", "Efficiency", "Growth"],
      stats: {
        value: "200%",
        label: "higher engagement rates",
      },
      highlight:
        "Personalized outreach has shown to increase response rates by 200%",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
    {
      title: "Features at Small Business Prices",
      description:
        "Access powerful AI capabilities without the enterprise price tag that typically starts at $15,000+ per year.",
      extendedDescription:
        "Many advanced AI-powered sales tools are built for enterprises and come with enterprise pricing. For instance, the leading B2B data provider ZoomInfo starts around $15,000 per year for a basic plan – a price point out of reach for many startups or small firms.",
      icon: Brain,
      categories: ["Cost-Saving", "Growth", "Analytics"],
      stats: {
        value: "72%",
        label: "AI adoption by 2025",
      },
      highlight:
        "Democratizing AI lead sourcing with powerful features at SMB-friendly prices",
      primaryColor: "text-blue-500 dark:text-blue-400",
      gradientFrom: "blue-500/20",
      gradientTo: "blue-400/10",
    },
  ];

  return (
    <section className="bg-white relative overflow-hidden py-32 dark:bg-black">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_45%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,rgba(0,0,0,0)_45%)]"></div>
        <div className="absolute bottom-0 right-0 h-[50%] w-[70%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.02)_0,rgba(0,0,0,0)_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02)_0,rgba(0,0,0,0)_50%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="dark:text-white mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-black backdrop-blur-sm"
          >
            Small Business Advantages
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Gain a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
                Competitive Edge
              </span>
              <span className="absolute bottom-2 left-0 right-0 -z-10 h-3 skew-x-12 transform bg-blue-500/20"></span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="dark:text-white/70 mx-auto max-w-3xl text-lg leading-relaxed text-black/70 md:text-xl"
          >
            Small businesses using our AI tools report a significant advantage
            in lead generation and sales conversion. In fact, companies using AI
            for lead generation have seen{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-semibold text-transparent dark:from-blue-400 dark:to-blue-300">
              50%+ increases in sales-ready leads
            </span>{" "}
            and a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-semibold text-transparent dark:from-blue-400 dark:to-blue-300">
              60% reduction in costs
            </span>
            .
          </motion.p>
        </div>

        {/* Benefits grid - now with book designs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <BenefitBook key={benefit.title} benefit={benefit} />
          ))}
        </motion.div>

        {/* Quote section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mt-24 overflow-hidden rounded-2xl border border-blue-200/30 bg-blue-50/80 p-10 dark:border-blue-500/20 dark:bg-blue-900/10 md:p-16"
        >
          <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-blue-500/5 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-blue-500/5 opacity-50 blur-3xl"></div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <svg
              className="mx-auto mb-6 h-12 w-12 text-blue-500/40 dark:text-blue-400/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
            </svg>
            <blockquote className="mb-6 text-xl font-medium italic text-blue-900 dark:text-blue-100 md:text-2xl">
              &quot;Small firms, often limited in time and sales personnel,
              stand to gain a disproportionate advantage from these tools. In
              fact, companies using AI for lead generation have seen 50%+
              increases in sales-ready leads and a 60% reduction in costs.&quot;
            </blockquote>
            <p className="dark:text-white/50 text-black/50">
              — From industry research, 2025
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-200 to-gray-50 p-0.5 dark:from-blue-500 dark:to-blue-400">
            <Link href="https://app.thinkthank.io">
              <button className="bg-white dark:text-white hover:bg-white/95 group inline-flex items-center justify-center rounded-full px-8 py-4 font-medium text-black shadow-xl backdrop-blur-sm transition-colors dark:bg-black dark:hover:bg-black/95">
                <span className="text-white group-hover:text-white dark:group-hover:text-white">
                  Start Your Competitive Advantage
                </span>
                <svg
                  className="text-white ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
          <p className="dark:text-white/50 mt-4 text-sm text-black/50">
            Join the{" "}
            <span className="text-blue-500 dark:text-blue-400">74%</span> of
            small businesses gaining a competitive edge with AI
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
