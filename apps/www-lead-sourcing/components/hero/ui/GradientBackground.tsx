import React from "react";

const GradientBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div
      className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"
      style={{ animation: "pulse 15s ease-in-out infinite alternate" }}
    />
    <div
      className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-primary/10 to-primary/5 blur-3xl"
      style={{ animation: "pulse 20s ease-in-out infinite alternate-reverse" }}
    />
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

    <style jsx global>{`
      @keyframes pulse {
        0% {
          opacity: 0.5;
          transform: scale(1);
        }
        100% {
          opacity: 0.7;
          transform: scale(1.1);
        }
      }
    `}</style>
  </div>
);

export default GradientBackground;
