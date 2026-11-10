const r=(a,s,o)=>`
  <h2 class="sb-section__heading">${s}</h2>
  <hr class="sb-section__divider">
  <div class="sb-section__container">
    <div data-global-theme="${a}">
      ${o}
    </div>
  </div>
`,t=(a,s,o)=>Object.fromEntries(s.map(e=>[e,()=>r(e,`Global Theme: ${o[e]}`,a(e))])),n=(a,s,o,e)=>Object.fromEntries(s.map(c=>[c,Object.fromEntries(o.map(i=>[i,()=>r(c,`Global Theme: ${e[c]}, Section Theme: ${i}`,a(i,c))]))]));export{n as a,t as c};
//# sourceMappingURL=global-theme-stories-BeJELyur.js.map
