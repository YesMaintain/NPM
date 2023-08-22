export type Filter = "NPM" | "Cargo" | "Composer" | "Nuget" | "Cloudflare" | false;
declare const _default: (Filter?: Filter) => Promise<Map<string, Filter>>;
export default _default;
