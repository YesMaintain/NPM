import t from"fs";import{dirname as u}from"path";import k from"../lib/git-directories.js";import g from"../lib/package-types.js";import h from"../lib/packages.js";import b from"../options/node.js";const v=async m=>{for(const{path:e,name:n,workflow:w}of m)for(const[p,$]of await k(await h())){const o=`${p}/.github`,a=await w();if(e==="/workflows/"&&n==="node.yml")for(const c of $){const r=u(c).replace(p,""),y=(await t.promises.readFile(c)).toString(),d=(await g()).get(c.split("/").pop());if(typeof d<"u"&&d==="npm"){const s=JSON.parse(y);for(const i of["bundledDependencies","peerDependencies","peerDependenciesMeta","dependencies","optionalDependencies","devDependencies","extensionDependencies","bundleDependencies"])typeof s[i]<"u"&&a.add(`
            - uses: actions/setup-node@v3.5.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${r}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${r}
`);for(const i in s)if(Object.prototype.hasOwnProperty.call(s,i)){const l=s[i];if(i==="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f==="build"&&a.add(`
            - run: pnpm run build
              working-directory: .${r}
            - uses: actions/upload-artifact@v3.1.1
              with:
                  name: ${r.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${r}/dist
`)}}}if(a.size>1){try{await t.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await t.promises.writeFile(`${o}${e}${n}`,`${Array.from(a).join("")}`)}catch{console.log(`Could not create workflow for: ${o}/dependabot.yml`)}}else try{await t.promises.access(`${o}${e}${n}`,t.constants.F_OK);try{await t.promises.rm(`${o}${e}${n}`)}catch{console.log(`Could not remove ${e}${n} for: ${o}`)}}catch{}}};var A=async()=>{await v(b)};export{A as default};
