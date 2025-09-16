import { z } from 'zod';

export const formSchema = z.object({
	tileList: z.string().min(1).max(5000),
	gridSize: z.array(z.coerce.number().min(3).max(10))
});

export type FormSchema = typeof formSchema;
