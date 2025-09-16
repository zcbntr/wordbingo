<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { writable, derived } from 'svelte/store';

	const gridWidth = writable(5);
	const gridHeight = writable(5);
	const squareGrid = writable(true);

	const gridSizeText = derived(
		[gridWidth, gridHeight],
		([$gridWidth, $gridHeight]) => `${$gridWidth} x ${$gridHeight}`
	);

	// Reactive statement to sync gridHeight with gridWidth when squareGrid is true
	gridWidth.subscribe(($gridWidth) => {
		squareGrid.subscribe(($squareGrid) => {
			if ($squareGrid) {
				gridHeight.set($gridWidth);
			}
		});
	});
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-blue-100 to-purple-200 p-4"
>
	<div>Enter your word selection</div>

	<form method="POST" action="?/create" class="flex flex-col items-center gap-4">
		<Textarea name="wordsList" class="min-h-96 w-full max-w-3xl min-w-xs bg-accent p-2 sm:min-w-md"
		></Textarea>

		<Label for="size">{$gridSizeText}</Label>
		<Label for="width">Width</Label>
		<Slider type="single" bind:value={$gridWidth} min={3} max={10} />

		{#if !$squareGrid}
			<Label for="height">Height</Label>
			<Slider type="single" bind:value={$gridHeight} min={3} max={10} />
		{/if}
		<div class="flex flex-row place-content-center gap-2">
			<input type="checkbox" bind:checked={$squareGrid} />
			Square Grid
		</div>

		<Button class=" bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
			Create Game
		</Button>
	</form>
</main>
