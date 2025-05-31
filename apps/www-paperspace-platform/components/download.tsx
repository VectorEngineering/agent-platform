import { Clock, Globe, Lock, Server, Shield, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CopyInput } from "./ui/copy-input";

export const DownloadPage: React.FC = () => {
  return (
    <section
      className="relative min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-32"
      aria-labelledby="download-heading"
    >
      <div className="absolute top-0 z-[-1] mt-[-35px] h-[140px] w-full bg-primary-800/30 blur-3xl"></div>
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-20">
        <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          {/* Header Section - Added more vertical space */}
          <header className="mx-auto max-w-6xl space-y-8 text-center sm:mt-0">
            <h1
              id="download-heading"
              className="text-4xl font-medium leading-tight sm:text-5xl md:text-5xl lg:text-5xl"
            >
              Download Our Desktop App
            </h1>
          </header>

          {/* Feature Cards Section - Added margin and padding */}
          {/* <div className="w-full py-8">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Enterprise Security"
                description="Bank-grade encryption and compliance standards for your financial data"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Real-time Analytics"
                description="Instant financial insights and AI-powered forecasting"
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6" />}
                title="24/7 Availability"
                description="Continuous monitoring and analysis of your business metrics"
              />
            </div>
          </div> */}

          {/* Download Section - Added padding and margin */}
          <div className="w-full py-12">
            <AppDownloadSection />
          </div>

          {/* System Requirements Section - Added spacing */}
          <div className="mb-16 w-full max-w-6xl py-12">
            <h2 className="mb-12 text-center text-2xl font-medium">
              System Requirements
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <SystemRequirements
                platform="Mac"
                requirements={[
                  "macOS 11.0 or later",
                  "Apple Silicon or Intel processor",
                  "8GB RAM minimum",
                  "2GB free disk space",
                ]}
              />
              <SystemRequirements
                platform="Windows"
                requirements={[
                  "Windows 10/11 64-bit",
                  "Modern multi-core processor",
                  "8GB RAM minimum",
                  "2GB free disk space",
                ]}
              />
              <SystemRequirements
                platform="Linux"
                requirements={[
                  "Ubuntu 20.04 or equivalent",
                  "x86_64 architecture",
                  "8GB RAM minimum",
                  "2GB free disk space",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Card className="flex flex-col items-center p-8 text-center">
    <div className="mb-6 rounded-full bg-background p-4">{icon}</div>
    <h3 className="mb-4 text-lg font-medium">{title}</h3>
    <p className="text-sm text-foreground">{description}</p>
  </Card>
);

const SystemRequirements: React.FC<{
  platform: string;
  requirements: string[];
}> = ({ platform, requirements }) => (
  <Card className="p-8">
    <h3 className="mb-6 text-lg font-medium">{platform}</h3>
    <ul className="space-y-4">
      {requirements.map((req, index) => (
        <li key={index} className="flex items-center text-sm text-gray-600">
          <Server className="mr-3 h-4 w-4 text-primary-600" />
          {req}
        </li>
      ))}
    </ul>
  </Card>
);

export function AppDownloadSection() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Tabs defaultValue="mac" className="w-full bg-background text-foreground">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl">
          <TabsTrigger value="mac">Mac</TabsTrigger>
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
        </TabsList>
        <TabsContent value="mac" className="mt-6">
          <AppDownload
            platform="Mac"
            link="https://dub.oppulence.app/l66aUzF"
            features={[
              "Native Apple Silicon support",
              "Touch Bar integration",
              "Seamless iCloud sync",
            ]}
          />
        </TabsContent>
        <TabsContent value="windows" className="mt-6">
          <AppDownload
            platform="Windows"
            link="https://dub.oppulence.app/CvbYQHY"
            features={[
              "Windows Hello authentication",
              "Multi-monitor support",
              "Windows notifications",
            ]}
          />
        </TabsContent>
        <TabsContent value="linux" className="mt-6">
          <AppDownload
            platform="Linux"
            link="https://dub.oppulence.app/NNudKB8"
            features={[
              "Native Wayland support",
              "System tray integration",
              "Custom desktop notifications",
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AppDownloadProps {
  platform: "Mac" | "Windows" | "Linux";
  link: string;
  features: string[];
}

const AppDownload: React.FC<AppDownloadProps> = ({
  platform,
  link,
  features,
}) => {
  return (
    <div className="rounded-2xl border p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium">Oppulence for {platform}</h2>
          <p className="mt-3 text-gray-600">
            Enterprise-grade financial intelligence platform
          </p>
        </div>
        <Lock className="h-6 w-6 text-primary-600" />
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium">Platform Features</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <Globe className="mr-3 h-4 w-4 text-primary-600" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 space-y-6">
        <a href={link} download className="block">
          <Button
            variant="default"
            className="h-12 w-full text-base font-medium"
          >
            Download Oppulence
          </Button>
        </a>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">Manual Installation</p>
          <CopyInput
            value={`curl -sL ${link} | tar -xz`}
            className="w-full rounded-xl font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};
