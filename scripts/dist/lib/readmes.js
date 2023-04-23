import t from"fast-glob";import o from"./env.js";var a=async()=>new Set([...await t(["**/README.md"],{absolute:!0,cwd:o.BASE_DIR})].sort());export{a as default};
