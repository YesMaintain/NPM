export type Files = Set<{
	Path: string;
	Name: string;
	File: () => Promise<Set<string>>;
}>;
