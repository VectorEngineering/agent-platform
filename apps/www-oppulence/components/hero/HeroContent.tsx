import {
  ArrowRight,
  Briefcase,
  Rocket,
  Shield,
  Target,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PearDarkHeroLogo from "@/components/ui/PearDarkHeroLogo.svg";
import PearHeroLogo from "@/components/ui/PearHeroLogo.svg";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface FeatureTagProps {
  icon: React.ElementType;
  text: string;
  index: number;
}

const FeatureTag = ({ icon: Icon, text, index }: FeatureTagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
  >
    <Icon className="h-4 w-4 text-blue-500 dark:text-blue-400" /> {text}
  </motion.div>
);

const HeroContent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const features = [
    { icon: Shield, text: "Advanced Data Enrichment" },
    { icon: Rocket, text: "Intelligent Prospect Scoring" },
    { icon: Briefcase, text: "Enterprise CRM Integration" },
    { icon: Target, text: "Predictive Analytics" },
    { icon: Zap, text: "Automated Engagement" },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-4 pt-16 text-center sm:pt-24 md:pt-32">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
      >
        <span className="block sm:inline">Prospect Identification </span>
        <span className="relative">
          <span className="text-gray-900 dark:text-gray-100">
            for Growth-Focused{" "}
            <span className="text-blue-500">Organizations</span>
          </span>
          <span className="absolute bottom-1 left-0 right-0 -z-10 hidden h-3 bg-blue-500/20 sm:block"></span>
        </span>
      </motion.h1>

      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-8 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg"
      >
        Your comprehensive business development platform. Discover
        high-potential opportunities, implement data-driven insights, and
        leverage advanced analytics—all while reducing acquisition costs by{" "}
        <span className="font-medium text-blue-500">60%</span> and increasing
        conversion-ready prospects by over{" "}
        <span className="font-medium text-blue-500">50%</span>.
      </motion.p> */}

      {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
            >
                {features.map((feature, index) => (
                    <FeatureTag
                        key={feature.text}
                        icon={feature.icon}
                        text={feature.text}
                        index={index}
                    />
                ))}
            </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Button
            asChild
            size="lg"
            className="text-white rounded-full bg-background px-6 py-5 shadow-md transition-all sm:px-8 sm:py-6"
          >
            <Link
              href="https://cal.com/solomonai/30min"
              className="flex items-center gap-2"
            >
              <span>Schedule some time with our team</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
