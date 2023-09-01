<template>
	<div class="logo-string">
		<!-- EPFL Logo -->
		<img
			class="epfl-logo"
			src="https://www.epfl.ch/wp/6/wp-content/themes/wp-theme-2018/assets/svg/epfl-logo.svg?refresh=now"
			alt="EPFL Logo"
		/>

		<!-- Vodka logo -->
		<a href="/">
			<!-- <span class="vodka-text">vodka</span> -->
			<VodkaLogo class="vodka-logo" />
		</a>
		<!-- <img src="https://img.cuisineaz.com/1200x675/2023/01/09/i190790-vodka-butter.jpg" alt="Vodka Logo" /> -->
	</div>
</template>

<style scoped>
.logo-string {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 2rem;
}

/* .logo-string > * {
	height: 2rem;
} */

.logo-string > *.epfl-logo {
	height: 1.4rem;
}

.logo-string > a .vodka-logo {
	height: 2.4rem;
}
</style>
