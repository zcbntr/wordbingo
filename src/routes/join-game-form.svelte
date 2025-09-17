<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/new" use:enhance class="flex max-w-lg shrink flex-col gap-6">
	<div class="flex flex-col gap-2">
		<div class="ml-1.5">Invited to a game?</div>
		<div class="flex flex-row place-content-center gap-2">
			<Form.Field {form} name="gameCode">
				<Form.Control>
					{#snippet children({ props })}
						<Input
							class="w-min"
							{...props}
							type="text"
							bind:value={$formData.gameCode}
							placeholder="Game Code"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Create Game</Form.Button>
		</div>
	</div>
</form>
