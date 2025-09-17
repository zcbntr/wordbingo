<script lang="ts">
	import type { PageData } from './$types.js';
	import CreateGameForm from './create-game-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-blue-100 to-purple-200 p-4"
>
	<h1 class="mb-6 text-center text-4xl font-bold">Create a New Game</h1>
	<CreateGameForm {data} />
	<a href="/" class="text-slate-400">Join a game?</a>
</main>
