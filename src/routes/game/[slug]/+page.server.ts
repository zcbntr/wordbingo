// Fetch the game data from redis based on the slug
// If there is nothing, then tell serve the page with the option to create the game
// If there is something, join the game via websocket
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request }) => {
		// Get the form data
		const formData = await request.formData();
		const wordsList = formData.get('wordsList');
		const gridWidth = formData.get('gridWidth');
		const gridHeight = formData.get('gridHeight');

		if (!wordsList) {
			return { success: false, errors: { wordsList: 'Words list is required' } };
		}

		if (!gridWidth || !gridHeight) {
			return { success: false, errors: { grid: 'Grid size is required' } };
		}

		// TODO - Create the game
	}
};
