import{constants as $}from"fs";import{access as y,mkdir as g,readFile as h,rm as k,writeFile as v}from"fs/promises";import{dirname as b}from"path";import D from"../Library/Directory.ts";import O from"../Library/Package.ts";import C from"../Library/Type.ts";import F from"../Option/Node.ts";const x=async f=>{for(const{Path:o,Name:i,Flow:m}of f)for(const[p,u]of await D(await O("npm"))){const t=`${p}/.github`,r=await m();if(o==="/workflows/"&&i==="Node.yml")for(const c of u){const e=b(c).replace(p,""),w=(await h(c,"utf-8")).toString(),l=(await C()).get(c.split("/").pop());if(typeof l<"u"&&l==="npm")try{const n=JSON.parse(w);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof n[a]<"u"&&r.add(`
            - uses: actions/setup-node@v3.7.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${e}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${e}
`);for(const a in n)if(Object.prototype.hasOwnProperty.call(n,a)){const d=n[a];if(a==="scripts")for(const s in d)Object.prototype.hasOwnProperty.call(d,s)&&(s==="build"&&r.add(`
            - run: pnpm run build
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-Target
                  path: .${e}/Target
`),s==="prepublishOnly"&&r.add(`
            - run: pnpm run prepublishOnly
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-Target
                  path: .${e}/Target
`),s==="test"&&r.add(`
            - run: pnpm run test
              working-directory: .${e}
`))}}catch(n){console.log(c),console.log(n)}}if(r.size>1){try{await g(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await v(`${t}${o}${i}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/Node.yml`)}}else try{await y(`${t}${o}${i}`,$.F_OK);try{await k(`${t}${o}${i}`)}catch{console.log(`Could not remove ${o}${i} for: ${t}`)}}catch{}}};var W=async()=>{await x(F)};export{W as default};
