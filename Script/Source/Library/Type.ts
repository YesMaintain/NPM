export type Filter =
	| "npm"
	| "cargo"
	| "composer"
	| "nuget"
	| "nuget"
	| "Cloudflare"
	| false;

export default async (Filter: Filter = false) => {
	const Result = new Map<string, string>();

	Result.set("package.json", "npm");
	Result.set("Cargo.toml", "cargo");
	Result.set("composer.json", "composer");
	Result.set("packages.config", "nuget");
	Result.set("*.csproj", "nuget");
	Result.set("wrangler.toml", "Cloudflare");

	if (Filter) {
		Result.forEach((value, key) => {
			if (value !== Filter) {
				Result.delete(key);
			}
		});
	}

	return Result;
};
