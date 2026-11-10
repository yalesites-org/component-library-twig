import{b6 as i}from"../iframe.js";import{n as d}from"./micromodal.es-Dp1N63aw.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const m={id:"yds-modal",title:"Modal title",content:"Modal content"},c=new WeakMap;Drupal.behaviors.ysModal={attach(a){const r=once("modal",".micromodal-slide",a);r.length>0&&(d.init({disableScroll:!0,awaitCloseAnimation:!1}),r.forEach(o=>{o.querySelectorAll("[data-micromodal-close]").forEach(e=>{const s=n=>{n.preventDefault(),n.stopPropagation(),d.close(o.id),o.classList.remove("is-open"),o.setAttribute("aria-hidden","true"),document.body.style.overflow=""},l=c.get(e);l&&e.removeEventListener("click",l),c.set(e,s),e.addEventListener("click",s)})}))}};const b={title:"Molecules/Modal"},t=a=>`
    <button class="" data-micromodal-trigger="yds-modal" role="button"> Demo Modal </button>
    ${i({...m,...a})}
`;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => {
  return \`
    <button class="" data-micromodal-trigger="yds-modal" role="button"> Demo Modal </button>
    \${modalTwig({
    ...modalData,
    ...args
  })}
\`;
}`,...t.parameters?.docs?.source}}};const v=["Modal"];export{t as Modal,v as __namedExportsOrder,b as default};
//# sourceMappingURL=modal.stories-CfSt1nqk.js.map
