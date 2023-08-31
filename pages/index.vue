<template>
	<button class="button" @click="logout">Log out of Vodka</button>
</template>

<script setup lang="ts">
import { Vodka } from "@/api";

definePageMeta({
	middleware: ["authed"],
});

async function logout() {
	await Vodka.logout();
	navigateTo("/login");
}
</script>
