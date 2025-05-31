import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "Setting Up Auto-Complete On PearAI",
  date: "2025-08-31T00:00:00Z",
  excerpt:
    "PearAI supports tab autocomplete, and this is how to set this up. Tab autocomplete predicts / suggests what you would type next as you're coding!",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: ["tutorial", "autocomplete", "suggestions"],
  url: "https://pearai.com/blog/setting-up-auto-complete-on-pearai",
  author: "Nang",
  slug: "setting-up-auto-complete-on-pearai",
  summary:
    "PearAI supports tab autocomplete, and this is how to set this up. Tab autocomplete predicts / suggests what you would type next as you're coding!",
  content: `<div
  class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8"
>
  <p class="text-base font-light leading-relaxed sm:text-lg md:text-xl">
    PearAI supports tab autocomplete, and this is how to set this up. Tab
    autocomplete predicts/suggests what you would type next as you're coding!
  </p>

  <p class="text-base sm:text-lg">This is the guide to do that:</p>

  <ol
    class="ml-4 list-outside list-decimal space-y-8 text-base sm:ml-6 sm:text-lg"
  >
    <li class="pl-2">
      <h3
        class="mb-2 text-xl font-bold text-primary-600 dark:text-primary-400 sm:mb-4 sm:text-2xl"
      >
        Setup Codestral
      </h3>
      <p class="mt-2">
        We recommend using Codestral, the leading model for code completion (or
        FIM — Fill In Middle). It's also open-sourced! You'll need to obtain a
        Codestral API key from
        <a
          href="https://console.mistral.ai/"
          class="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >Mistral API</a
        >.
      </p>
    </li>

    <li class="pl-2">
      <h3
        class="mb-2 text-xl font-bold text-primary-600 dark:text-primary-400 sm:mb-4 sm:text-2xl"
      >
        Add to PearAI config.json
      </h3>
      <p class="mb-4 mt-2">
        Fill in
        <code class="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700"
          >YOUR_API_KEY</code
        >
        with your API key:
      </p>

      <div class="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-xs sm:text-sm"><code class="language-json">{
    "tabAutocompleteModel": {
      "title": "Codestral",
      "provider": "mistral",
      "model": "codestral-latest",
      "apiKey": "YOUR_API_KEY"
    }
  }</code></pre>
      </div>

      <figure class="my-6 sm:my-8">
        <img
          src="/images/blog/open-pearai-config.png"
          alt="Command Palette in PearAI (Cmd/Ctrl+Shift+P)"
          class="w-full rounded-xl shadow-lg"
        />
        <figcaption
          class="mt-2 text-center text-xs italic text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-sm"
        >
          Command Palette in PearAI (Cmd/Ctrl+Shift+P)
        </figcaption>
      </figure>
    </li>

    <li class="pl-2">
      <h3
        class="mb-2 text-xl font-bold text-primary-600 dark:text-primary-400 sm:mb-4 sm:text-2xl"
      >
        Enjoy the development speed up with autocomplete!
      </h3>
      <p class="mt-2">
        Once you've set up the autocomplete, you'll notice a significant boost
        in your coding speed and efficiency. The AI-powered suggestions will
        help you write code faster and with fewer errors.
      </p>
    </li>
  </ol>

  <div
    class="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-800 dark:bg-blue-900 dark:text-blue-200 sm:my-8 sm:p-6"
  >
    <p class="mb-2 text-base font-bold sm:text-lg">Pro Tip:</p>
    <p class="text-sm sm:text-base">
      You can customize the autocomplete behavior in PearAI's settings.
      Experiment with different options to find the setup that works best for
      your coding style!
    </p>
  </div>

  <p class="mt-6 text-base sm:mt-8 sm:text-lg">
    Setting up autocomplete in PearAI is a game-changer for your development
    workflow. It combines the power of AI with your coding expertise, resulting
    in faster and more efficient coding sessions. Give it a try and experience
    the difference for yourself!
  </p>
</div>`,
  readingTime: "3 min",
});
