import{b5 as i}from"../iframe.js";import{n as d}from"./micromodal.es-Dp1N63aw.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const m={id:"yds-modal",title:"Modal title",content:"Modal content"},c=new WeakMap;Drupal.behaviors.ysModal={attach(a){const r=once("modal",".micromodal-slide",a);r.length>0&&(d.init({disableScroll:!0,awaitCloseAnimation:!0}),r.forEach(o=>{o.querySelectorAll("[data-micromodal-close]").forEach(t=>{const s=n=>{n.preventDefault(),n.stopPropagation(),d.close(o.id),o.classList.remove("is-open"),o.setAttribute("aria-hidden","true"),document.body.style.overflow=""},l=c.get(t);l&&t.removeEventListener("click",l),c.set(t,s),t.addEventListener("click",s)})}))}};const b={title:"Molecules/Modal"},e=a=>`
    <button class="" data-micromodal-trigger="yds-modal" role="button"> Demo Modal </button>
    ${i({...m,...a})}
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => {
  return \`
    <button class="" data-micromodal-trigger="yds-modal" role="button"> Demo Modal </button>
    \${modalTwig({
    ...modalData,
    ...args
  })}
\`;
}`,...e.parameters?.docs?.source}}};const v=["Modal"];export{e as Modal,v as __namedExportsOrder,b as default};
//# sourceMappingURL=modal.stories-B0DFwEfg.js.map
