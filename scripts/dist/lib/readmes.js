import t from"fast-glob";import r from"./env.js";const e=async()=>new Set([...await t(["**/README.md"],{absolute:!0,cwd:r.BASE_DIR})].sort());var s=e;export{s as default};
