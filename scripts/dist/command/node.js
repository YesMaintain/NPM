import*as a from"fs";import{dirname as y}from"path";import g from"../lib/git-directories.js";import k from"../lib/package-types.js";import h from"../lib/packages.js";import v from"../options/node.js";import{constants as D}from"fs/promises";const b=async m=>{for(const{path:e,name:n,workflow:w}of m)for(const[d,$]of await g(await h())){const o=`${d}/.github`,i=await w();if(e==="/workflows/"&&n==="node.yml")for(const c of $){const t=y(c).replace(d,""),u=(await a.promises.readFile(c,"utf-8")).toString(),l=(await k()).get(c.split("/").pop());if(typeof l<"u"&&l==="npm")try{const r=JSON.parse(u);for(const s of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof r[s]<"u"&&i.add(`
            - uses: actions/setup-node@v3.6.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${t}
`);for(const s in r)if(Object.prototype.hasOwnProperty.call(r,s)){const f=r[s];if(s==="scripts")for(const p in f)Object.prototype.hasOwnProperty.call(f,p)&&(p==="build"&&i.add(`
            - run: pnpm run build
              working-directory: .${t}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${t.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${t}/dist
`),p==="test"&&i.add(`
            - run: pnpm run test
              working-directory: .${t}
`))}}catch(r){console.log(c),console.log(r)}}if(i.size>1){try{await a.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await a.promises.writeFile(`${o}${e}${n}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/node.yml`)}}else try{await a.promises.access(`${o}${e}${n}`,D.F_OK);try{await a.promises.rm(`${o}${e}${n}`)}catch{console.log(`Could not remove ${e}${n} for: ${o}`)}}catch{}}};var P=async()=>{await b(v)};export{P as default};
