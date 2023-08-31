<template>
	<p>
		Vodka is a secure way to prove your student status to services online, provided by EPFL Tools.
		<a href="https://github.com/epfl-tools/vodka-auth" title="And it's open source!"
			><Icon class="icon" name="mdi:github"
		/></a>
	</p>
	<p class="back-text">
		Hey, {{ email }}! Here by mistake?
		<button class="back" @click="back">
			<Icon class="icon" name="material-symbols:arrow-back" /> <span> Go back. </span>
		</button>
	</p>
	<button class="button" @click="logout">
		<Icon class="icon" name="material-symbols:logout" />
		Log out of Vodka
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
if (!data.value) {
	navigateTo("/login");
}

const email = (data.value as any).user.email;

const router = useRouter();

function back() {
	router.back();
}

async function logout() {
	await Vodka.logout();
	navigateTo("/login");
}
</script>
