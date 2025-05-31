import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "How to setup WSL in PearAI",
  url: "https://pearai.com/blog/wsl-setup",
  excerpt:
    "Easy step by step guide to setup WSL in PearAI, and get started with AI-powered coding in WSL.",
  date: "2025-09-19T00:00:00Z",
  author: "Himanshu",
  readingTime: "30 seconds",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: ["guide", "tutorial", "WSL", "Linux", "Windows Subsystem for Linux"],
  summary:
    "Easy step by step guide to setup WSL in PearAI, and get started with AI-powered coding in WSL.",
  slug: "wsl-setup",
  content: `<article class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8">
  <section class="space-y-6">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Step 1 - Install Microsoft WSL extension</h2>
    <figure class="mt-4">
      <img
        src="/images/blog/wsl-blog-extension.png"
        alt="Install Microsoft WSL extension from marketplace"
        class="rounded-xl shadow-lg object-cover w-full"
      />
      <figcaption class="mt-2 text-center text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
        Install the Microsoft WSL extension from the marketplace
      </figcaption>
    </figure>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Step 2 - Run 'Patch WSL' from command palette</h2>
    <figure class="mt-4">
      <img
        src="/images/blog/wsl-blog-patch.png"
        alt="Run 'Patch WSL' from command palette"
        class="rounded-xl shadow-lg object-cover w-full"
      />
      <figcaption class="mt-2 text-center text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
        Use Cmd/Ctrl+Shift+P to open command palette and run 'Patch WSL'
      </figcaption>
    </figure>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Step 3 - Enjoy!</h2>
    <div class="aspect-video w-full">
      <iframe 
        src="https://giphy.com/embed/wrBURfbZmqqXu" 
        width="100%" 
        height="100%" 
        style="position: absolute;" 
        frameBorder="0" 
        class="giphy-embed" 
        allowFullScreen
      ></iframe>
    </div>
  </section>

  <section class="mt-8 space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Additional Notes</h2>
    <ul class="list-disc space-y-2 pl-4 text-sm sm:pl-6 sm:text-base">
      <li>Make sure you have WSL2 installed on your Windows system</li>
      <li>The WSL extension should be enabled and properly configured in Windows</li>
      <li>PearAI will automatically detect your WSL environment after these steps</li>
      <li>You can switch between Windows and WSL environments using the status bar indicator</li>
    </ul>
  </section>

  <div class="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-800 dark:bg-blue-900 dark:text-blue-200 sm:my-8 sm:p-6">
    <p class="mb-2 text-base font-bold sm:text-lg">Pro Tip:</p>
    <p class="text-sm sm:text-base">
      If you encounter any issues, try restarting PearAI after the installation. This ensures all WSL components are properly initialized.
    </p>
  </div>

  <p class="mt-6 text-base sm:mt-8 sm:text-lg">
    Need help? Join our <a href="https://discord.gg/pearai" class="text-primary-500 underline dark:text-primary-400">Discord community</a> for support and to connect with other developers using PearAI with WSL!
  </p>
</article>`,
});
