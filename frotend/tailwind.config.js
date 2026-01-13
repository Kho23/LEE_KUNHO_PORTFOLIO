/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#01356d", dark: "#012a57", light: "#1b4f80" },
        secondary: { DEFAULT: "#016ca5", dark: "#015c8c", light: "#1a7fb5" },
        accent: { DEFAULT: "#0396c7", soft: "#04bbdf" },
        background: { soft: "#90e0ef", surface: "#beedf4" },
        text: { main: "#012a57", sub: "#334155" },
        border: "#e2e8f0",
      },
      // ✅ typography 설정은 여기 안에 있어야 함
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
            "th, td": {
              border: "1px solid " + theme("colors.slate.400"),
              padding: theme("spacing.2"),
              textAlign: "center",
            },
            th: {
              backgroundColor: theme("colors.slate.100"),
              fontWeight: "600",
            },
          },
        },
      }),
    },
  },
  // ✅ plugins는 제일 아래에
  plugins: [require("@tailwindcss/typography")],
};
