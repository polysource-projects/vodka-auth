<template>
	<p>
		Vodka is a secure way to prove your student status to services online, provided by EPFL Tools.
		<a href="https://github.com/epfl-tools/vodka-auth" title="And it's open source!" target="_blank"
			><Icon class="icon" name="mdi:github"
		/></a>
	</p>
	<p class="back-text">
		Here by mistake?
		<button class="back" @click="back">
			<Icon class="icon" name="material-symbols:arrow-back" /> <span> Go back. </span>
		</button>
	</p>
	<button v-if="loggedIn" class="button" @click="logout">
		<Icon class="icon" name="material-symbols:logout" />
		Log out ({{ email }})
	</button>
	<button v-else class="button" @click="login">
		<Icon class="icon" name="material-symbols:login" />
		Log in
	</button>
</template>

<style scoped>
.button {
	margin-top: 2rem;
}

.back-text {
	margin-top: 1rem;
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
