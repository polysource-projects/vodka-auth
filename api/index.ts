import { UseFetchOptions, useFetch, useRuntimeConfig } from "nuxt/app";

const options: UseFetchOptions<unknown, unknown, never> = {
	credentials: "include",
};

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

	static async isLoggedIn() {
		const { data, error } = await this.getData();
		let yes = data.value && !error.value;

		return yes;
	}

	static async logout() {
		const config = useRuntimeConfig();
		const res = useFetch(config.public.API_BASE + "/auth/logout", {
			method: "POST",
			...options,
		});
		return res;
	}

	static async accept(website: string) {
		//TODO Fetch signed message from server
		const token = "this is a very legitimate token nothing to see here";
		return token;
	}
}
