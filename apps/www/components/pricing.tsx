"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Info, Sparkles } from "lucide-react";
import { PricingPageProps, PricingTierProps } from "@/types/pricing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/utils/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCheckout } from "@/hooks/useCheckout";

interface ExtendedPricingTierProps extends PricingTierProps {
  disabled?: boolean;
  isPopular?: boolean;
}

type VersionInfo = {
  version: string;
  lastReleaseDate: string;
};

const PricingTier: React.FC<ExtendedPricingTierProps> = ({
  title,
  prevPrice,
  price,
  description,
  features,
  buttonText,
  isFree = false,
  priceId,
  user,
  index,
  disabled,
  isPopular = false,
  priceUnit = "/month",
}) => {
  const { handleCheckout, isSubmitting } = useCheckout(user);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string>();
  const router = useRouter();
  const appleContainer = useRef<HTMLDivElement>(null);
  const [appleDownload, setAppleDownload] = useState<
    "darwin-arm64" | "intel-x64"
  >("darwin-arm64");

  // used to ensure animations run after mount client-side
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradientStyle = mounted
    ? {
        backgroundImage:
          "linear-gradient(45deg, #1a237e, #006064, #1b5e20, #006064, #b71c1c)",
        backgroundSize: "300% 300%",
        animation: "rainbow-animation 5s ease infinite",
        color: "white",
        transition: "all 0.3s ease",
      }
    : {};

  const handleDownload = async (os_type: string) => {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/download?os_type=${os_type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error(res.statusText);
      }

      const download = await res.json();
      if (download?.url) {
        setDownloadLink(download.url);
        router.push(download.url);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const featureRowDescription = (feature: string) => {
    // if (feature?.startsWith("custom-standard")) {
    //   return (
    //     <div className="flex items-center">
    //       <span>
    //         Monthly refill of Oppulence Credits for market-leading AI models
    //         <PearCreditsTooltip type="standard" />
    //       </span>
    //     </div>
    //   );
    // } else if (feature?.startsWith("free")) {
    //   return (
    //     <div className="flex items-center">
    //       <span>
    //         Use our free trial, your own API key, or local models
    //         <PearCreditsTooltip type="free" />
    //       </span>
    //     </div>
    //   );
    // } else if (feature?.startsWith("custom-enterprise")) {
    //   return (
    //     <div className="flex items-center">
    //       <span>
    //         Monthly refill of increased Oppulence Credits for market-leading AI
    //         models
    //         <PearCreditsTooltip type="enterprise" />
    //       </span>
    //     </div>
    //   );
    // }
    return feature;
  };
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    const fetchVersionInfo = async () => {
      try {
        const response = await fetch("/api/version-info");
        if (!response.ok) {
          throw new Error("Failed to fetch version info");
        }
        const data: VersionInfo = await response.json();
        setVersionInfo(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchVersionInfo();
  }, []);

  return (
    <Card
      className={cn(
        "group relative flex h-full w-full flex-col transition-all duration-300 ease-in-out",
        isPopular && "scale-[1.02] shadow-lg",
        isHovered && "translate-y-[-4px] shadow-xl",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <Badge
          className="text-secondary absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 py-1 text-sm font-medium shadow-md"
          variant="default"
        >
          <Sparkles className="mr-1 h-3.5 w-3.5" /> Most Popular
        </Badge>
      )}
      <div className="flex h-full w-full flex-col">
        <CardHeader className="flex-grow-0 px-6 py-6 pb-0">
          <CardTitle className="text-2xl font-bold leading-6 text-foreground">
            {title}
            {index === 1 && title === "Junior Engineer" && (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                (Monthly)
              </span>
            )}
            {index === 2 && title === "10x Engineer" && (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                (Yearly)
              </span>
            )}
          </CardTitle>
          <p className="mt-2 text-base font-normal text-muted-foreground">
            {index === 0 && isFree && (
              <>You can download Oppulence directly 🤓</>
            )}
            {!isFree && description}
          </p>
        </CardHeader>
        <CardContent className="mt-5 flex flex-grow flex-col px-6">
          {!isFree ? (
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-baseline">
                <p
                  className="text-3xl font-bold text-foreground"
                  aria-label={`Price: $${price} per month`}
                >
                  ${price}
                </p>
                <small className="ml-1 text-base text-muted-foreground">
                  {priceUnit}
                </small>
                <div className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Early Bird
                </div>
              </div>
              <p
                className="mt-1 text-sm text-muted-foreground"
                aria-label={`Original price: $${prevPrice} per month`}
              >
                <del>${prevPrice}</del>
                <small>{priceUnit}</small>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-3xl font-bold text-foreground"
                aria-label="Price: Free"
              >
                Free
              </p>
              <p
                className="mt-1 text-sm text-muted-foreground"
                aria-label="Tagline: Start coding"
              >
                Free requests out of the box, no credit card required.
              </p>
            </div>
          )}
          {features && (
            <ul
              className="mt-6 space-y-3 text-sm"
              aria-label={`Features of ${title} plan`}
            >
              {features.map((feature, idx) => (
                <li
                  key={`${idx}-${feature}`}
                  className="flex items-start text-muted-foreground"
                >
                  <Check
                    className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{featureRowDescription(feature)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6">
          {isFree ? (
            <span className="text-sm text-muted-foreground">
              Sorry but downloads are temporarily disabled for the week! Please
              check back later. If you have concerns or questions, please
              contact{" "}
              <Link
                href="mailto:eyoanyombapro@gmail.com"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                eyoanyombapro@gmail.com
              </Link>
              .
            </span>
          ) : (
            <>
              {disabled ? (
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              ) : (
                <Button
                  className={cn(
                    "w-full transition-all duration-300",
                    isPopular && "bg-primary hover:bg-primary/90",
                  )}
                  onClick={() => {
                    window.location.href = "https://app.thinkthank.io/register";
                  }}
                  aria-label={`Subscribe to ${title} plan`}
                >
                  {buttonText}
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

const PricingPage: React.FC<PricingPageProps> = ({ user }) => {
  const searchParams = useSearchParams();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    searchParams?.get("billing") === "yearly" ? "yearly" : "monthly",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams?.get("category") || "lead-management",
  );
  const router = useRouter();
  const tabsRef = useRef<HTMLDivElement>(null);

  const discount = billingCycle === "yearly" ? 20 : 0;

  // Update URL when state changes without scrolling
  const updateQueryParams = (params: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    // Use replaceState to update URL without scrolling
    window.history.replaceState({}, "", url.pathname + url.search);
  };

  const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    updateQueryParams({ billing: cycle });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateQueryParams({ category });
  };

  return (
    <section
      className="relative pt-4 sm:pt-8 md:pt-12 lg:pt-16"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute top-0 z-[-1] mt-[-35px] h-[140px] w-full bg-primary-800/30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-6">
          <header className="mx-auto max-w-3xl space-y-3 text-center">
            <h1
              id="pricing-heading"
              className="bg-gradient-to-r from-primary to-primary-800 bg-clip-text text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-5xl lg:text-5xl"
            >
              🚀 Scale Your Business
              <br />
              With Our Suite of Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the perfect combination of tools to supercharge your
              business growth
            </p>
          </header>

          <div className="mt-6 flex w-full max-w-xs items-center justify-center rounded-full bg-foreground p-1">
            <button
              onClick={() => handleBillingCycleChange("monthly")}
              className={cn(
                "w-1/2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange("yearly")}
              className={cn(
                "w-1/2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                billingCycle === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              {discount > 0 && (
                <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Save {discount}%
                </span>
              )}
            </button>
          </div>

          <div className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary/10 to-transparent p-4 backdrop-blur-sm">
            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <p className="text-center text-sm font-medium text-foreground md:text-left">
                🎁 Bundle & Save: Get 30% off when you combine 3 or more
                products
              </p>
              <p className="flex flex-col items-center text-center md:flex-row md:text-right">
                <strong className="text-lg font-bold text-primary">
                  Save up to $897/year
                </strong>
                <span className="ml-1 text-sm text-muted-foreground">
                  with annual billing
                </span>
              </p>
            </div>
          </div>

          <div ref={tabsRef} className="w-full">
            <Tabs
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="mt-4 flex w-full flex-col items-center"
            >
              <TabsList className="grid h-full w-fit max-w-2xl grid-cols-2 gap-1 rounded-lg bg-foreground p-1">
                <TabsTrigger
                  value="lead-management"
                  className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  🎯 Lead Management
                </TabsTrigger>
                <TabsTrigger
                  value="prospecting"
                  className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  🔍 Prospecting
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lead-management" className="mt-6 w-full">
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                  <PricingTier
                    title="Starter"
                    price={billingCycle === "yearly" ? "39" : "49"}
                    prevPrice={billingCycle === "yearly" ? "49" : "59"}
                    description="Perfect for small sales teams getting started with lead management"
                    features={[
                      "Up to 2,500 leads",
                      "Basic AI lead scoring",
                      "Lead capture forms",
                      "Email tracking & notifications",
                      "Basic reporting",
                    ]}
                    buttonText="Start Free Trial"
                    user={user}
                    index={0}
                    priceUnit={
                      billingCycle === "yearly"
                        ? "/month, billed yearly"
                        : "/month"
                    }
                  />

                  <PricingTier
                    title="Professional"
                    price={billingCycle === "yearly" ? "79" : "99"}
                    prevPrice={billingCycle === "yearly" ? "99" : "119"}
                    description="For growing teams needing advanced features"
                    features={[
                      "Unlimited leads",
                      "Advanced AI lead scoring & predictions",
                      "Custom lead capture forms",
                      "Lead enrichment & company data",
                      "Advanced email tracking & analytics",
                      "Team collaboration tools",
                    ]}
                    buttonText="Start Free Trial"
                    user={user}
                    index={1}
                    isPopular={true}
                    priceUnit={
                      billingCycle === "yearly"
                        ? "/month, billed yearly"
                        : "/month"
                    }
                  />

                  <PricingTier
                    title="Enterprise"
                    price="Custom"
                    description="Custom solutions for large organizations"
                    features={[
                      "Custom AI model training",
                      "Advanced security features",
                      "Custom integrations",
                      "Dedicated success manager",
                      "Priority support",
                      "Custom reporting",
                    ]}
                    buttonText="Contact Sales"
                    user={user}
                    index={2}
                    priceUnit=""
                  />
                </div>
              </TabsContent>

              <TabsContent value="prospecting" className="mt-6 w-full">
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                  <PricingTier
                    title="Basic"
                    price={billingCycle === "yearly" ? "31" : "39"}
                    prevPrice={billingCycle === "yearly" ? "39" : "49"}
                    description="Get started with prospecting"
                    features={[
                      "100 leads/month",
                      "Basic lead search",
                      "Email verification",
                      "Company information",
                      "Export to CSV",
                    ]}
                    buttonText="Start Free Trial"
                    user={user}
                    index={0}
                    priceUnit={
                      billingCycle === "yearly"
                        ? "/month, billed yearly"
                        : "/month"
                    }
                  />

                  <PricingTier
                    title="Pro"
                    price={billingCycle === "yearly" ? "71" : "89"}
                    prevPrice={billingCycle === "yearly" ? "89" : "109"}
                    description="Advanced prospecting features"
                    features={[
                      "500 leads/month",
                      "Advanced search filters",
                      "Lead scoring",
                      "Chrome extension",
                      "Team collaboration",
                      "CRM integration",
                    ]}
                    buttonText="Start Free Trial"
                    user={user}
                    index={1}
                    isPopular={true}
                    priceUnit={
                      billingCycle === "yearly"
                        ? "/month, billed yearly"
                        : "/month"
                    }
                  />

                  <PricingTier
                    title="Enterprise"
                    price="Custom"
                    description="Custom solutions for large teams"
                    features={[
                      "Unlimited leads",
                      "API access",
                      "Custom integrations",
                      "Dedicated support",
                      "Advanced analytics",
                      "Custom workflows",
                    ]}
                    buttonText="Contact Sales"
                    user={user}
                    index={2}
                    priceUnit=""
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Contact our sales team at{" "}
              <Link
                href="mailto:sales@oppulence.app"
                className="font-medium text-primary hover:underline"
              >
                sales@oppulence.app
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;

export const PearCreditsTooltip = ({ type }: { type: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const pearCreditsCount = useMemo(() => {
    return (type: string) => {
      if (type === "free") {
        return "50";
      }
      if (type === "enterprise") {
        return "1000";
      }
      return "700";
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen} delayDuration={50}>
        <TooltipTrigger asChild>
          <Info
            className="mb-0.5 ml-1 inline-flex h-4 w-4 flex-shrink-0 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="max-w-[250px]">
            Current models include Claude 3.5 Sonnet and GPT4o.
            <br /> <br />
            Your Oppulence Credits usage depend on your prompt input and output
            sizes. On average, this equates to around {pearCreditsCount(
              type,
            )}{" "}
            requests{type === "free" && " for our current free trial"}.
            {type !== "free" && (
              <>
                <br /> <br />
                Afraid of running out of credits? You can always contact{" "}
                <a
                  className="cursor-pointer text-foreground transition-colors hover:text-primary-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(CONTACT_EMAIL);
                    toast.success("Email copied to clipboard!");
                  }}
                >
                  Oppulence support
                </a>{" "}
                to top up and keep building!
              </>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
