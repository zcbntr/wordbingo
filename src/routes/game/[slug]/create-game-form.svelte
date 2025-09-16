<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	let squareGrid = $state(true);
</script>

<form method="POST" action="?/create" use:enhance class="flex w-full max-w-lg flex-col gap-6">
	<Form.Field {form} name="tileList">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Tiles</Form.Label>
				<Textarea
					class="min-h-96 w-full min-w-sm bg-accent text-accent-foreground"
					{...props}
					bind:value={$formData.tileList}
					placeholder="Enter your custom words here, one per line or separated by commas."
					maxlength={5000}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>Values must be separated by new lines or commas.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="gridSize">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label for="size">Grid Size</Form.Label>
				<div class="flex flex-row justify-between gap-4 sm:flex-row">
					<div class="flex flex-row items-center gap-2">
						<Input
							class="w-min"
							{...props}
							type="number"
							bind:value={$formData.gridSize[0]}
							onchange={() => {
								if (squareGrid) {
									$formData.gridSize[1] = $formData.gridSize[0];
								}
							}}
							min={3}
							max={10}
							defaultValue={5}
						/>

						<div>x</div>

						<Input
							class="w-min"
							{...props}
							type="number"
							bind:value={$formData.gridSize[1]}
							onchange={() => {
								if (squareGrid) {
									$formData.gridSize[0] = $formData.gridSize[1];
								}
							}}
							min={3}
							max={10}
							defaultValue={5}
						/>
					</div>

					<div class="flex flex-row gap-2">
						<div>Square Grid</div>
						<div class="pt-1">
							<Checkbox
								{...props}
								checked={squareGrid}
								onCheckedChange={() => {
									squareGrid = !squareGrid;

									if (squareGrid && $formData.gridSize[0] !== $formData.gridSize[1]) {
										$formData.gridSize[1] = $formData.gridSize[0];
									}
								}}
							/>
						</div>
					</div>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Create Game</Form.Button>
</form>
