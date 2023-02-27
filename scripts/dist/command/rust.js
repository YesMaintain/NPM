import*as a from"fs";import{basename as p,dirname as w}from"path";import g from"../lib/git-directories.js";import $ from"../lib/package-types.js";import u from"../lib/packages.js";import y from"../options/rust.js";const d=async f=>{for(const{path:o,name:t,workflow:m}of f)for(const[i,l]of await g(await u())){const r=`${i}/.github`,e=await m();if(o==="/workflows/"&&t==="rust.yml")for(const s of l){const c=w(s).replace(i,""),n=(await $()).get(s.split("/").pop());typeof n<"u"&&n==="cargo"&&e.add(`
            - uses: actions/cache@v3.2.5
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${c}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${c}/${p(s)}
`)}if(e.size>1){try{await a.promises.mkdir(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await a.promises.writeFile(`${r}${o}${t}`,`${[...e].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/rust.yml`)}}else try{await a.promises.access(`${r}${o}${t}`,a.constants.F_OK);try{await a.promises.rm(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var D=async()=>{await d(y)};export{D as default};
