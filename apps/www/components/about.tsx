import { Card, CardContent, CardDescription } from "@/components/ui/card";

import type React from "react";

type VideoData = {
  src: string;
  title: string;
  description: string;
};

type VideoCardProps = VideoData;

const videoData: VideoData[] = [
  {
    src: "https://www.youtube.com/embed/Rzk3GmXUySs?si=2Y25oMlhbQWZpu1K",
    title: "Frying Pan`&apos;`s Latest YouTube video",
    description:
      "Pan shows the journey after just starting to build out Oppulence. The product is described and a demo is shown. You also get to see a sneak peak into the founders`&apos;` week, and see the difficulties, the highs and lows we experience, all in NYC.",
  },
  {
    src: "https://www.youtube.com/embed/hHm4mtIp6K0",
    title: "Nang`&apos;`s Latest YouTube video",
    description:
      "Nang introduces Oppulence, an AI-powered code editor aimed at transforming software development. He shares his journey from a high-paying job to pursuing startups and YouTube, encouraging viewers to chase their dreams with determination.",
  },
];

const AboutComponent: React.FC = () => {
  return (
    <section className={"mt-36"}>
      <div
        className={
          "m-4 mt-0 flex flex-col items-center lg:m-0 lg:justify-center"
        }
      >
        <h1 className="text-center text-4xl font-bold">
          AI-Powered Lead Sourcing{" "}
          <span className="relative">
            <span className="relative z-10 text-foreground">
              for Small Businesses 🚀
            </span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            />
          </span>
        </h1>
        <div className="flex w-full max-w-3xl flex-col gap-2">
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="flex items-center gap-2 text-xl font-bold">
              <span>🔍 Competitive Edge for Small Businesses</span>
            </p>
            <p className="text-left text-gray-500">
              Artificial intelligence is rapidly transforming how small
              businesses find and nurture sales leads. Traditional lead sourcing
              – manual prospecting, purchasing static contact lists, or relying
              on gut feeling – is being replaced by AI-driven platforms that
              automate discovery, enrichment, and prioritization of prospects.
            </p>
            <p className="text-left text-gray-500">
              Small firms, often limited in time and sales personnel, stand to
              gain a disproportionate advantage from these tools. Companies
              using AI for lead generation have seen over 50% increases in
              sales-ready leads and a 60% reduction in costs. In fact, 74% of
              small business owners believe employees using AI tools give them a
              competitive edge over peers. ⏳
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="flex items-center gap-2 text-xl font-bold">
              <span>💡 Data-Driven Intelligence</span>
            </p>
            <p className="text-left text-gray-500">
              The lead generation landscape is undergoing a seismic shift away
              from manual list building and cold calls toward data-driven,
              automated strategies. Instead of relying on gut instinct or
              generic campaigns, companies are leveraging AI to analyze customer
              data and online behavior to pinpoint the most promising prospects.
              🧠
            </p>
            <p className="text-left text-gray-500">
              AI-powered predictive analytics can identify prospects before they
              even raise their hand, by spotting intent signals or patterns that
              correlate with buying interest. Small businesses benefit by
              focusing their limited sales resources on leads most likely to
              convert, rather than exhausting effort on unqualified contacts.
              Our platform delivers rich intelligence on each lead and helps
              users craft relevant messages.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 md:pt-[10%]">
            <p className="flex items-center gap-2 text-xl font-bold">
              <span>🔄 Seamless Integration</span>
            </p>
            <p className="text-left text-gray-500">
              About 87% of companies with 10–100 employees use a CRM system as
              the heart of their sales operations. Any lead sourcing platform
              must play nicely with CRMs. Businesses want new leads flowing
              directly into their CRM, and updates like lead scores or contact
              enrichments syncing automatically.
            </p>
            <p className="text-left text-gray-500">
              Our platform integrates seamlessly with popular CRMs (like
              HubSpot, Pipedrive, Zoho) to fit into existing workflows. The
              result is a platform that streamlines lead generation end-to-end,
              making it the AI-powered growth engine for small businesses. With
              machine learning-based lead scoring and intent modeling, we help
              you identify and prioritize hot prospects, shortening sales cycles
              by an estimated 30%. 📈
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center max-w-4xl px-4 m-auto mb-8">
        <Tweet id="1825456010862956844" components={components} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-4 pt-0 m-auto mb-10 lg:flex-row lg:p-0">
        {videoData.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div> */}

      {/* <div className="flex flex-col items-center justify-center p-4 pb-0 mt-0">
        <h2 className="text-4xl font-bold">
          <span className="relative">
            <span className="relative z-10">Founders</span>
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "1.4375rem",
                background: "rgba(20, 189, 149, 0.20)",
              }}
            ></span>
          </span>
        </h2>

        <div className="max-w-2xl text-gray-500">
          <p className="mt-6 text-center">
            Oppulence is founded by Pan and Nang, both former software
            engineers who worked on developer tooling at companies like Meta,
            Coinbase, and high-frequency trading firms.
          </p>
          <p className="mt-3 text-center">
            Passionate about empowering individuals, they recognize code and
            media as the most scalable tools a single person can utilize. With a
            combined following of over 500k subscribers and over 30 million
            views, they&apos;ve decided to combine media and code, bringing the
            developer community along for the ride. They&apos;re building the
            next open-source AI-powered code editor, Oppulence, with full
            transparency through videos, livestreams, and direct Discord
            calls/chats.
          </p>
        </div>
      </div> */}
    </section>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ src, title, description }) => (
  <Card>
    <CardContent
      className="flex flex-col-reverse p-4 sm:flex-col"
      style={{
        width: "100%",
        maxWidth: "30rem",
        minHeight: "24rem",
      }}
    >
      <div
        className="relative mt-4 sm:mb-4 sm:mt-0"
        style={{
          paddingBottom: "16rem",
        }}
      >
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardDescription className="text-gray-500">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default AboutComponent;
