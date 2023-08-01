import n from"./WalkUntilGit.js";var i=async r=>{const t=new Map;for(const s of r){const e=await n(s);t.has(e)?t.set(e,t.get(e).add(s)):t.set(e,new Set([s].sort()))}return t};export{i as default};
