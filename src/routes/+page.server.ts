import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	new: async () => {
		// Do some shit on the server to make the game then redirect to /game/[gameCode]
		throw redirect(307, '/game/slug');
	},
	join: async ({ request }) => {
		// Get the form data
		const formData = await request.formData();
		const gameCode = formData.get('gameCode');

		// Redirect to /game
		throw redirect(307, '/game/' + gameCode);
	}
};
