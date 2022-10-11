import s from"fs";import{dirname as a}from"path";const o=async(i,n)=>{const t=a(i),r=n||t;return t==i?r:s.existsSync(t+"/.git")?t:await o(t,r)};var g=o;export{g as default};
