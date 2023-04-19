import{access as u,constants as y,mkdir as g,readFile as k,rm as h,writeFile as v}from"fs/promises";import{dirname as D}from"path";import b from"../lib/git-directories.js";import O from"../lib/package-types.js";import F from"../lib/packages.js";import j from"../options/node.js";const x=async f=>{for(const{path:e,name:r,workflow:m}of f)for(const[p,w]of await b(await F("npm"))){const o=`${p}/.github`,i=await m();if(e==="/workflows/"&&r==="node.yml")for(const c of w){const t=D(c).replace(p,""),$=(await k(c,"utf-8")).toString(),d=(await O()).get(c.split("/").pop());if(typeof d<"u"&&d==="npm")try{const n=JSON.parse($);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof n[a]<"u"&&i.add(`
            - uses: actions/setup-node@v3.6.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${t}
`);for(const a in n)if(Object.prototype.hasOwnProperty.call(n,a)){const l=n[a];if(a==="scripts")for(const s in l)Object.prototype.hasOwnProperty.call(l,s)&&(s==="build"&&i.add(`
            - run: pnpm run build
              working-directory: .${t}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${t.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${t}/dist
`),s==="test"&&i.add(`
            - run: pnpm run test
              working-directory: .${t}
`))}}catch(n){console.log(c),console.log(n)}}if(i.size>1){try{await g(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await v(`${o}${e}${r}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/node.yml`)}}else try{await u(`${o}${e}${r}`,y.F_OK);try{await h(`${o}${e}${r}`)}catch{console.log(`Could not remove ${e}${r} for: ${o}`)}}catch{}}};var A=async()=>{await x(j)};export{A as default};
