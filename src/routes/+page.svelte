<script lang="ts">
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Word Bingo</title>
	<meta name="description" content="Generate and play custom bingo games with your own words!" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-blue-100 to-purple-200 p-4"
>
	<div class="flex flex-col items-center">
		<h1 class="mb-6 text-center text-4xl font-bold">Word Bingo</h1>
		<p class="mb-6 max-w-xl text-center text-lg">
			Create your own bingo cards using custom words and play with friends!
		</p>
	</div>
	<div class="flex flex-col flex-nowrap items-center gap-10">
		<form method="POST" action="?/join" class="flex flex-col items-center gap-4">
			<label for="gameCode" class="">Invited to a game?</label>
			<div>
				<div class="flex flex-row items-center gap-4 sm:flex-row">
					<input
						name="gameCode"
						type="text"
						placeholder="Game Code"
						class="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>

					<button class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
						Join Game
					</button>
				</div>
				{#if form?.errors}
					<div class="flex flex-row place-content-center">
						<p class="mt-2 text-sm text-red-600">{form.errors.gameCode}</p>
					</div>
				{/if}
			</div>
		</form>

		<form method="POST" action="?/new" class="flex flex-col items-center gap-4">
			<button class="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
				New Game
			</button>
		</form>
	</div>
</main>
