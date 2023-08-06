import{constants as $}from"fs";import{access as y,mkdir as g,readFile as h,rm as k,writeFile as v}from"fs/promises";import{dirname as b}from"path";import D from"../Library/Dirs.js";import O from"../Library/Types.js";import C from"../Library/Packages.js";import F from"../Option/NODE.js";const x=async f=>{for(const{Path:o,Name:i,Flow:m}of f)for(const[p,u]of await D(await C("npm"))){const t=`${p}/.github`,n=await m();if(o==="/workflows/"&&i==="node.yml")for(const c of u){const e=b(c).replace(p,""),w=(await h(c,"utf-8")).toString(),l=(await O()).get(c.split("/").pop());if(typeof l<"u"&&l==="npm")try{const r=JSON.parse(w);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof r[a]<"u"&&n.add(`
            - uses: actions/setup-node@v3.7.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${e}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${e}
`);for(const a in r)if(Object.prototype.hasOwnProperty.call(r,a)){const d=r[a];if(a==="scripts")for(const s in d)Object.prototype.hasOwnProperty.call(d,s)&&(s==="build"&&n.add(`
            - run: pnpm run build
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-Target
                  path: .${e}/Target
`),s==="prepublishOnly"&&n.add(`
            - run: pnpm run prepublishOnly
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-Target
                  path: .${e}/Target
`),s==="test"&&n.add(`
            - run: pnpm run test
              working-directory: .${e}
`))}}catch(r){console.log(c),console.log(r)}}if(n.size>1){try{await g(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await v(`${t}${o}${i}`,`${[...n].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/node.yml`)}}else try{await y(`${t}${o}${i}`,$.F_OK);try{await k(`${t}${o}${i}`)}catch{console.log(`Could not remove ${o}${i} for: ${t}`)}}catch{}}};var W=async()=>{await x(F)};export{W as default};
