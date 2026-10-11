export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E2F86",
        secondary: "#F2D35C",
        lightGold: "#F9EFAE",
        darkBlue: "#1C255E",
        white: "#FFFFFF",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        ray: "ray 12s linear infinite",
        wave: "wave 4s ease-in-out infinite",
        particle: "particle 8s linear infinite",
        "scale-float": "scaleFloat 6s ease-in-out infinite",
        "letter-fade": "letterFade 0.5s ease forwards",
        "spin-slow": "spin 20s linear infinite",
        cinema: "cinema 16s ease-in-out infinite",
        strip: "strip 8s linear infinite",
        film: "film 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ray: {
          "0%": { transform: "translateX(-40%)", opacity: "0" },
          "20%": { opacity: "0.25" },
          "50%": { transform: "translateX(40%)", opacity: "0.85" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
        particle: {
          "0%": { transform: "translate(0, 0) scale(0.8)", opacity: "0" },
          "20%": { opacity: "0.45" },
          "50%": { transform: "translate(18px, -18px) scale(1)", opacity: "0.95" },
          "80%": { transform: "translate(8px, -12px) scale(0.9)", opacity: "0.5" },
          "100%": { transform: "translate(0, 0) scale(0.8)", opacity: "0" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(8px) translateY(2px)" },
        },
        letterFade: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        scaleFloat: {
          "0%": { transform: "scale(0.95) translateY(0)" },
          "30%": { transform: "scale(1) translateY(0)" },
          "50%": { transform: "scale(1) translateY(-8px)" },
          "100%": { transform: "scale(1) translateY(0)" },
        },
        cinema: {
          "0%, 100%": { transform: "translateX(0) scale(1)", opacity: "0.55" },
          "50%": { transform: "translateX(12px) scale(1.02)", opacity: "0.85" },
        },
        strip: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        film: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
};
