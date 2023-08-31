<template>
	<button class="button" @click="logout">Log out of Vodka</button>
</template>

<script setup lang="ts">
import { Vodka } from "@/api";

if (!(await Vodka.isLoggedIn())) {
	navigateTo("/login");
}

async function logout() {
	await Vodka.logout();
	navigateTo("/login");
}
</script>
