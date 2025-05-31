import type { BlogPost } from "../types";
import { post as autoCompletePost } from "./auto-complete";
import { post as bountiesPost } from "./bounties";
import { post as claudePost } from "./claude-enhancement";
import { post as gptO1Post } from "./gpt-o1";
import { post as leetcodePost } from "./leetcode-feature";
import { post as linuxInstallPost } from "./linux-install";
import { post as openSourcePost } from "./open-source";
import { post as serverDesignPost } from "./server-design";
import { post as wslSetupPost } from "./wsl-setup";

// Export all posts sorted by date (newest first)
export const posts: BlogPost[] = [
  serverDesignPost,
  // autoCompletePost,
  // claudePost,
  // linuxInstallPost,
  // gptO1Post,
  // leetcodePost,
  // wslSetupPost,
  // openSourcePost,
  // bountiesPost,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
