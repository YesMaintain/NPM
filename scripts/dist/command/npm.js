import{access as s,constants as n,mkdir as w,rm as l,writeFile as f}from"fs/promises";import $ from"../lib/git-directories.js";import m from"../lib/packages.js";import p from"../options/node.js";const k=async e=>{for(const{path:t,name:r,workflow:i}of e)for(const[c,y]of await $(await m())){const o=`${c}/.github`,a=await i();if(a.size>0){try{await w(`${o}${t}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${t}`)}try{await f(`${o}${t}${r}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/npm.yml`)}}else try{await s(`${o}${t}${r}`,n.F_OK);try{await l(`${o}${t}${r}`)}catch{console.log(`Could not remove ${t}${r} for: ${o}`)}}catch{}}};var C=async()=>{await k(p)};export{C as default};
