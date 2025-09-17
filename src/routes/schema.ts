import { z } from 'zod';

export const formSchema = z.object({
	gameCode: z
		.string()
		.min(6, 'Invalid code')
		.max(10, 'Invalid code')
		.regex(/^[a-zA-Z0-9]+$/, 'Code must be alphanumeric')
});

export type FormSchema = typeof formSchema;
