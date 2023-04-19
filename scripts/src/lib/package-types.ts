export default async (filter: string | false = false) => {
	const results = new Map<string, string>();

	results.set("package.json", "npm");
	results.set("Cargo.toml", "cargo");
	results.set("composer.json", "composer");
	results.set("packages.config", "nuget");
	results.set("*.csproj", "nuget");

	if (filter) {
		results.forEach((value, key) => {
			if (value !== filter) {
				results.delete(key);
			}
		});
	}

	return results;
};
