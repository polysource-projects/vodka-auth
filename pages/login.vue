<template>
	<!-- Email phase -->
	<template v-if="phase === 'email'">
		<p>Log in with your EPFL academic email address.</p>
		<form @submit.prevent="submitEmail">
			<div class="email-thing">
				<input type="email" placeholder="john.doe@epfl.ch" v-model="email" />
			</div>
			<button class="button red main" :disabled="!email" type="submit">Continue</button>
		</form>
	</template>
	<!-- Code phase -->
	<template v-else>
		<button class="back-button" @click="backToMail">
			<Icon class="icon" name="material-symbols:arrow-back" />
			{{ email }}
		</button>
		<p>We just sent you an email. Please confirm your private code.</p>
		<input class="code" placeholder="123-456" v-model="code" @input="codeChange" />
	</template>
</template>
<script setup lang="ts">
import { Vodka } from "@/api";

const email = ref("");
const code = ref("");

const phase = useState<"email" | "code">("phase", () => {
	return "email";
});

function submitEmail() {
	const valid = !!email.value;
	if (!valid) {
		return;
	}
	// Submit email
	const { data, pending } = Vodka.ask(email.value);
	let acted = false;
	watch([data, pending], ([data, pending]) => {
		if (pending || acted) return;
		// Only act once
		acted = true;
		if (data) {
			phase.value = "code";
		} else {
			alert("Une erreur est survenue.");
		}
	});
}

function backToMail() {
	phase.value = "email";
}

function codeChange() {
	// User changed code
	console.log("codeChange", code.value.length);

	const hadLastDash = code.value[code.value.length - 1] === "-" && code.value.length === 4;

	// (let's trust whatever the fuck this is, AI wrote it + everyone loves regex.)
	// Remove non-digits, and add - in 4th position if length is greater than 3
	code.value = code.value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1-$2") + (hadLastDash ? "-" : "");

	const digits = code.value.split("-").join("");
	console.log(digits);

	// Send code if it reached length
	if (code.value.length === 6 + 1) {
		// User entered 6 digits
		// Send request
		// - if success : redirect
		// - if failure : remove
		code.value = "";
	}
}
</script>
<style scoped>
p {
	width: 15rem;
}

input {
	width: 100%;
	margin-top: 1rem;
	padding: 1rem;
	border: 1px solid #e6e6e6;
	height: 3.5rem;
}

.icon {
	margin-top: -0.15rem;
}

.back-button {
	border: 1px solid #e6e6e6;
	font-weight: bold;
	padding: 0.5rem;
}
input.code {
	font-family: "Courier New", Courier, monospace;
}
</style>
