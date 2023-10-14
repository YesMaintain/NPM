declare const _default: (Repositories?: string[]) => Promise<void>;
export default _default;
export declare const Request: (Where: string, With?: {}, Type?: string) => Promise<void | import("@octokit/types").OctokitResponse<any, number>>;
export declare const User: string;
export declare const All: {
    Organizations: {
        Name: string;
    }[];
    Repositories: {
        Owner: string;
        Name: string;
    }[];
};
