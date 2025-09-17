<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types.js';
	import JoinGameForm from './join-game-form.svelte';
	let { data }: { data: PageData } = $props();
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
	<div>
		<div class="flex flex-col items-center">
			<h1 class="mb-6 text-center text-4xl font-bold">Word Bingo</h1>
			<p class="mb-6 max-w-xl text-center text-lg">
				Create your own bingo cards using custom words and play with friends!
			</p>
		</div>
		<div class="flex flex-col flex-nowrap items-center gap-10">
			<JoinGameForm {data} />

			<form method="POST" action="?/new" class="flex flex-col items-center gap-4">
				<button class="text-slate-400 underline">Create a new game</button>
			</form>
		</div>
	</div>
</main>
