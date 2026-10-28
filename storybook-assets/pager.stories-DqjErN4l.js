import{O as p,_ as u}from"../iframe.js";import{t as y,a as _}from"./component-props-De-d7Djp.js";Drupal.behaviors.clPagination={attach(n){const s=once("pager",".pager__item",n),a="is-active";s.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const r=n.querySelector(".is-active"),c=r.querySelector(".pager__link"),o=e.querySelector("a");r.classList.remove(a),c.classList.remove(a),c.style.cursor="pointer",e.classList.add(a),o.classList.add(a),o.style.cursor="text"})})}};const f={currentPage:{twigProp:"current",name:"Current page",type:"number",required:!1,description:"Current active page number",default:1,control:"number"},totalPages:{twigProp:"items.pages",name:"Total pages",type:"number",required:!1,description:"Total number of pages to display in the pager",default:10,control:"number"}};function h(n,s){const a=Math.max(1,Math.min(1e3,Math.floor(Math.abs(s||1)))),e=Math.max(1,Math.floor(Math.abs(n||1))),t={current:e,items:{pages:{}}};for(let r=1;r<=a;r+=1)t.items.pages[r]={href:`#page-${r}`};return e>1&&(t.items.previous={href:`#page-${e-1}`},t.items.first={href:"#page-1"}),e<a&&(t.items.next={href:`#page-${e+1}`},t.items.last={href:`#page-${a}`}),t}window.PagerManager={updatePager(n,s,a,e){try{const t=n;t.storybookEnhanced&&(t.storybookEnhanced=!1);const r=h(a,e.totalPages),o=u(r).replace('<nav class="pager"',`<nav class="pager" data-story-id="${s}"`),i={...e,currentPage:a};let g=o;if(i.storyInfo){const m={inline_message__type:"general",inline_message__heading:i.storyInfo.title,inline_message__content:`<strong>Pattern:</strong> ${i.storyInfo.pattern}<br><br><strong>Use Case:</strong> ${i.storyInfo.useCase}`};g=p(m)+o}t.parentNode.innerHTML=g,setTimeout(()=>{this.attachEnhancement(s,i)},100)}catch{}},attachEnhancement(n,s){const a=document.querySelector(`[data-story-id="${n}"]`);if(!a||a.storybookEnhanced)return;a.storybookEnhanced=!0,a.querySelectorAll('.pager__link[href^="#page-"]').forEach(t=>{if(t.storybookHandler)return;const r=o=>{o.preventDefault(),o.stopPropagation(),setTimeout(()=>{const g=t.getAttribute("href").match(/#page-(\d+)/);if(g){const m=parseInt(g[1],10);m!==s.currentPage&&window.PagerManager.updatePager(a,n,m,s)}},50)},c=t;c.storybookHandler=r,t.addEventListener("click",r,{capture:!0})})}};function P(n,s){window.PagerManager.attachEnhancement(n,s)}const d=_(f);d.currentPage={...d.currentPage,control:{type:"number",min:1,max:50,step:1}};d.totalPages={...d.totalPages,control:{type:"number",min:1,max:50,step:1}};d.storyInfo={table:{disable:!0},control:{disable:!0}};const b={title:"Molecules/Pager",tags:["!dev"],argTypes:d,args:y(f),parameters:{docs:{description:{component:"Storybook Definition"}}}},M=n=>{const s=Math.max(1,Math.min(50,Math.floor(Math.abs(n.totalPages||10)))),a=Math.max(1,Math.min(s,Math.floor(Math.abs(n.currentPage||1)))),e={...n,totalPages:s,currentPage:a};if(e.totalPages===1)return p({inline_message__type:"general",inline_message__heading:"Single Page Detected",inline_message__content:"Pagination is intentionally hidden when only one page exists. This reduces visual clutter and follows UX best practices."});const t=h(e.currentPage,e.totalPages),r=u(t),c=`pager-story-${Date.now()}-${Math.random()}`,o=r.replace('<nav class="pager"',`<nav class="pager" data-story-id="${c}"`);let i=o;if(e.storyInfo){const g={inline_message__type:"general",inline_message__heading:e.storyInfo.title,inline_message__content:`<strong>Pattern:</strong> ${e.storyInfo.pattern}<br><br><strong>Use Case:</strong> ${e.storyInfo.useCase}`};i=p(g)+o}return setTimeout(()=>{P(c,e)},150),i},l=M.bind({});l.args={currentPage:1,totalPages:10};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => {
  // Validate and normalize args for Storybook demo
  const safeTotalPages = Math.max(1, Math.min(50, Math.floor(Math.abs(args.totalPages || 10))));
  const safeCurrentPage = Math.max(1, Math.min(safeTotalPages, Math.floor(Math.abs(args.currentPage || 1))));
  const safeArgs = {
    ...args,
    totalPages: safeTotalPages,
    currentPage: safeCurrentPage
  };

  // Check if single page - show explanatory message instead of pagination
  if (safeArgs.totalPages === 1) {
    const messageData = {
      inline_message__type: 'general',
      inline_message__heading: 'Single Page Detected',
      inline_message__content: 'Pagination is intentionally hidden when only one page exists. This reduces visual clutter and follows UX best practices.'
    };
    return inlineMessage(messageData);
  }
  const data = generatePagerData(safeArgs.currentPage, safeArgs.totalPages);
  const html = pager(data);
  const storyId = \`pager-story-\${Date.now()}-\${Math.random()}\`;
  const wrappedHtml = html.replace('<nav class="pager"', \`<nav class="pager" data-story-id="\${storyId}"\`);

  // Add documentation div if story has documentation
  let documentedHtml = wrappedHtml;
  if (safeArgs.storyInfo) {
    const messageData = {
      inline_message__type: 'general',
      inline_message__heading: safeArgs.storyInfo.title,
      inline_message__content: \`<strong>Pattern:</strong> \${safeArgs.storyInfo.pattern}<br><br><strong>Use Case:</strong> \${safeArgs.storyInfo.useCase}\`
    };
    const docDiv = inlineMessage(messageData);
    documentedHtml = docDiv + wrappedHtml;
  }

  // Let cl-pager.js attach first, then add our enhancement
  setTimeout(() => {
    addStorybookEnhancement(storyId, safeArgs);
  }, 150);
  return documentedHtml;
}`,...l.parameters?.docs?.source}}};const v=["Interactive"],k=Object.freeze(Object.defineProperty({__proto__:null,Interactive:l,__namedExportsOrder:v,default:b},Symbol.toStringTag,{value:"Module"}));export{l as I,k as P,f as c};
//# sourceMappingURL=pager.stories-DqjErN4l.js.map
