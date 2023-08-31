<template>
	<div class="space">
		<main class="content">
			<LogoString />
			<div class="items">
				<slot />
			</div>
		</main>
	</div>
</template>

<style scoped>
.space {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
main.content {
	border: #e6e6e6 1px solid;

	display: flex;
	flex-direction: column;
	justify-content: stretch;

	min-width: 25rem;

	padding: 2.5rem;
}

main.content > .items {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>

<style>
.button {
	margin-top: 1rem;
	padding: 1rem;
	border: 1px solid #e6e6e6;
	height: 3.5rem;
	width: 100%;
}

.button.red {
	margin-top: 2rem;
	border: none;
	background-color: red;
	color: white;
}

.button:disabled {
	background-color: #e6e6e6;
	color: gray;
}

.button.main {
	font-weight: bold;
}
</style>
