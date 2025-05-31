import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";

const CallToActionSection = () => (
  <section className="relative overflow-hidden py-20">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
    </div>

    <div className="container mx-auto">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Ready to Transform Your Lead Generation?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-foreground/70"
        >
          Join thousands of small businesses already using AI to find better
          leads with less effort. Get started today and see the difference in
          your first 14 days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="text-white rounded-full bg-primary px-8 hover:bg-primary/90"
          >
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Request Demo
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CallToActionSection;
