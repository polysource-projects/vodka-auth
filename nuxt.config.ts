// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["nuxt-icon"],
	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		public: {
			API_BASE: process.env.API_BASE,
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
