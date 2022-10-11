import t from"fast-glob";import e from"./env.js";const r=async()=>new Set([...await t(["**/README.md"],{absolute:!0,cwd:e.BASE_DIR})]);var n=r;export{n as default};
