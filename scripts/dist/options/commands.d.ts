import type { CommandOptions } from "commander";
declare const commands: Set<{
    name: string;
    opts?: CommandOptions;
    type?: "workflow";
    description?: string;
    arguments?: Set<{
        name: string;
        description?: string;
        defaultValue?: any;
    }>;
    action: (...args: any[]) => Promise<void>;
}>;
export default commands;
