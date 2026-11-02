const _=(e,t,a,s="",i="Theme")=>`
  <h2 class="sb-section__heading">${a}</h2>
  ${s?`<p class="sb-section__description">${s}</p>`:""}
  <hr class="sb-section__divider">
  ${t.map(n=>`
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">${i}: ${n}</h3>
      ${e(n)}
    </div>
  `).join("")}
`,h=(e,t,a,s="",i="Variation",n=null)=>`
  <h2 class="sb-section__heading">${a}</h2>
  ${s?`<p class="sb-section__description">${s}</p>`:""}
  <hr class="sb-section__divider">
  ${t.map(c=>`
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">${n?n(c):`${i}: ${c}`}</h3>
      ${e(c)}
    </div>
  `).join("")}
`,r=(e,t,a)=>`
  <h2 class="sb-section__heading">${a}</h2>
  <hr class="sb-section__divider">
  ${t.map(({theme:s,accent:i})=>`
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">Theme: ${s} / Accent: ${i}</h3>
      ${e(s,i)}
    </div>
  `).join("")}
`,$=(e,t,a={})=>{const{width:s="site",primaryWidth:i,hasDivider:n=!1,innerStyle:c}=a,o=i?` style="width: ${i}"`:"",d=c?` style="${c}"`:"";return`
    <div data-component-has-divider="${n}"
         data-section-theme="${e}"
         data-component-width="${s}"
         class="yds-layout"
         data-embedded-components=""
         data-spotlights-position="first">
      <div class="yds-layout__inner"${d}>
        <div class="yds-layout__primary"${o}>
          ${t}
        </div>
      </div>
    </div>
  `};export{$ as a,h as b,_ as c,r as d};
//# sourceMappingURL=playground-utils-DQnyvH8W.js.map
