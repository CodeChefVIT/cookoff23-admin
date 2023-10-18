import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color1": "#0D0D0D",
        "color2": "#1F1F1F",
        "color3": "#D9D9D999",
        "color4": "#EDEDEDB2",


      },
    },
  },
  plugins: [],
} satisfies Config;
