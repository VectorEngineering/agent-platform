"use client";

import { HTMLMotionProps, motion } from "framer-motion";

import { CheckCheckIcon } from "lucide-react";
import { MdOutlineContentCopy } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  value: string;
  className?: string;
};

export function CopyInput({ value, className }: Props) {
  const [isCopied, setCopied] = useState(false);

  const handleClipboard = async () => {
    try {
      setCopied(true);
      await navigator.clipboard.writeText(value);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-full items-center border border-border px-4 py-2",
        className,
      )}
    >
      <div className="pr-7 text-sm text-[#878787]">{value}</div>
      <button type="button" onClick={handleClipboard}>
        <span className="sr-only">Copy</span>
        <motion.div
          style={{ position: "absolute", right: "1rem", top: "0.625rem" }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0 : 1 }}
        >
          <MdOutlineContentCopy />
        </motion.div>
        <motion.div
          style={{ position: "absolute", right: "1rem", top: "0.625rem" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isCopied ? 1 : 0, scale: isCopied ? 1 : 0 }}
        >
          <CheckCheckIcon />
        </motion.div>
      </button>
    </div>
  );
}
