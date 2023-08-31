<template>
	<div class="logo-string">
		<!-- EPFL Logo -->
		<img
			class="epfl-logo"
			src="https://www.epfl.ch/wp/6/wp-content/themes/wp-theme-2018/assets/svg/epfl-logo.svg?refresh=now"
			alt="EPFL Logo"
		/>

		<!-- Vodka logo -->
		<span class="vodka-text">vodka</span>
		<!-- <img src="https://img.cuisineaz.com/1200x675/2023/01/09/i190790-vodka-butter.jpg" alt="Vodka Logo" /> -->
	</div>
</template>

<style scoped>
.logo-string {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 3rem;
}

.logo-string > * {
	height: 1.6rem;
}

.logo-string > *.epfl-logo {
	height: 1.2rem;
}

.logo-string > *.vodka-text {
	font-weight: 900;
	font-size: 1.2rem;
}
</style>
