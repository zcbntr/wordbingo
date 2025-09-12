export function parseWords(input: string): string[] {
	// split by newlines, commas, semicolons, or pipes
	return input
		.split(/[\n,;|]+/)
		.map((w) => w.trim())
		.filter(Boolean);
}
