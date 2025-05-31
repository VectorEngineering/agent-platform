import { Card, CardContent } from "@/components/ui/card";

import type React from "react";

const MasterPlanComponent: React.FC = () => {
  return (
    <section className={"mt-36"}>
      <div
        className={
          "m-4 mt-0 flex flex-col items-center lg:m-0 lg:justify-center"
        }
      >
        <h1 className="text-center text-4xl font-bold">
          <span className="relative">
            <span className="relative z-10 text-foreground">
              The Secret AI-Powered Lead Sourcing Master Plan
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
        <div className="mt-6 flex w-full max-w-3xl flex-col gap-6">
          <p className="text-center text-xl font-medium italic text-gray-600">
            (just between you and me)
          </p>

          <div className="space-y-6 text-left text-gray-600">
            <p>
              As you know, our initial product is a high-quality AI-powered lead
              sourcing platform for small businesses. However, some readers may
              not be aware that our long-term plan is to build a comprehensive
              suite of AI-driven sales tools that democratize enterprise-grade
              technology. This is because the overarching purpose of our company
              (and the reason I am self-funding it out of pocket) is to help
              expedite the move from manual, inefficient prospecting toward an
              AI-augmented sales ecosystem, which I believe to be the primary
              sustainable solution for small business growth.
            </p>

            <p>
              Critical to making that happen is an AI lead platform without
              compromises, which is why our solution is designed to beat
              traditional lead generation methods in a head-to-head showdown.
              Even so, some may question whether this actually helps the broader
              market. Are small businesses really in need of another lead
              generation tool? Will it actually make a difference to their
              bottom line?
            </p>

            <p>
              Well, the answers are no and not much—if we're only talking about
              our initial product. However, that misses the point, unless you
              understand the secret master plan alluded to above. Almost any new
              AI technology initially has high implementation costs before it
              can be optimized, and this is no less true for sales intelligence
              systems. The strategy is to enter with high-value, data-enriched
              lead sourcing where customers are prepared to pay a premium, and
              then drive downstream as fast as possible to higher volume and
              more automated solutions with each successive product release.
            </p>

            <p>
              Without giving away too much, I can say that our second release
              will be a comprehensive lead engagement system at roughly half the
              price point of our initial platform, and the third release will be
              even more affordable while adding autonomous capabilities. In
              keeping with a fast-growing technology company, all free cash flow
              is plowed back into R&D to drive down costs and bring follow-on
              products to market as fast as possible. When someone subscribes to
              our AI lead sourcing platform, they are actually helping pay for
              development of the fully autonomous sales assistant that small
              businesses desperately need.
            </p>

            <p className="pt-4 font-semibold">
              Now I'd like to address two repeated arguments against AI sales
              tools—data privacy concerns and ROI justification:
            </p>

            <div className="my-6 border-l-4 border-green-200 pl-4">
              <h3 className="text-lg font-bold">
                AI that respects data privacy!
              </h3>
              <p className="mt-2">
                Our platform adheres to all relevant regulations like GDPR and
                CCPA. We're not just legally compliant; we've designed our
                system to be ethically sound. Lead data is sourced responsibly,
                and we maintain transparency about how we obtain information.
                Moreover, we give leads the ability to opt out, and we regularly
                audit our AI for bias.
              </p>
            </div>

            <div className="my-6 border-l-4 border-green-200 pl-4">
              <h3 className="text-lg font-bold">
                ROI Justification aka "The True Value"
              </h3>
              <p className="mt-2">
                The commonly cited metric for our platform is the 50%+ increase
                in sales-ready leads and 60% reduction in costs. But let's look
                deeper at what this means for small businesses:
              </p>
              <p className="mt-2">
                A typical small business might spend 20+ hours weekly on manual
                prospecting and qualification. With our system, that drops to
                under 5 hours, freeing up 15 hours of valuable time. At an
                average $50/hour cost of sales talent, that's $750 weekly or
                $39,000 annually in recaptured productivity. Our platform's
                enriched data and scoring also means higher conversion
                rates—typically improving from 10% to 25%+ on follow-ups. For a
                business that closes an average $5,000 deal, this could mean
                hundreds of thousands in additional revenue annually.
              </p>
            </div>

            <p className="pt-4 font-semibold">
              So, in short, the master plan is:
            </p>

            <ol className="list-decimal space-y-2 pl-6">
              <li>Build premium AI lead sourcing platform</li>
              <li>
                Use that money to build an affordable lead engagement system
              </li>
              <li>
                Use that money to build a fully autonomous sales assistant
              </li>
              <li>
                While doing the above, also provide integration with the entire
                small business tech stack
              </li>
            </ol>

            <p className="mt-8 text-center font-medium italic">
              Don't tell anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterPlanComponent;
