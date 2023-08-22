export type Filter =
	| "NPM"
	| "Cargo"
	| "Composer"
	| "Nuget"
	| "Cloudflare"
	| false;

export default async (Filter: Filter = false) => {
	const Result = new Map<string, Filter>();

	Result.set("package.json", "NPM");
	Result.set("Cargo.toml", "Cargo");
	Result.set("composer.json", "Composer");
	Result.set("packages.config", "Nuget");
	Result.set("*.csproj", "Nuget");
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
