import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "How We Designed Our Servers at PearAI",
  author: "Nang",
  date: "2025-09-01T00:00:00Z",
  excerpt:
    "I spent the last 2 months working on PearAI, an Open-Sourced AI-Powered Code Editor. It is like having an expert on your codebase right next to you. We achieve this with Retrieval Augmented Generation. This is my new startup after finishing my B.S. & M.S from Carnegie Mellon and working for 1.5 years in High Frequency Trading as a Software Engineer. This is exactly how we designed our server.",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: ["guide", "server", "server design", "pearai server"],
  url: "https://pearai.com/blog/how-we-designed-our-servers-end-to-end-for-pearai",
  slug: "how-we-designed-our-servers-end-to-end-for-pearai",
  summary:
    "I spent the last 2 months working on PearAI, an Open-Sourced AI-Powered Code Editor. It is like having an expert on your codebase right next to you. We achieve this with Retrieval Augmented Generation. This is my new startup after finishing my B.S. & M.S from Carnegie Mellon and working for 1.5 years in High Frequency Trading as a Software Engineer. This is exactly how we designed our server.",
  content: `<div
  class="mx-auto max-w-4xl space-y-8 px-4 py-8 text-gray-800 dark:text-gray-200 sm:px-6 lg:px-8"
>
  <p class="text-base font-light leading-relaxed sm:text-lg md:text-xl">
    I spent the last 2 months working on PearAI, an Open-Sourced AI-Powered Code
    Editor. It's like having an expert on your codebase right next to you. We
    achieve this with Retrieval Augmented Generation. This is my new startup
    after finishing my B.S. & M.S from Carnegie Mellon and working for 1.5 years
    in High Frequency Trading as a Software Engineer. Here's exactly how we
    designed our server.
  </p>

  <figure class="my-8 sm:my-12">
    <img
      src="/images/blog/pear-hanging-from-branch.png"
      alt="Pear hanging from branch"
      class="w-full rounded-xl shadow-lg"
    />
    <figcaption
      class="mt-4 text-center text-sm italic text-gray-600 dark:text-gray-400"
    >
      PearAI: An AI-Powered Code Editor
    </figcaption>
  </figure>

  <p class="text-base sm:text-lg">
    We are launching our product next week, and we needed to build out our
    server this last month. As we're building fully in public, here's exactly
    how we did it. Hopefully, this helps you design a server with scalability,
    resilience, and security in mind.
  </p>

  <figure class="my-8 sm:my-12">
    <img
      src="/images/blog/pearai-server-option.png"
      alt="PearAI Server Options"
      class="w-full rounded-xl shadow-lg"
    />
    <figcaption
      class="mt-4 text-center text-sm italic text-gray-600 dark:text-gray-400"
    >
      PearAI Server Architecture Options
    </figcaption>
  </figure>

  <h2
    class="mb-4 mt-8 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-6 sm:mt-12 sm:text-3xl"
  >
    What's this server for?
  </h2>

  <p class="mb-4 text-base sm:text-lg">
    PearAI offers two different services for LLM:
  </p>

  <ol
    class="ml-4 list-inside list-decimal space-y-4 text-base sm:ml-6 sm:text-lg"
  >
    <li class="pl-2">
      <span class="font-semibold">Use PearAI's hosted server:</span> Pay
      subscription for unlimited usage. Underlying LLM is abstracted for
      convenience and latest AI technology.
    </li>
    <li class="pl-2">
      <span class="font-semibold">Use API key:</span> Users self-manage and pay
      per token to the LLM Provider. On PearAI's side, this is Open-sourced and
      fully transparent. Users can also use their own local LLM.
    </li>
  </ol>

  <h2
    class="mb-4 mt-8 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-6 sm:mt-12 sm:text-3xl"
  >
    Our Server Functionalities
  </h2>

  <ul class="ml-4 grid grid-cols-2 gap-2 text-base sm:ml-6 sm:gap-4 sm:text-lg">
    <li class="pl-2">1. Authentication</li>
    <li class="pl-2">2. Database</li>
    <li class="pl-2">3. Proxying</li>
    <li class="pl-2">4. Observability</li>
    <li class="pl-2">5. Payment</li>
    <li class="pl-2">6. Deployment</li>
  </ul>

  <h2
    class="mb-4 mt-8 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-6 sm:mt-12 sm:text-3xl"
  >
    0. Never Start From Scratch
  </h2>

  <p class="text-base sm:text-lg">
    I'm a big fan of creating my own templates and never starting from scratch
    again. I open-source all of these, and you can find the Flask API Template I
    made/used for this project here:
    <a
      href="https://github.com/nathan-149/flask-backend-api-template"
      class="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >Flask Backend API Template</a
    >
  </p>

  <div
    class="my-6 rounded-r-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 sm:my-8 sm:p-6"
  >
    <p class="mb-2 text-base font-bold sm:text-lg">Edit:</p>
    <p class="text-sm sm:text-base">
      DON'T USE FLASK, USE FASTAPI FOR ASYNC CAPABILITIES
    </p>
  </div>

  <h2
    class="mb-4 mt-8 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-6 sm:mt-12 sm:text-3xl"
  >
    1. Authentication
  </h2>

  <p class="mb-4 text-base sm:mb-6 sm:text-lg">
    We needed sign-up and sign-in functionality, as well as JWT tokens for each
    user. For this, we used Supabase, which handles authentication of users.
    This is how we are doing this:
  </p>

  <figure class="my-8 sm:my-12">
    <img
      src="/images/blog/pearai-authentication-flow.png"
      alt="PearAI Authentication Flow"
      class="w-full rounded-xl shadow-lg"
    />
    <figcaption
      class="mt-4 text-center text-sm italic text-gray-600 dark:text-gray-400"
    >
      PearAI Authentication Flow
    </figcaption>
  </figure>

  <div
    class="my-6 rounded-r-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 sm:my-8 sm:p-6"
  >
    <p class="mb-2 text-base font-bold sm:text-lg">Edit:</p>
    <p class="text-sm sm:text-base">DON'T USE SUPABASE, USE AUTH0</p>
  </div>

  <h2
    class="mb-4 mt-8 text-2xl font-bold text-primary-600 dark:text-primary-400 sm:mb-6 sm:mt-12 sm:text-3xl"
  >
    Summary
  </h2>

  <p class="mb-4 text-base sm:text-lg">
    In summary, this is the stack that we used and I would recommend:
  </p>

  <ul
    class="ml-4 list-inside list-disc space-y-2 rounded-lg bg-gray-100 p-4 text-base dark:bg-gray-800 sm:ml-6 sm:p-6 sm:text-lg"
  >
    <li class="pl-2">
      Primary language: <span class="font-semibold">Python</span>
    </li>
    <li class="pl-2">
      API Framework: <span class="font-semibold">Flask</span>
    </li>
    <li class="pl-2">
      Authentication: <span class="font-semibold">Supabase</span>
    </li>
    <li class="pl-2">Payment: <span class="font-semibold">Stripe</span></li>
    <li class="pl-2">
      Database: <span class="font-semibold">Redis + Supabase (pSQL)</span>
    </li>
    <li class="pl-2">
      Observability: <span class="font-semibold">OpenTelemetry + Axiom</span>
    </li>
    <li class="pl-2">
      Deployment: <span class="font-semibold">DigitalOcean</span>
    </li>
  </ul>

  <p class="mt-6 text-base sm:mt-8 sm:text-lg">
    Hopefully this was helpful to someone. PearAI is open-sourced, so please
    help us out by starring the repo here:
    <a
      href="https://github.com/trypear/pearai-app"
      class="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >PearAI GitHub Repo</a
    >, and consider contributing! If you'd like to use the app, join the wait
    list here
    <a
      href="https://trypear.ai/"
      class="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >https://trypear.ai/</a
    >. We're launching next week to our first batch of users!
  </p>

  <p class="mt-4 text-base sm:mt-6 sm:text-lg">
    Also, feel free to check out my YouTube series on this, as I am documenting
    the entire startup journey with my cofounder
    <a
      href="https://youtube.com/@FryingPan"
      class="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >FryingPan</a
    >.
    <a
      href="https://youtube.com/nang88"
      class="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >https://youtube.com/nang88</a
    >. Thanks!
  </p>
</div>`,
  readingTime: "5 min",
});
