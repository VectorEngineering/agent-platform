import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title:
    "New Leetcode Feature in PearAI - Supercharge Your Interview Prep With AI",
  url: "https://pearai.com/blog/introducing-leetcode-feature",
  excerpt:
    "Improve your coding skills and interview readiness with PearAI's LeetCode integration. A practical tool for efficient technical interview preparation.",
  date: "2025-09-15T00:00:00Z",
  author: "Nang, IcePrey",
  readingTime: "4 min",
  slug: "introducing-leetcode-feature",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: [
    "announcement",
    "featured",
    "leetcode",
    "interview preparation",
    "coding challenges",
  ],
  summary:
    "Improve your coding skills and interview readiness with PearAI's LeetCode integration. A practical tool for efficient technical interview preparation.",
  content: `<article class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8">
      <section class="space-y-6">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">A Practical Tool for Interview Readiness</h2>
        <p>
          At PearAI, we're always looking for ways to support developers in their professional growth. Today, we're introducing our latest feature: the LeetCode Slash Command. This integration brings LeetCode problems directly into your PearAI workspace, offering a streamlined approach to technical interview preparation.
        </p>
        <p>
          The LeetCode Slash Command is designed to complement your existing interview preparation routine. By providing easy access to LeetCode problems within PearAI, it helps you practice more efficiently and consistently.
        </p>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">How It Works</h2>
        <p>Using the LeetCode Slash Command is straightforward:</p>
        <ol class="list-decimal space-y-4 pl-4 text-sm sm:pl-6 sm:text-base">
          <li>
            <strong>Coding LeetCode Problems in PearAI</strong>: You can now solve LeetCode problems directly in PearAI. Create a new file for your solution and start coding as you would in a real interview setting.
          </li>
          <li>
            <strong>PearAI LeetCode Command</strong>:
            Type into the PearAI chatbox:
            <br /><br />
            <code class="rounded bg-gray-200 px-1 dark:bg-gray-700">/leetcode [LINK_TO_LEETCODE_PROBLEM] @[YOUR_SOLUTION_FILE]</code>
            <br /><br />
            This command kicks off your practice / learning process!
          </li>

          <li>
            <strong>Get Helpful Guidance</strong>: As you work on the problem, PearAI provides suggestions and hints, similar to what you might experience in an actual interview setting. This helps you improve your problem-solving skills and learn best practices.
          </li>
        </ol>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Features to Support Your Preparation</h2>
        <p>The LeetCode Slash Command includes several useful features:</p>
        <ul class="list-disc space-y-2 pl-4 text-sm sm:pl-6 sm:text-base">
          <li><strong>Problem Analysis</strong>: Get insights into potential approaches that you may not have considered.</li>
          <li><strong>Hint System</strong>: Receive gradual hints if you're stuck, encouraging independent problem-solving.</li>
          <li><strong>Code Review</strong>: Get feedback on your solution's efficiency and style.</li>
          <li><strong>Interview-Focused Approach</strong>: By emphasizing the thought process, it prepares you to articulate your strategies during actual interviews.</li>
        </ul>
        <p>
          This approach not only helps you prepare for interviews but also enhances your overall coding proficiency and problem-solving skills, making you a more adaptable and confident developer in your day-to-day work.
        </p>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">A Useful Addition to Your Prep Toolkit</h2>
        <p>
          The LeetCode Slash Command is a practical feature aimed at making your interview preparation more convenient and effective. It's not a magic solution, but rather a helpful tool in your overall preparation strategy.
        </p>
        <p>
          We hope this new feature proves useful in your coding practice and interview preparation. Remember, consistent practice and a solid understanding of fundamental concepts are key to interview success.
        </p>
        <p>
          Start incorporating the LeetCode Slash Command into your preparation routine, and let us know how it works for you. We're always open to feedback and suggestions for improvement.
        </p>
      </section>
    </article>`,
});
