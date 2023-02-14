import t from"fast-glob";import o from"./env.js";const r=async()=>new Set([...await t(["**/.git"],{absolute:!0,cwd:o.BASE_DIR})].sort());var a=r;export{a as default};
