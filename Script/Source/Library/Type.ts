export default async (Filter: string | false = false) => {
	const results = new Map<string, string>();

	results.set("package.json", "npm");
	results.set("Cargo.toml", "cargo");
	results.set("composer.json", "composer");
	results.set("packages.config", "nuget");
	results.set("*.csproj", "nuget");
	results.set("wrangler.toml", "Cloudflare");

	if (Filter) {
		results.forEach((value, key) => {
			if (value !== Filter) {
				results.delete(key);
			}
		});
	}

	return results;
};
