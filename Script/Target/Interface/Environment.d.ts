declare const _Object: import("zod").ZodObject<{
    User: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    Base: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    Token: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
}, "strip", import("zod").ZodTypeAny, {
    User: string;
    Base: string;
    Token: string;
}, {
    User?: string | undefined;
    Base?: string | undefined;
    Token?: string | undefined;
}>;
export type Type = Zod.infer<typeof _Object>;
export type { Type as default };
