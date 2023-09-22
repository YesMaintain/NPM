import type { CommandOptions as Type } from "commander";
declare const Commands: Set<{
    Name: string;
    Opts?: Type;
    Type?: "Workflow";
    Description?: string;
    Arguments?: Set<{
        Name: string;
        Description?: string;
        Value?: any;
    }>;
    Action: (...args: any[]) => Promise<void>;
}>;
export default Commands;
