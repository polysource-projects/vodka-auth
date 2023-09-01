<template>
	<button v-if="loggedIn" class="button" @click="logout">
		<Icon class="icon" name="material-symbols:logout" />
		Log out ({{ email }})
	</button>
	<button v-else class="button" @click="login">
		<Icon class="icon" name="material-symbols:login" />
		Log in
	</button>
	<p class="description">
		Vodka is a secure authentication platform made by & for EPFL students. We will never ask for your credentials.
		<a href="https://github.com/epfl-tools/vodka-auth" title="And it's open source!" target="_blank"
			><Icon class="icon" name="mdi:github"
		/></a>
	</p>
	<p class="back-text">
		<button class="back" @click="back">
			<Icon class="icon" name="material-symbols:arrow-back" />
			<span> Here by mistake? Go back. </span>
		</button>
	</p>
</template>

<style scoped>
.button,
.description {
	margin: 0;
	margin-bottom: 1.5rem;
}

.back-text {
	color: grey;
}
.back .icon {
	margin: 0;
	margin-top: -0.15rem;
}

.back:hover * {
	color: black;
}

.back:hover span {
	text-decoration: underline;
}
</style>

<script setup lang="ts">
import { Vodka } from "@/api";

const { data } = await Vodka.getData();

const loggedIn = ref(!!data.value);

const email = (data.value as any)?.user?.email as string | undefined;

const router = useRouter();

function back() {
	router.back();
}

function login() {
	navigateTo("/login");
}

async function logout() {
	await Vodka.logout();
	loggedIn.value = false;
}
</script>
