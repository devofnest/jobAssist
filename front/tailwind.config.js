/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				gasoek: ["'Do Hyeon'", "sans-serif"], // 한글용
				anton: ["Anton", "sans-serif"],         // 영어용
			},
		},
	},
	plugins: [],
};
