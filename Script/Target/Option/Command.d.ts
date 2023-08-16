import type { CommandOptions as Options } from "commander";
declare const Commands: Set<{
    Name: string;
    Opts?: Options;
    Type?: "Flow";
    Description?: string;
    Arguments?: Set<{
        Name: string;
        Description?: string;
        Value?: any;
    }>;
    Action: (...args: any[]) => Promise<void>;
}>;
export default Commands;
