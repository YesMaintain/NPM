export type Containers = Set<{
	Path: string;
	Name: string;
	Workflow: () => Promise<Set<string>>;
}>;
