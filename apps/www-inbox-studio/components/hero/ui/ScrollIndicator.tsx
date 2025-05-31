import { ArrowDown } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.8 }}
  >
    <p className="mb-2 text-xs font-medium text-foreground/50">
      Scroll to explore
    </p>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <ArrowDown className="h-4 w-4 text-foreground/50" />
    </motion.div>
  </motion.div>
);

export default ScrollIndicator;
