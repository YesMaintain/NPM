import type { CommandOptions } from "commander";
declare const commands: Set<{
    name: string;
    opts?: CommandOptions;
    type?: "workflow";
    description?: string;
    arguments?: Set<{
        name: string;
        description?: string;
        defaultValue?: unknown;
    }>;
    action: (...args: unknown[]) => Promise<void>;
}>;
export default commands;
