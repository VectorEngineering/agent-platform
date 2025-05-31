import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "Why Open Source Matters for AI Code Editors",
  url: "https://pearai.com/blog/why-open-source",
  excerpt:
    "Discover why open source is crucial for AI code editors and how PearAI leverages this approach to create a superior product with a thriving community.",
  date: "2025-09-26T00:00:00Z",
  author: "Duke Pan",
  readingTime: "3 minutes",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: ["featured", "guide", "Open Source"],
  slug: "why-open-source",
  summary:
    "Discover why open source is crucial for AI code editors and how PearAI leverages this approach to create a superior product with a thriving community.",
  content: `<article class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8">
  <section class="space-y-6">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">The True Differentiators For The Future Of AI Code Editors</h2>
    <p>
      In the world of AI-powered code editors, the playing field for AI models is surprisingly level. Most editors simply use the best available models on the market, which are all improving everyday. This means that the real distinguishing factors lie elsewhere:
    </p>
    <ul class="list-disc pl-6">
      <li>User Interface and Experience (UI/UX)
        <p class="text-gray-600 text-base">Open source allows for community-driven UI/UX improvements; with an extremely tight user feedback loop, we know exactly what you want. Code editors are uniquely suited for open source development because the developers themselves are users of the product!</p>
      </li>
      <li>Trust and Transparency
        <p class="text-gray-600 text-base">With open source, the codebase is visible to all, fostering trust through transparency and allowing for independent security audits.</p>
      </li>
      <li>Community Support
        <p class="text-base text-gray-600 mt-1 mb-2">Open source projects benefit from a global community of developers, leading to faster bug fixes, feature requests, and overall product improvement. For example, during our launch, we had no Linux version, but many people who only use Linux wanted to use PearAI. Someone from our community (s/o to Max!) single-handedly developed a Linux distribution, which is now available today for everyone to use.</p>
      </li>
      <li>Distribution
        <p class="text-base text-gray-600 mt-1 mb-2">Due to the underlying models being similar between products, the team with the coolest and strongest community will be the most popular (that's us 😉).</p>
      </li>
    </ul>
    <p>
      These factors align perfectly with the principles of open source software, making it an ideal approach for AI code editors.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Why Us: PearAI's Thriving Open Source Community</h2>
    <p>
      PearAI stands out with the most active open source community among AI code editors. Unlike many open source projects that rely on just one or two contributors, PearAI boasts an impressive statistic:
    </p>
    <figure class="mt-4">
      <figcaption class="text-center text-sm mt-2">Over 50% of commits are made by contributors.</figcaption>
    </figure>
    <p>
      This diverse contribution spans across our landing page, server, and the app itself, driving our rapid development cycle.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Beyond Code: Open Source Founders</h2>
    <p>
      At PearAI, our commitment to openness extends beyond our codebase. As founders, we embrace an "open source" approach to our journey:
    </p>
    <ul class="list-disc pl-6">
      <li>We share our entire development process online</li>
      <li>Our YouTube channel documents our progress and insights</li>
      <li>We livestream our discussions, us coding the product, and engage with the community through Twitch livestreams</li>
    </ul>
    <p>
      This transparency and engagement form the foundation of our strong community right from the start.
    </p>
    <p class="mt-4">
      Follow our journey on:
      <br />
      YouTube: <a href="https://youtube.com/@nang88" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">@nang88</a>, <a href="https://youtube.com/@FryingPan" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">@FryingPan</a>
      <br />
      Twitch: <a href="https://twitch.tv/not_nang" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">not_nang</a>, <a href="https://twitch.tv/fryingpan" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">fryingpan</a>
    </p>
  </section>
</article>`,
});
