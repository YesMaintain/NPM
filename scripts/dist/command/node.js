import*as n from"fs";import{dirname as y}from"path";import k from"../lib/git-directories.js";import g from"../lib/package-types.js";import h from"../lib/packages.js";import b from"../options/node.js";const v=async m=>{for(const{path:e,name:r,workflow:w}of m)for(const[d,$]of await k(await h())){const o=`${d}/.github`,i=await w();if(e==="/workflows/"&&r==="node.yml")for(const c of $){const t=y(c).replace(d,""),u=(await n.promises.readFile(c,"utf-8")).toString(),l=(await g()).get(c.split("/").pop());if(typeof l<"u"&&l==="npm"){const a=JSON.parse(u);for(const s of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof a[s]<"u"&&i.add(`
            - uses: actions/setup-node@v3.6.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${t}
`);for(const s in a)if(Object.prototype.hasOwnProperty.call(a,s)){const f=a[s];if(s==="scripts")for(const p in f)Object.prototype.hasOwnProperty.call(f,p)&&(p==="build"&&i.add(`
            - run: pnpm run build
              working-directory: .${t}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${t.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${t}/dist
`),p==="test"&&i.add(`
            - run: pnpm run test
              working-directory: .${t}
`))}}}if(i.size>1){try{await n.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await n.promises.writeFile(`${o}${e}${r}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/dependabot.yml`)}}else try{await n.promises.access(`${o}${e}${r}`,n.constants.F_OK);try{await n.promises.rm(`${o}${e}${r}`)}catch{console.log(`Could not remove ${e}${r} for: ${o}`)}}catch{}}};var C=async()=>{await v(b)};export{C as default};
