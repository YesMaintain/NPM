export type Workflow = Set<{
    Path: string;
    Name: string;
    File: () => Promise<Set<string>>;
}>;
