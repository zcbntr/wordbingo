// Fetch the game data from redis based on the slug
// If there is nothing, then tell serve the page with the option to create the game
// If there is something, join the game via websocket
import type { Actions } from './$types';
import type { PageServerLoad } from './$types.js';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let tileStrings: string[] = [];
		const splitTileStringsByNewLine = form.data.tileList
			.split('\n')
			.map((word) => word.trim())
			.filter((word) => word.length > 0);
		const splitTileStringsByComma = form.data.tileList
			.split(',')
			.map((word) => word.trim())
			.filter((word) => word.length > 0);
		console.log({ splitWordsByComma: splitTileStringsByComma, splitWordsByNewLine: splitTileStringsByNewLine });

		if (splitTileStringsByNewLine.length > splitTileStringsByComma.length) {
			tileStrings = splitTileStringsByNewLine;
		} else {
			tileStrings = splitTileStringsByComma;
		}

		// Check if there are enough tiles for the grid size
		if (tileStrings.length < form.data.gridSize[0] * form.data.gridSize[1]) {
			const error = `You need at least ${form.data.gridSize[0] * form.data.gridSize[1]} tiles for a ${form.data.gridSize[0]}x${form.data.gridSize[1]} grid.`;
			return setError(form, 'tileList', error);
		}

		return {
			form
		};
	}
};
