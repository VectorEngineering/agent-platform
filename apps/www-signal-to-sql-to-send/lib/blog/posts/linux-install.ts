import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "Install PearAI on Linux: Simple Guide for All Distros",
  url: "https://pearai.com/blog/download-pearai-on-linux",
  excerpt:
    "An easy-to-follow guide for downloading and installing PearAI on a wide range of Linux distributions, ensuring a smooth setup for both beginners and experienced users.",
  date: "2025-09-11T00:00:00Z",
  author: "Maximiliano Farfán",
  readingTime: "2 min",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  slug: "download-pearai-on-linux",
  tags: ["guide", "help", "PearAI", "Linux"],
  summary:
    "An easy-to-follow guide for downloading and installing PearAI on a wide range of Linux distributions, ensuring a smooth setup for both beginners and experienced users.",
  content: `<article class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8">
  <section class="space-y-6">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Step 1 - Install Microsft WSL extension</h2>
    <figure class="mt-4">
      <img
        src="/images/blog/wsl-blog-extension.png"
        alt="Install Microsoft WSL extension form marketplace"
        class="rounded-xl shadow-lg object-cover w-full"
      />
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
    </figure>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Download and Install</h2>
    <ol class="list-decimal space-y-4 pl-4 text-sm sm:pl-6 sm:text-base">
      <li>
        Download the compressed PearAI installation file:
        <a href="https://pearai-app.nyc3.digitaloceanspaces.com/PearAI-latest/linux/PearAI.tar.gz" class="break-words text-primary-500 underline dark:text-primary-400">Download PearAI</a>
      </li>
      <li>
        Extract the contents by running the following command:
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code>tar -xvf PearAI.tar.gz</code></pre>
      </li>
      <li>
        Navigate to the extracted folder:
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code class="language-bash">cd PearAI/</code></pre>
      </li>
      <li>
        Run the installation script with superuser permissions:
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code class="language-bash">sudo ./pearai_manager.sh</code></pre>
      </li>
      <li>
        Select your desired option:
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code class="language-bash">1. Install PearAI
2. Uninstall PearAI
3. Exit</code></pre>
      </li>
      <li>
        Add the following alias to your <code class="rounded bg-gray-200 px-1 text-gray-800 dark:bg-gray-700 dark:text-gray-200">~/.bashrc</code> or <code class="rounded bg-gray-200 px-1 text-gray-800 dark:bg-gray-700 dark:text-gray-200">~/.zshrc</code> to run PearAI from any directory:
        <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 sm:text-sm md:text-base"><code class="language-bash">alias pearai='PearAI'</code></pre>
        After adding the alias, run <code class="rounded bg-gray-200 px-1 text-gray-800 dark:bg-gray-700 dark:text-gray-200">source ~/.bashrc</code> or <code class="rounded bg-gray-200 px-1 text-gray-800 dark:bg-gray-700 dark:text-gray-200">source ~/.zshrc</code> to apply the changes.
      </li>
    </ol>
  </section>

  <section class="mt-8 space-y-4">
    <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 sm:text-2xl">Notes</h2>
    <p class="text-sm sm:text-base">
      Once the installation is complete, PearAI will be ready to use! If you have any questions or run into issues, feel free to join our community and get support through our official <a href="https://discord.gg/GkmmZyex" class="text-primary-500 underline dark:text-primary-400">Discord server</a>.
    </p>
    <p class="mt-4 text-sm sm:text-base">
      This installation method has been tested on multiple Linux distributions, including Arch Linux, Ubuntu 24, and Fedora 40. It was compiled using GCC 14, so most distributions with this or an older version should be able to run PearAI without any issues.
    </p>
  </section>
</article>`,
});
