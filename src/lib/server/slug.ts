/**
 * Generate a URL-friendly slug from a title + short random suffix.
 * Format: "My Post Title" → "my-post-title-a1b2c3d4"
 */
export function generateSlug(title: string): string {
	const base = title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // remove non-word chars (except - and space)
		.replace(/[\s_]+/g, '-') // spaces/underscores → hyphens
		.replace(/-+/g, '-') // collapse multiple hyphens
		.replace(/^-|-$/g, '') // trim leading/trailing hyphens
		.slice(0, 60); // max 60 chars for the base

	const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
	return `${base}-${suffix}`;
}
