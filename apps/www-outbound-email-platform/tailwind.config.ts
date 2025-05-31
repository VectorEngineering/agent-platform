/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

type ColorConfig = Record<string, Record<string | number, string>>;
type UtilityConfig = Record<string, { boxShadow: string }>;

function generateShadowUtilities(colors: ColorConfig): UtilityConfig {
  const utilities: UtilityConfig = {};

  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, colorValue]) => {
      if (typeof colorValue === "string") {
        // Generate shadow utilities for each opacity level
        for (let opacity = 0; opacity <= 100; opacity += 5) {
          const className = `.shadow-inset-${colorName}-${shade}-${opacity}`;
          const shadowValue = colorValue.includes("<alpha-value>")
            ? colorValue.replace("<alpha-value>", (opacity / 100).toFixed(2))
            : colorValue;

          utilities[className] = {
            boxShadow: `inset 0 -1.5px 0 0 ${shadowValue}`,
          };
        }
      }
    });
  });

  return utilities;
}

const toRgba = (hexCode: string, opacity = 50) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj: any, sep = "-") =>
  Object.assign(
    {},
    ...(function _flatten(o: any, p = ""): any {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === "object"
            ? _flatten(o[k], k + sep)
            : { [p + k]: o[k] },
        ),
      );
    })(obj),
  );

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    ".storybook/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      display: "350",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "grid-pattern":
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABSSURBVHgB7dihEYBAEATBf/JPEksEOCgEAYw70W3OTp3cvYY5r/v57rGGElYJq4RVwiphlbBKWCWsElYJq4RVwiphlbBKWCWsElbtf/OcZuzHXh9bB88+HN8BAAAAAElFTkSuQmCC")',
        "grid-pattern-dark":
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABTSURBVHgB7dihEYBAEATBf9LCEQj5ZwGFIIBxJ7rN2amTu9cw53U/3z3WUMIqYZWwSlglrBJWCauEVcIqYZWwSlglrBJWCauEVcKq/W+e04z92AukgAP/IH2i4wAAAABJRU5ErkJggg==")',
        "document-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      borderColor: {
        DEFAULT: "rgb(0 0 0 / 0.07)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        DEFAULT: `0 0px 15px rgba(0 0 0 / 0.04), 0 0px 2px rgba(0 0 0 / 0.06)`,
        lg: "0 0px 20px rgba(0 0 0 / 0.04), 0 0px 5px rgba(0 0 0 / 0.06)",
        xl: "0 0px 30px rgba(0 0 0 / 0.04), 0 0px 10px rgba(0 0 0 / 0.06)",
        hidden: "0 1px 8px rgb(0 0 0 / 0), 0 0.5px 2.5px rgb(0 0 0 / 0)",
        up: "-2px -2px 22px 0px rgba(61, 84, 171, 0.15)",
        "3xl": "0 0 50px rgba(0 0 0 / 0.02), 0 0 50px rgba(0 0 0 / 0.04)",
        document:
          "0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)",
        "document-hover":
          "0 12px 40px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.1)",
        signature:
          "0 2px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        gray: {
          DEFAULT: "hsla(var(--gray), <alpha-value>)",
          foreground: "hsla(var(--gray-foreground), <alpha-value>)",
          50: "hsla(var(--gray-50), <alpha-value>)",
          100: "hsla(var(--gray-100), <alpha-value>)",
          200: "hsla(var(--gray-200), <alpha-value>)",
          300: "hsla(var(--gray-300), <alpha-value>)",
          400: "hsla(var(--gray-400), <alpha-value>)",
          500: "hsla(var(--gray-500), <alpha-value>)",
          600: "hsla(var(--gray-600), <alpha-value>)",
          700: "hsla(var(--gray-700), <alpha-value>)",
          800: "hsla(var(--gray-800), <alpha-value>)",
          900: "hsla(var(--gray-900), <alpha-value>)",
        },
        purple: {
          100: "#F4F4FF",
          200: "#E2E1FF",
          300: "#CBCCFF",
          400: "#ABABFF",
          500: "#8D8DFF",
          600: "#5D5DFF",
          700: "#4B4ACF",
          800: "#38379C",
          900: "#262668",
        },
        blue: {
          DEFAULT: "#0062FF",
          50: "#E5EFFF",
          100: "#CCE0FF",
          200: "#99C0FF",
          300: "#66A1FF",
          400: "#3381FF",
          500: "#0062FF",
          600: "#0054DB",
          700: "#0047B8",
          800: "#003994",
          900: "#002B70",
          950: "#00245E",
        },
        green: {
          50: "#f0faf0",
          100: "#e2f6e3",
          200: "#c5edc6",
          300: "#97de9a",
          400: "#62c667",
          500: "#3fab44",
          600: "#2d8c31",
          700: "#266f29",
          800: "#235826",
          900: "#1e4921",
          950: "#0e2f11",
        },
        red: {
          50: "#fdf3f3",
          100: "#fde3e3",
          200: "#fbcdcd",
          300: "#f8a9a9",
          400: "#f17878",
          500: "#e64d4d",
          600: "#d32f2f",
          700: "#b12424",
          800: "#922222",
          900: "#6f1f1f",
          950: "#420d0d",
        },
        polar: {
          50: "hsl(233, 10%, 85%)",
          100: "hsl(233, 10%, 79%)",
          200: "hsl(233, 10%, 68%)",
          300: "hsl(233, 10%, 57%)",
          400: "hsl(233, 10%, 46%)",
          500: "hsl(233, 10%, 36%)",
          600: "hsl(233, 10%, 14%)",
          700: "hsl(233, 10%, 9%)",
          800: "hsl(233, 10%, 7%)",
          900: "hsl(233, 10%, 5%)",
          950: "hsl(233, 10%, 3%)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsla(var(--primary-50), <alpha-value>)",
          100: "hsla(var(--primary-100), <alpha-value>)",
          200: "hsla(var(--primary-200), <alpha-value>)",
          300: "hsla(var(--primary-300), <alpha-value>)",
          400: "hsla(var(--primary-400), <alpha-value>)",
          500: "hsla(var(--primary-500), <alpha-value>)",
          600: "hsla(var(--primary-600), <alpha-value>)",
          700: "hsla(var(--primary-700), <alpha-value>)",
          800: "hsla(var(--primary-800), <alpha-value>)",
          900: "hsla(var(--primary-900), <alpha-value>)",
          1000: "hsla(var(--primary-1000), <alpha-value>)",
        },
        secondary: {
          300: "#878787",
          400: "#616161",
          500: "#383838",
          600: "#363636",
          700: "#2E2E2E",
          750: "#292929",
          800: "#000000",
          main: "#000000",
        },
        tertiary: {
          50: "#F2F2F2",
          100: "#E8E8E8",
          200: "#CCCCCC",
          300: "#ABABAB",
        },
        beige: {
          100: "#FFFDFA",
          200: "#FEFCFS", // This is the main color according to the image
          300: "#FEFDEC",
          400: "#FDF7E7",
          500: "#FDF6E3",
          600: "#FADE96",
        },
        white: {
          50: "#FCFDFD",
          100: "#F9FBFB",
          200: "#FOF4F5",
          300: "#F3FBFB",
          400: "#EDEGER",
          500: "#F8DE96",
          main: "#FFFFFF",
        },
        black: {
          DEFAULT: "#000000",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#121212",
          950: "#000000",
        },
        document: {
          bg: "#FFFFFF",
          border: "rgba(0, 0, 0, 0.08)",
          shadow: "rgba(0, 0, 0, 0.1)",
          highlight: "rgba(0, 0, 0, 0.03)",
        },
        signature: {
          primary: "#000000",
          secondary: "#333333",
          accent: "#0062FF",
          highlight: "rgba(0, 0, 0, 0.8)",
          muted: "rgba(0, 0, 0, 0.5)",
        },
        spacing: {
          "9/16": "56.25%",
          "3/4": "75%",
          "1/1": "100%",
        },

        fontSize: {
          "2xs": "0.625rem",
          xs: "0.75rem",
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.25rem",
          "2xl": "1.5rem",
          "3xl": "2rem",
          "4xl": "2.5rem",
          "5xl": "3.25rem",
          "6xl": "4rem",
        },
        inset: {
          full: "100%",
        },
        letterSpacing: {
          tighter: "-0.02em",
          tight: "-0.01em",
          normal: "0",
          wide: "0.01em",
          wider: "0.02em",
          widest: "0.4em",
        },
        minWidth: {
          10: "2.5rem",
        },
        scale: {
          98: ".98",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        jiggle: {
          "0%": {
            transform: "rotate(-4deg)",
          },
          "50%": {
            transform: "rotate(4deg)",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "webgl-scale-in-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(.7)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "open-scale-up-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(.98) translateY(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
      animation: {
        "animate-webgl-scale-in-fade": "webgl-scale-in-fade 1s ease-in-out",
        "open-scale-up-fade": "open-scale-up-fade",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme("colors");
      const utilities = {};

      // List of colors and shades to generate utilities for
      const colorList = [
        "gray",
        "purple",
        "primary",
        "secondary",
        "tertiary",
        "blue",
        "beige",
        "white",
      ];
      const shadeList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

      // colorList.forEach((color) => {
      //   shadeList.forEach((shade) => {
      //     const colorValue = colors?.[color]?.[shade];
      //     if (typeof colorValue === "string") {
      //       for (let i = 0; i <= 100; i += 5) {
      //         utilities[
      //           `.shadow-inset-${color}-${shade}-${i}` as any
      //         ] = {
      //           boxShadow: colorValue.includes("<alpha-value>")
      //             ? `inset 0 -1.5px 0 0 ${colorValue.replace("<alpha-value>", (i / 100).toString())}`
      //             : `inset 0 -1.5px 0 0 ${colorValue}`,
      //         };
      //       }
      //     }
      //   });
      // });

      addUtilities(utilities);
    }),
  ],
};
