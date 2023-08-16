import o from"./WalkUntilGit.ts";var a=async n=>{const t=new Map;for(const s of n){const e=await o(s);t.has(e)?t.set(e,t.get(e).add(s)):t.set(e,new Set([s].sort()))}return t};export{a as default};
