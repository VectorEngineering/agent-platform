import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "How to use GPT o1-mini and o1-preview in PearAI",
  url: "https://pearai.com/blog/gpt-o1",
  excerpt:
    "Learn how to integrate and effectively use GPT o1-mini and o1-preview models in PearAI, along with important considerations for optimal usage.",
  date: "2025-09-15T00:00:00Z",
  author: "Duke Pan",
  readingTime: "3 min",
  slug: "gpt-o1",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: [
    "guide",
    "tutorial",
    "PearAI",
    "GPT",
    "OpenAI",
    "o1-mini",
    "o1-preview",
  ],
  summary:
    "Learn how to integrate and effectively use GPT o1-mini and o1-preview models in PearAI, along with important considerations for optimal usage.",
  content: `<article class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8">
  <section class="space-y-6">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Adding GPT o1-mini and o1-preview to PearAI</h2>
    <ol class="list-decimal space-y-4 pl-4 text-sm sm:pl-6 sm:text-base">
      <li>
        Open your <code class="rounded bg-gray-200 px-1 dark:bg-gray-700">config.json</code> file in PearAI through the command palette (<kbd class="rounded bg-gray-300 px-1 text-xs dark:bg-gray-600 sm:text-sm">Ctrl/Cmd+Shift+P</kbd>).
      </li>
      <li>
        Add the following entries to the "models" array of your config and save the file (see example picture below):
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code class="language-bash">{
    "model": "o1-mini",
    "title": "GPTo1 Mini (PearAI)",
    "provider": "pearai_server",
    "isDefault": true
  },
  {
    "model": "o1-preview",
    "title": "GPTo1 Preview (PearAI)",
    "provider": "pearai_server",
    "isDefault": true
  }</code></pre>
      </li>
      <li class="font-semibold">Example</li>
    </ol>
    <figure class="mt-4">
      <img
        src="/images/blog/o1config-doc.png"
        alt="Command Palette in PearAI (Cmd/Ctrl+Shift+P)"
        class="w-full rounded-xl shadow-lg"
      />
      <figcaption class="mt-2 text-center text-xs text-gray-600 dark:text-gray-400 sm:text-sm">Config.json example with o1 models added</figcaption>
    </figure>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Usage Considerations</h2>
    <ul class="list-disc space-y-2 pl-4 text-sm sm:pl-6 sm:text-base">
      <li>
        Rate limits provided by OpenAI for these o1 models are currently lower compared to other options. For most tasks, it's still recommended to use Claude or GPT4o instead of o1 models due to these limitations.
      </li>
      <li>
        When choosing between o1 models, prefer o1-mini over o1-preview. It will use fewer of your credits while providing similar performance.
      </li>
      <li>
        Due to current rate limits, only annual subscribers of PearAI can use o1 models. We'll open it up to all subscribers soon!
      </li>
    </ul>
  </section>
</article>`,
});
