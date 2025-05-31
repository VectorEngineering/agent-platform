import "./css/style.css";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/ui/header";
import PageIllustration from "@/components/page-illustration";
import PostHogPageViewWrapper from "../components/posthog-page-view-wrapper";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {!isProd && (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        )}
      </head>
      <Providers>
        <body className="bg-background font-sans tracking-tight text-gray-900 antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PostHogPageViewWrapper />
            <div className="no-scrollbar hide-scrollbar flex min-h-screen flex-col overflow-hidden">
              <Header />
              {children}
              <Footer />
              <Toaster position="bottom-right" richColors />
              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
