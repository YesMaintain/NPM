import t from"fast-glob";import o from"./Environment.js";var i=async()=>new Set([...await t(["**/.git"],{absolute:!0,cwd:o.BASE_DIR})].sort());export{i as default};
