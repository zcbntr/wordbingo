import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { init } from '@paralleldrive/cuid2';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

const nanoid = init({ length: 6 });

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	new: async () => {
		// Do some shit to make the game then redirect to /game/[gameCode]
		// TODO - Add check for existing game with this id
		const gameCode = nanoid();

		throw redirect(307, '/game/' + gameCode);
	},
	join: async ({ request }) => {
		// Get the form data
		const formData = await request.formData();
		const gameCode = formData.get('gameCode');

		if (!gameCode) {
			return { success: false, errors: { gameCode: 'Game code is required' } };
		}

		// TODO - Find existing game

		// Redirect to /game
		throw redirect(307, '/game/' + gameCode);
	}
};
