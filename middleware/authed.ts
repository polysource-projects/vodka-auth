import { Vodka } from "~/api";

export default defineNuxtRouteMiddleware(async () => {
	const loggedIn = await Vodka.isLoggedIn();
	if (!loggedIn) {
		return navigateTo("/login");
	}
});
