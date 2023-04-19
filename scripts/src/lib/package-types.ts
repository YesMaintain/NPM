export default async () => {
	const results = new Map<string, string>();

	results.set("package.json", "npm");
	results.set("Cargo.toml", "cargo");
	results.set("composer.json", "composer");
	results.set("packages.config", "nuget");
	results.set("*.csproj", "nuget");

	return results;
};
