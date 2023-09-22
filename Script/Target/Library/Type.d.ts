export type Type = "NPM" | "Cargo" | "Composer" | "Nuget" | "Cloudflare" | false;
declare const _default: (Filter?: Type) => Promise<Map<string, Type>>;
export default _default;
