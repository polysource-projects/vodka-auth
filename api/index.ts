import { UseFetchOptions, useFetch, useRuntimeConfig } from "nuxt/app";

const options: UseFetchOptions<unknown, unknown, never> = {};

export class Vodka {
	static ask(email: string) {
		const config = useRuntimeConfig();
		const res = useFetch(config.public.API_BASE + "/auth/ask", {
			method: "POST",
			body: { email },
			...options,
		});
		return res;
	}

	static answer(code: string) {
		const config = useRuntimeConfig();
		const res = useFetch(config.public.API_BASE + "/auth/answer", {
			method: "POST",
			body: { answer: code },
			...options,
		});
		return res;
	}

	static getData(website?: string) {
		const config = useRuntimeConfig();
		const res = useFetch(config.public.API_BASE + "/data", {
			method: "GET",
			query: { domain: website },
			...options,
		});
		return res;
	}
}
