import {
  DiscordLogo,
  FacebookLogo,
  GitHubLogo,
  LinkedInLogo,
  TikTokLogo,
  TwitterLogo,
  YouTubeLogo,
} from "@/components/ui/icons";

import { MdFacebook } from "react-icons/md";
import { PricingTierData } from "@/types/pricing";

export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? "",
);

export const CONTACT_EMAIL = "eyoanyombapro@gmail.com";

const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID = "price_1PZ9X608N4O93LU5yqMbGDtu";
const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST =
  "price_1PZUT208N4O93LU5jItKoEYu";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID = "price_1PoZiZ08N4O93LU5kCrdrXvI";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST =
  "price_1Ppa9408N4O93LU5irNxLp5p";
const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID = "price_1PpZUO08N4O93LU5FYFUyh43";
const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST =
  "price_1PZUSi08N4O93LU5UVdlkfp2";

export const STRIPE_PRICE_IDS = {
  WAITLIST: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID,
  MONTHLY: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  ANNUAL: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
};
export const PRICING_TIERS: {
  standard: PricingTierData[];
  enterprise: PricingTierData[];
} = {
  standard: [
    {
      title: "Professional",
      price: "150",
      prevPrice: "199",
      description:
        "Perfect for businesses ready to optimize their financial operations with AI 📈",
      features: [
        "custom-standard",
        "AI-powered financial analysis",
        "Seasonal forecasting engine",
        "Cash flow optimization",
        "Single business entity",
        "Priority support",
        "Private Discord channel",
        "Full data privacy with zero retention policy",
      ],
      buttonText: "Get Started",
      priceId: STRIPE_PRICE_IDS.MONTHLY,
      index: 0,
    },
    {
      title: "Business",
      price: "450",
      prevPrice: "599",
      description:
        "Comprehensive solution for growing businesses with complex financial needs 🚀",
      features: [
        "Everything in Professional",
        "Multi-entity support (up to 3)",
        "Advanced market analytics",
        "Custom AI model configuration",
        "Dedicated success manager",
        "Priority feature requests",
        "Strategic quarterly reviews",
        "Advanced data integration",
      ],
      buttonText: "Scale Up",
      priceId: STRIPE_PRICE_IDS.MONTHLY,
      index: 1,
    },
    {
      title: "Premium",
      price: "999",
      prevPrice: "1299",
      description:
        "Advanced capabilities for businesses requiring sophisticated financial intelligence 🌟",
      features: [
        "Everything in Business",
        "Multi-entity support (up to 10)",
        "Custom API integration",
        "Advanced security features",
        "24/7 priority support",
        "Custom feature development",
        "Advanced risk modeling",
        "AI-powered stress testing",
      ],
      buttonText: "Go Premium",
      priceId: STRIPE_PRICE_IDS.ANNUAL,
      index: 2,
    },
  ],
  enterprise: [
    {
      title: "Enterprise",
      price: "5000",
      prevPrice: "7500",
      description:
        "Enterprise-grade financial intelligence platform for large-scale operations",
      features: [
        "custom-enterprise",
        "Unlimited entity support",
        "Custom AI model development",
        "Enterprise-grade security",
        "Dedicated engineering team",
        "Custom integration suite",
        "Advanced compliance tools",
        "White-label options",
        "Custom SLA guarantees",
        "Monthly strategy sessions",
      ],
      buttonText: "Contact Sales",
      priceId: STRIPE_PRICE_IDS.MONTHLY,
      index: 0,
    },
    {
      title: "Enterprise Plus",
      price: "Custom",
      description:
        "Tailored solutions for industry leaders with specific requirements",
      features: [
        "Everything in Enterprise",
        "Custom feature development",
        "Dedicated AI research team",
        "Industry-specific modeling",
        "Custom compliance framework",
        "Global deployment support",
        "Executive quarterly reviews",
      ],
      buttonText: "Contact Sales",
      priceId: STRIPE_PRICE_IDS.ANNUAL,
      index: 1,
    },
  ],
};

interface FooterLink {
  text: string;
  href: string;
  target?: string;
}

export const footerSections = [
  {
    title: "Company",
    links: [
      {
        text: "About Us",
        href: "/about",
      },
      {
        text: "Privacy Policy",
        href: "/privacy",
      },
      {
        text: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        text: "Pricing",
        href: "/pricing",
      },
      {
        text: "Blog",
        href: "/blog",
      },

      {
        text: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        text: "FAQ",
        href: "/faq",
      },
      {
        text: "Email",
        href: "mailto:eyoanyombapro@gmail.com",
      },
    ],
  },
];

export const socialMediaLinks = [
  {
    icon: FacebookLogo,
    link: "https://www.facebook.com/profile.php?id=61573590222070",
  },
  {
    icon: TikTokLogo,
    link: "https://www.tiktok.com/@getoppulence",
  },
  {
    icon: TwitterLogo,
    link: "https://x.com/getoppulence",
  },
  {
    icon: LinkedInLogo,
    link: "https://www.linkedin.com/company/getoppulence/about/?viewAsMember=true",
  },
  {
    icon: YouTubeLogo,
    link: "https://youtube.com/@getoppulence?si=6dOxvPog76BSFVDk",
  },
];
