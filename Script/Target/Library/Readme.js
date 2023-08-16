import t from"fast-glob";import o from"./Environment.ts";var m=async()=>new Set([...await t(["**/README.md"],{absolute:!0,cwd:o.BASE_DIR})].sort());export{m as default};
