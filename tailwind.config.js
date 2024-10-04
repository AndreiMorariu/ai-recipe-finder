/** @type {import('tailwindcss').Config} */

/* #000000 */
/* #f5f5f5 */
/* #65558f */
/* #1e1e1e */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			heading: "#000000",
			dark: "#1e1e1e",
			white: "#f5f5f5",
			accent: "#65558f",
		},
		extend: {},
	},
	plugins: [],
};
