<template>
	<h2>hi, {{ mail }} (<button class="logout-link" @click="logout">logout</button>)</h2>
	<p>{{ website }} wants to get to know you ;)</p>
	<button class="button red" @click="accept">sell my data :)</button>
	<button class="button" @click="deny">sell plasma instead &gt;:(</button>
</template>
<script setup lang="ts">
import { Vodka } from "~/api";

const route = useRoute();
const redirectUri = route.query.redirect ? decodeURIComponent(route.query.redirect as string) : undefined;
const url = new URL(redirectUri!);

if (!redirectUri) navigateTo("/");

function getWebsite(redirectUri: string) {
	const url = new URL(redirectUri);
	return url.hostname;
}

const website = getWebsite(redirectUri!);
const { data } = await Vodka.getData(website);

// Check if not already logged in
const loginRedirection = "/login?redirect=" + encodeURIComponent("/authorize?redirect=" + redirectUri);
if (!data.value) {
	navigateTo(loginRedirection);
}

// There's data !
const mail = (data.value as any).user.email;

async function logout() {
	await Vodka.logout();
	navigateTo(loginRedirection);
}

async function accept() {
	const token = await Vodka.accept(website);
	url.searchParams.set("vodka_token", token);
	navigateTo(url.href, { external: true });
}

async function deny() {
	url.searchParams.set("vodka_error", "request_denied");
	navigateTo(url.href, { external: true });
}
</script>

<style scoped>
button.logout-link {
	background: none;
	border: none;
	color: grey;
	text-decoration: underline;
	cursor: pointer;
	padding: 0;
	font-size: 1rem;
}
</style>
