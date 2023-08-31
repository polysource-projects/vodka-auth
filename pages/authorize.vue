<template>
	<h2>hi, {{ mail }}</h2>
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
if (!data.value) {
	const loginRedirection = "/login?redirect=" + encodeURIComponent("/authorize?redirect=" + redirectUri);
	navigateTo(loginRedirection);
}

// There's data !
const mail = (data.value as any).user.email;

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
