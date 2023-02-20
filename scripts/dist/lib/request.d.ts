import type { OctokitResponse } from "@octokit/types";
declare const request: (where: string, _with?: {}, type?: string) => Promise<OctokitResponse<any, number> | any>;
export default request;
