import t from"fast-glob";import o from"./Environment.js";var a=async()=>new Set([...await t(["**/.git"],{absolute:!0,cwd:o.Base})].sort());export{a as default};
