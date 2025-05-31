"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeatureFlag, isFeatureEnabled } from "@/utils/feature-flags";
import {
  LogIn,
  LogOut,
  Menu,
  MoonStar,
  Settings,
  SquareArrowRight,
  Sun,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { Button } from "./button";
import Link from "next/link";
import LogoImage from "./logo-image";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";

export default function MobileMenu({
  user,
  handleSignOut,
}: {
  user: User | null;
  handleSignOut: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Feature flags
  const showHowItWorks = isFeatureEnabled(FeatureFlag.HOW_IT_WORKS);
  const showFeatures = isFeatureEnabled(FeatureFlag.FEATURES);
  const showBenefits = isFeatureEnabled(FeatureFlag.BENEFITS);
  const showLeadSourcingProduct = isFeatureEnabled(
    FeatureFlag.LEAD_SOURCING_PRODUCT,
  );
  const showLeadManagementProduct = isFeatureEnabled(
    FeatureFlag.LEAD_MANAGEMENT_PRODUCT,
  );
  const showDeveloperPlatformDocs = isFeatureEnabled(
    FeatureFlag.DEVELOPER_PLATFORM_DOCS,
  );
  const showProducts =
    showLeadSourcingProduct &&
    showLeadManagementProduct &&
    showDeveloperPlatformDocs;

  useEffect(() => {
    setMounted(true);
  }, []);

  const MobileNavItem = ({
    href,
    onClick,
    children,
  }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className="block rounded-md py-4 text-base font-medium text-foreground"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-secondary-300/10"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[300px] flex-col justify-between sm:w-[400px]"
        >
          <div>
            <SheetHeader className="mb-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <LogoImage width={24} height={24} className="h-6 w-6" />
                <SheetTitle className="text-center">Oppulence Menu</SheetTitle>
              </div>
            </SheetHeader>
            <nav aria-label="Mobile menu">
              <ul className="space-y-1">
                <div className="mb-4 space-y-4">
                  {user ? (
                    <>
                      <div className="hidden items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.user_metadata.avatar_url}
                            alt={user.user_metadata.full_name || "User avatar"}
                          />
                          <AvatarFallback>
                            {user.email?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {user.user_metadata.full_name || user.email}
                        </span>
                      </div>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* <Link
                        href="https://app.thinkthank.io"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-2xl"
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign in
                        </Button>
                      </Link>
                      <Link
                        href="https://app.thinkthank.io"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="mt-4 w-full justify-start rounded-2xl"
                        >
                          <SquareArrowRight className="mr-2 h-4 w-4" />
                          Try Oppulence
                        </Button>
                      </Link> */}
                    </>
                  )}
                </div>
                <MobileNavItem href="/" onClick={() => setIsOpen(false)}>
                  Home
                </MobileNavItem>
                <Accordion type="single" collapsible className="w-full">
                  {showProducts && (
                    <AccordionItem value="products">
                      <AccordionTrigger>⚙️ Products</AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-4 space-y-1">
                          {showLeadManagementProduct && (
                            <MobileNavItem
                              href="https://app.thinkthank.io/register"
                              onClick={() => setIsOpen(false)}
                            >
                              🎯 Lead Management
                            </MobileNavItem>
                          )}
                          {showLeadSourcingProduct && (
                            <MobileNavItem
                              href="https://sourcing.oppulence.app"
                              onClick={() => setIsOpen(false)}
                            >
                              🔍 Prospecting
                            </MobileNavItem>
                          )}
                          {showDeveloperPlatformDocs && (
                            <MobileNavItem
                              href="https://docs.oppulence.app"
                              onClick={() => setIsOpen(false)}
                            >
                              🧩 Developers
                            </MobileNavItem>
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  <AccordionItem value="resources">
                    <AccordionTrigger>📊 Resources</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-4 space-y-1">
                        <MobileNavItem
                          href="/about"
                          onClick={() => setIsOpen(false)}
                        >
                          🏢 About
                        </MobileNavItem>
                        {showHowItWorks && (
                          <MobileNavItem
                            href="/how-it-works"
                            onClick={() => setIsOpen(false)}
                          >
                            🚀 How It Works
                          </MobileNavItem>
                        )}
                        {showFeatures && (
                          <MobileNavItem
                            href="/features"
                            onClick={() => setIsOpen(false)}
                          >
                            ✨ Features
                          </MobileNavItem>
                        )}
                        {showBenefits && (
                          <MobileNavItem
                            href="/benefit"
                            onClick={() => setIsOpen(false)}
                          >
                            🌟 Benefits
                          </MobileNavItem>
                        )}
                        <MobileNavItem
                          href="/blog"
                          onClick={() => setIsOpen(false)}
                        >
                          📰 Blog
                        </MobileNavItem>
                        <MobileNavItem
                          href="/faq"
                          onClick={() => setIsOpen(false)}
                        >
                          ❓ FAQ
                        </MobileNavItem>
                        <MobileNavItem
                          href="/changelog"
                          onClick={() => setIsOpen(false)}
                        >
                          📈 Changelog
                        </MobileNavItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="masterplan">
                    <AccordionTrigger>🔐 Master Plan</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-4 space-y-1">
                        <MobileNavItem
                          href="/masterplan"
                          onClick={() => setIsOpen(false)}
                        >
                          Part Un: AI-Powered Lead Sourcing
                        </MobileNavItem>
                        <MobileNavItem
                          href="/masterplan-part-deux"
                          onClick={() => setIsOpen(false)}
                        >
                          Part Deux: Autonomous Engagement
                        </MobileNavItem>
                        <MobileNavItem
                          href="/masterplan-part-three"
                          onClick={() => setIsOpen(false)}
                        >
                          Part Trois: AI-to-AI Economy
                        </MobileNavItem>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <MobileNavItem href="/roadmap" onClick={() => setIsOpen(false)}>
                  🗺️ Roadmap{" "}
                  <span className="ml-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    New
                  </span>
                </MobileNavItem>
                <MobileNavItem href="/pricing" onClick={() => setIsOpen(false)}>
                  💎 Pricing{" "}
                  <span className="ml-1 rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Updated
                  </span>
                </MobileNavItem>
              </ul>
            </nav>
          </div>
          <div className="width-full space-y-4 pb-6">
            <div className="width-full">
              {mounted ? (
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? (
                    <>
                      <Sun strokeWidth={1} className="h-5 w-5" />
                      Light
                    </>
                  ) : (
                    <>
                      <MoonStar strokeWidth={1} className="h-5 w-5" />
                      Dark
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
