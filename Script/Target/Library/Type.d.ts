export type Filter = "npm" | "cargo" | "composer" | "nuget" | "nuget" | "Cloudflare" | false;
declare const _default: (Filter?: Filter) => Promise<Map<string, string>>;
export default _default;
