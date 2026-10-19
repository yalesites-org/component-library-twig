import{b6 as z,b7 as je,t as u,b8 as qe,b9 as De,aO as me,aC as pe,ba as Ie,bb as Re,aB as se}from"../iframe.js";import{g as Le}from"./color-global-themes-C7UI5K9x.js";import"./yds-text-copy-button-li-VLzqi.js";import{u as W}from"./utility-nav-cXaVPHEz.js";import{p as U}from"./primary-nav-3-07Xq0g.js";import"./yds-menu-toggle-CCw3uUL5.js";import"./yds-tabs-Egev4hry.js";import{q as he}from"./quick-links-vBLtUtYH.js";import{i as ue}from"./image-CSdbOboU.js";import{t as ge}from"./tabs-Dl0Hirov.js";import{b as _e}from"./banner-CWi5B0T_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const N=[{id:"normal-aa",label:"Normal text",level:"AA",criterion:"1.4.3",minimum:4.5},{id:"large-aa",label:"Large text",level:"AA",criterion:"1.4.3",minimum:3},{id:"non-text",label:"UI & graphics",level:"AA",criterion:"1.4.11",minimum:3},{id:"normal-aaa",label:"Normal text",level:"AAA",criterion:"1.4.6",minimum:7},{id:"large-aaa",label:"Large text",level:"AAA",criterion:"1.4.6",minimum:4.5}],be=N.find(e=>e.id==="normal-aa").minimum;function Ve(){return[...new Set(N.map(t=>t.minimum))].sort((t,o)=>t-o).map(t=>({minimum:t,levels:N.filter(o=>o.minimum===t)}))}const We=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i,Ue=/^hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/i;function re(e){if(typeof e!="string")return null;const t=e.trim().match(We);if(!t)return null;const o=t[1],n=o.length===3?o.split("").map(s=>s+s).join(""):o;return{r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)}}function $(e){if(typeof e!="string")return null;const t=e.trim().match(Ue);if(!t)return null;const o=parseFloat(t[1]),n=parseFloat(t[2])/100,s=parseFloat(t[3])/100,a=n*Math.min(s,1-s),d=l=>{const c=(l+o/30)%12;return Math.round(255*(s-a*Math.max(Math.min(c-3,9-c,1),-1)))};return{r:d(0),g:d(8),b:d(4)}}function G(e){if(!e)return null;const t=o=>o.toString(16).padStart(2,"0");return`#${t(e.r)}${t(e.g)}${t(e.b)}`}function Ye(e){return e?`${e.r}, ${e.g}, ${e.b}`:null}function ie(e){if(!e)return null;const[t,o,n]=[e.r,e.g,e.b].map(s=>{const a=s/255;return a<=.03928?a/12.92:((a+.055)/1.055)**2.4});return .2126*t+.7152*o+.0722*n}function L(e,t){const o=ie(e),n=ie(t);if(o===null||n===null)return null;const s=Math.max(o,n),a=Math.min(o,n);return(s+.05)/(a+.05)}function oe(e){return typeof e!="number"||Number.isNaN(e)?null:(Math.floor(e*100+1e-9)/100).toFixed(2)}function Qe(e){return typeof e!="number"||Number.isNaN(e)?[]:N.map(t=>({...t,passes:e>=t.minimum}))}function Z(e,t){const o=e.map((s,a)=>Math.max(e[a].length,...t.map(d=>String(d[a]).length))),n=s=>s.map((a,d)=>String(a).padEnd(o[d])).join("  ").trimEnd();return[n(e),n(o.map(s=>"-".repeat(s)))].concat(t.map(n)).join(`
`)}function ze({generatedOn:e,colors:t,thresholds:o,pairs:n}){return["YaleSites contrast check",`Generated ${e}`,"","COLORS CHECKED",Z(["Name","Hex"],t.map(a=>[a.label,a.hex])),"","COVERAGE BY WCAG MINIMUM",Z(["Minimum","Used for","Pairings passing","Slots with no partner"],o.map(a=>[`${a.minimum}:1`,a.usedFor,`${a.passing} of ${a.total}`,a.isolated.length?a.isolated.join(", "):"None"])),"","EVERY PAIRING",Z(["Pairing","Ratio","Verdict"],n.map(a=>[`${a.a} / ${a.b}`,`${oe(a.ratio)}:1`,a.verdict])),"","WCAG 2.1 thresholds",...N.map(a=>`  ${a.minimum}:1  ${a.label} (${a.level}), SC ${a.criterion}`),"  Level A has no contrast success criterion.",""].join(`
`)}function Xe(e,t){const o=Object.keys(e);return o.filter(n=>o.every(s=>s===n||L(e[n],e[s])<t))}const ye={one:{border:"slot-four",background:"slot-one",content:"slot-eight",heading:"slot-eight",link:"slot-eight"},two:{border:"slot-seven",background:"slot-four",content:"slot-seven",heading:"slot-seven",link:"slot-seven"},three:{border:"slot-four",background:"slot-five",content:"slot-eight",heading:"slot-eight",link:"slot-eight"},four:{border:"slot-four",background:"slot-two",content:"slot-eight",heading:"slot-eight",link:"slot-eight"},five:{border:"slot-seven",background:"slot-nine",content:"slot-seven",heading:"slot-seven",link:"slot-seven"},six:{border:"slot-seven",background:"slot-three",content:"slot-seven",heading:"slot-seven",link:"slot-seven"}};function Ke(e,t){const{colors:o}=t[e],n={...o};return e==="four"&&(n["slot-two"]=o["slot-five"],n["slot-five"]=o["slot-two"]),n}const Je={blue:{yale:{name:"Yale Blue",cmyk:"100, 50, 0, 58",pantone:"--"},medium:{name:"Medium Blue",cmyk:"79, 44, 0, 25",pantone:"--"},light:{name:"Light Blue",cmyk:"62, 34, 0, 0",pantone:"--"},horizon:{name:"Horizon Blue",cmyk:"64, 32, 0, 33",pantone:"--"},shale:{name:"Shale Blue",cmyk:"33, 10, 0, 31",pantone:"--"},pewter:{name:"Pewter Blue",cmyk:"10, 0, 0, 21",pantone:"--"},royal:{name:"Royal Blue",cmyk:"64, 44, 0, 41",pantone:"--"},slate:{name:"Slate Blue",cmyk:"25, 3, 0, 64",pantone:"--"},oceanic:{name:"Oceanic Blue",cmyk:"53, 0, 5, 56",pantone:"--"},"soft-oceanic":{name:"Soft Oceanic Blue",cmyk:"8, 0, 1, 3",pantone:"--"},soft:{name:"Soft Blue",cmyk:"6, 2, 0, 3",pantone:"--"},"deep-teal":{name:"Deep Teal Blue",cmyk:"42, 21, 0, 67",pantone:"--"},mint:{name:"Mint Blue",cmyk:"34, 0, 4, 18",pantone:"--"},ocean:{name:"Ocean Blue",cmyk:"54, 0, 4, 56",pantone:"--"}},green:{basil:{name:"Basil Green",cmyk:"15, 0, 23, 59",pantone:"--"},ground:{name:"Ground Green",cmyk:"8, 0, 17, 38",pantone:"--"},fog:{name:"Fog Green",cmyk:"0, 1, 10, 13",pantone:"--"},pine:{name:"Pine Green",cmyk:"27, 0, 14, 78",pantone:"--"}},orange:{peach:{name:"Peach",cmyk:"0, 22, 55, 16",pantone:"--"},coral:{name:"Coral",cmyk:"0, 61, 68, 0",pantone:"--"}},yellow:{umbrella:{name:"Umbrella",cmyk:"0, 13, 46, 11",pantone:"--"},"yale-gold":{name:"Yale Gold",cmyk:"0, 16, 64, 0",pantone:"--"}},basic:{white:{name:"White",cmyk:"0, 0, 0, 0",pantone:"--"},black:{name:"Black",cmyk:"0, 0, 0, 100",pantone:"--"},"brown-gray":{name:"Brown Gray",cmyk:"0, 7, 13, 53",pantone:"--"}},gray:{100:{name:"Gray 100",cmyk:"0, 0, 0, 3",pantone:"--"},200:{name:"Gray 200",cmyk:"0, 0, 0, 15",pantone:"--"},300:{name:"Gray 300",cmyk:"0, 0, 0, 27",pantone:"--"},400:{name:"Gray 400",cmyk:"0, 0, 0, 39",pantone:"--"},500:{name:"Gray 500",cmyk:"0, 0, 0, 54",pantone:"--"},600:{name:"Gray 600",cmyk:"0, 0, 0, 63",pantone:"--"},700:{name:"Gray 700",cmyk:"0, 0, 0, 71",pantone:"--"},800:{name:"Gray 800",cmyk:"0, 0, 0, 87",pantone:"--"},900:{name:"Gray 900",cmyk:"0, 0, 0, 89",pantone:"--"},hale:{name:"Gray Hale",cmyk:"22, 13, 0, 66",pantone:"--"}},brown:{sand:{name:"Sand",cmyk:"0, 8, 16, 24",pantone:"--"},mushroom:{name:"Mushroom",cmyk:"0, 5, 12, 43",pantone:"--"}},purple:{visited:{name:"Visited",cmyk:"48, 70, 0, 43",pantone:"--"},"visited-hover":{name:"Visited Hover",cmyk:"48, 71, 0, 24",pantone:"--"},"visited-light":{name:"Visited Light",cmyk:"10, 15, 0, 3",pantone:"--"},"visited-light-hover":{name:"Visited Light Hover",cmyk:"15, 22, 0, 2",pantone:"--"},plum:{name:"Plum",cmyk:"15, 23, 0, 57",pantone:"--"}}},Ze={yale_blue:{label:"Yale Blue",colors:{"yale-blue":{name:"Yale Blue",hex:"#00356b",pms:"PMS 648 C / PMS 295 U",cmyk_coated:"100, 75, 8, 40",cmyk_uncoated:"100, 75, 5, 35"}}},core:{label:"Core Colors",colors:{blue:{name:"Blue",hex:"#4681C2",pms:"PMS 660 C / PMS 279 U",cmyk_coated:"74, 44, 0, 0",cmyk_uncoated:"70, 39, 0, 0"},"blue-light":{name:"Blue (light)",hex:"#78A7D8",pms:"PMS 645",cmyk_coated:"51, 23, 0, 1",cmyk_uncoated:"52, 24, 0, 1"},"blue-lighter":{name:"Blue (lighter)",hex:"#A7CFEE",pms:"PMS 277",cmyk_coated:"32, 8, 0, 0",cmyk_uncoated:"31, 8, 0, 0"},"warm-gray":{name:"Warm Gray",hex:"#968B83",pms:"PMS Warm Gray 7",cmyk_coated:"43, 41, 45, 4",cmyk_uncoated:"33, 31, 33, 17"}}},families:{red:{label:"Red",colors:{"red-light":{name:"Red (light)",hex:"#EF4637",pms:"PMS 179",cmyk_coated:"0, 88, 85, 0",cmyk_uncoated:"0, 83, 100, 0"},red:{name:"Red",hex:"#ED1C2E",pms:"PMS 485",cmyk_coated:"0, 99, 89, 0",cmyk_uncoated:"0, 85, 100, 0"},"red-dark":{name:"Red (dark)",hex:"#C11E30",pms:"PMS 1805",cmyk_coated:"0, 97, 78, 22",cmyk_uncoated:"2, 89, 76, 18"},"red-darker":{name:"Red (darker)",hex:"#85081F",pms:"PMS 1815",cmyk_coated:"2, 97, 72, 52",cmyk_uncoated:"9, 86, 74, 38"}}},orange:{label:"Orange",colors:{"orange-dark":{name:"Orange (dark)",hex:"#F15623",pms:"PMS 1665",cmyk_coated:"0, 82, 100, 0",cmyk_uncoated:"0, 72, 100, 0"},"orange-darker":{name:"Orange (darker)",hex:"#D3551D",pms:"PMS 1525",cmyk_coated:"0, 77, 100, 14",cmyk_uncoated:"0, 66, 100, 15"},"gold-dark":{name:"Gold (dark)",hex:"#E19717",pms:"PMS 131",cmyk_coated:"0, 39, 100, 11",cmyk_uncoated:"0, 42, 100, 16"},orange:{name:"Orange",hex:"#F89644",pms:"PMS 6017",cmyk_coated:"0, 49, 82, 0",cmyk_uncoated:"0, 52, 86, 0"}}},yellow:{label:"Yellow",colors:{"yellow-light":{name:"Yellow (light)",hex:"#FDF49B",pms:"PMS 601",cmyk_coated:"2, 0, 49, 0",cmyk_uncoated:"0, 0, 53, 0"},yellow:{name:"Yellow",hex:"#FCE020",pms:"PMS 107",cmyk_coated:"3, 7, 96, 0",cmyk_uncoated:"0, 0, 89, 0"},"orange-light":{name:"Orange (light)",hex:"#FFEBC2",pms:"PMS 7506",cmyk_coated:"0, 7, 26, 0",cmyk_uncoated:"0, 6, 28, 0"},gold:{name:"Gold",hex:"#FDB515",pms:"PMS 130 C / PMS 129 U",cmyk_coated:"0, 32, 100, 0",cmyk_uncoated:"0, 25, 100, 0"}}},green:{label:"Green",colors:{"green-light":{name:"Green (light)",hex:"#CCE4B2",pms:"PMS 580",cmyk_coated:"21, 0, 38, 0",cmyk_uncoated:"17, 0, 35, 0"},green:{name:"Green",hex:"#00AA52",pms:"PMS 347",cmyk_coated:"92, 0, 97, 0",cmyk_uncoated:"90, 0, 95, 0"},"green-dark":{name:"Green (dark)",hex:"#475826",pms:"PMS 574",cmyk_coated:"49, 22, 85, 58",cmyk_uncoated:"47, 25, 79, 42"}}},cyan:{label:"Cyan/Teal",colors:{"teal-dark":{name:"Teal (dark)",hex:"#008AA0",pms:"PMS 2231",cmyk_coated:"100, 0, 23, 25",cmyk_uncoated:"100, 8, 22, 19"},"cyan-light":{name:"Cyan (light)",hex:"#7AD1EF",pms:"PMS 2197",cmyk_coated:"47, 0, 3, 0",cmyk_uncoated:"50, 0, 2, 0"},"cyan-bright":{name:"Cyan (bright)",hex:"#00B3F0",pms:"PMS 2202",cmyk_coated:"91, 0, 0, 0",cmyk_uncoated:"90, 0, 0, 0"},cyan:{name:"Cyan",hex:"#006BA4",pms:"PMS 3015",cmyk_coated:"100, 32, 0, 25",cmyk_uncoated:"100, 42, 0, 21"},teal:{name:"Teal",hex:"#00ACC6",pms:"PMS 2229",cmyk_coated:"100, 0, 24, 0",cmyk_uncoated:"100, 0, 22, 0"}}},purple:{label:"Purple",colors:{"purple-dark":{name:"Purple (dark)",hex:"#5E0257",pms:"PMS 7652",cmyk_coated:"48, 99, 3, 46",cmyk_uncoated:"52, 88, 15, 35"},purple:{name:"Purple",hex:"#88177A",pms:"PMS 249",cmyk_coated:"43, 100, 0, 17",cmyk_uncoated:"43, 92, 8, 20"}}},gray:{label:"Gray",colors:{"gray-light":{name:"Gray (light)",hex:"#CBC8C4",pms:"PMS 400",cmyk_coated:"20, 17, 19, 0",cmyk_uncoated:"17, 16, 20, 1"},"gray-dark":{name:"Gray (dark)",hex:"#53595F",pms:"PMS 425",cmyk_coated:"63, 51, 45, 33",cmyk_uncoated:"46, 35, 32, 28"},"gray-medium":{name:"Gray (medium)",hex:"#6A625C",pms:"PMS 405",cmyk_coated:"49, 47, 51, 32",cmyk_uncoated:"43, 41, 45, 37"}}}}},fe=e=>G($(e)),et=e=>Ye($(e));function tt(e,t={}){return Object.fromEntries(Object.entries(e).map(([o,n])=>{const s=t[o]||{};return[o,{name:s.name||o,hex:fe(n),rgb:et(n),cmyk:s.cmyk||"--",pantone:s.pantone||"--"}]}))}const ot=["blue","green","orange","yellow","basic","gray","brown","purple"],nt=["purple.visited","purple.visited-hover","purple.visited-light","purple.visited-light-hover"];function at(){return ot.filter(e=>u.color[e])}function st(e,t){return!nt.includes(`${e}.${t}`)}function rt(e,t){const n=Object.entries(t).filter(([s])=>st(e,s));return Object.fromEntries(n)}function it([,e]){return Object.keys(e).length>0}function lt(){const e=at().map(t=>[t,rt(t,tt(u.color[t],Je[t]))]);return Object.fromEntries(e.filter(it))}const ke={colors:lt()};let k=document.getElementById("cl-colors-copy-announcer");k||(k=document.createElement("div"),k.id="cl-colors-copy-announcer",k.setAttribute("aria-live","polite"),Object.assign(k.style,{position:"absolute",width:"1px",height:"1px",overflow:"hidden",clip:"rect(0,0,0,0)",whiteSpace:"nowrap"}),document.body.appendChild(k));k.dataset.listenerAttached||(k.dataset.listenerAttached="true",document.addEventListener("text-copy-button:copied",e=>{if(!e.detail.button.closest(".cl-colors"))return;e.preventDefault();const t=e.detail.button;k.textContent="Copied!",clearTimeout(Number(t.dataset.copyTimeout)),t.classList.add("cl-colors__copy-btn--copied"),t.dataset.copyTimeout=setTimeout(()=>{t.classList.remove("cl-colors__copy-btn--copied"),k.textContent=""},1700)}));const ct={themes:u["component-themes"]},dt={themes:u["basic-themes"]},mt={globalThemes:u["global-themes"]},xe={themes:u["site-header-themes"]},Te=Object.keys(u["site-header-themes"]),ve={themes:u["site-footer-themes"]},Ce=Object.keys(u["site-footer-themes"]),X=["one","two","three","four","five","six","seven","eight"],K=["one","two","three","four","five","six","seven","eight"],ne=Object.keys(u["button-cta-themes"]),pt=Le(u["global-themes"]),V=u["global-themes"],ee=Object.keys(Object.values(V)[0].colors),I=["slot-six","slot-seven","slot-eight"],ht={one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9"},R=e=>{const t=e.replace("slot-","");return ht[t]||t},x=e=>`Slot ${R(e)}`,F={aaa:{id:"aaa",label:"AAA",symbol:"★",summary:"Passes AA and AAA for normal text."},aa:{id:"aa",label:"AA",symbol:"✓",summary:"Passes AA for normal text, large text, and non-text."},large:{id:"large",label:"AA large only",symbol:"◐",summary:"Passes AA for large text and non-text. Fails AA normal text."},fail:{id:"fail",label:"Fail",symbol:"✕",summary:"Below every WCAG 2.1 contrast threshold."}};function we(e){const t=Qe(e),o=n=>t.some(s=>s.id===n&&s.passes);return o("normal-aaa")?F.aaa:o("normal-aa")?F.aa:o("large-aa")?F.large:F.fail}const Se=e=>Object.fromEntries(Object.entries(e.colors).map(([t,o])=>[t,$(o)])),$e=e=>Object.fromEntries(Object.entries(e).filter(([,t])=>t));function Ae(e){const t=Object.keys(e);return t.flatMap((o,n)=>t.slice(n+1).map(s=>({slots:[o,s],ratio:L(e[o],e[s])})))}function ae(e){const t=Ae(e);return{total:t.length,thresholds:Ve().map(o=>({...o,passing:t.filter(n=>n.ratio>=o.minimum).length,isolated:Xe(e,o.minimum)}))}}function ut(e){const t=e.thresholds.filter(o=>!o.isolated.length);return t.length?t[t.length-1]:null}function gt(e,t){return Object.keys(e).filter(o=>o!==t).map(o=>({slot:o,ratio:L(e[t],e[o])})).sort((o,n)=>n.ratio-o.ratio)[0]}function Y(e){return`<span class="cl-contrast__chip" style="background:${G(e)};"></span>`}function Pe(e){const t=we(e);return`
    <td class="cl-contrast__cell cl-contrast__cell--${t.id}">
      <span class="cl-contrast__ratio">${oe(e)}<span class="visually-hidden"> to 1</span></span>
      <span class="cl-contrast__badge"><span aria-hidden="true">${t.symbol}</span> ${t.label}</span>
    </td>`}function _t(e,t,o){return t===o?`
      <td class="cl-contrast__cell cl-contrast__cell--self">
        <span aria-hidden="true">—</span>
        <span class="visually-hidden">Same color, not a pairing</span>
      </td>`:Pe(L(e[t],e[o]))}function Be(e,t){const o=Object.keys(e),n=o.map(a=>`
        <th scope="col" class="cl-contrast__head">
          ${Y(e[a])}
          <span>${x(a)}</span>
        </th>`).join(""),s=o.map(a=>`
        <tr>
          <th scope="row" class="cl-contrast__head">
            ${Y(e[a])}
            <span>${x(a)}</span>
            <span class="cl-contrast__hex">${G(e[a])}</span>
          </th>
          ${o.map(d=>_t(e,a,d)).join("")}
        </tr>`).join("");return`
    <div class="sb-table-scroll" role="region" aria-label="${t}" tabindex="0">
      <table class="cl-contrast__table">
        <caption class="visually-hidden">${t}</caption>
        <thead>
          <tr>
            <th scope="col" class="cl-contrast__head"><span class="visually-hidden">Slot</span></th>
            ${n}
          </tr>
        </thead>
        <tbody>${s}</tbody>
      </table>
    </div>`}const Me=e=>e.levels.map(t=>`${t.label} (${t.level})`).join(", ");function Oe(e){const t=ut(e),o=e.thresholds[e.thresholds.length-1];return t===o?{tone:"ok",text:`Every slot has at least one partner even at ${o.minimum}:1, the strictest WCAG minimum. Nothing here is stranded.`}:t?{tone:"ok",text:`Every slot has at least one partner up to ${t.minimum}:1. Above that some slots have none — see the table.`}:{tone:"warn",text:`Some slots have no partner at any WCAG minimum, not even ${e.thresholds[0].minimum}:1. See the table.`}}function bt(e){const{tone:t,text:o}=Oe(e);return`<p class="cl-contrast__notice cl-contrast__notice--${t}">
    <span aria-hidden="true">${t==="ok"?"✓":"!"}</span> ${o}
  </p>`}function yt(e,t){return t.isolated.length?t.isolated.map(o=>{const n=gt(e,o),s=n?` (best ${oe(n.ratio)}:1)`:"";return`${x(o)}${s}`}).join(", "):"None"}function He(e,t){if(!t.total)return'<p class="cl-contrast__notice">Enter at least two colors to compare.</p>';const o=t.thresholds.map(n=>`
        <tr>
          <th scope="row">${n.minimum}:1</th>
          <td>${Me(n)}</td>
          <td><strong>${n.passing}</strong> of ${t.total}</td>
          <td>${yt(e,n)}</td>
        </tr>`).join("");return`${bt(t)}
    <div class="sb-table-scroll" role="region" aria-label="Pairings meeting each WCAG minimum" tabindex="0">
      <table class="cl-contrast__table cl-contrast__table--summary">
        <thead>
          <tr>
            <th scope="col">Minimum</th>
            <th scope="col">Used for</th>
            <th scope="col">Pairings that pass</th>
            <th scope="col">Slots with no partner</th>
          </tr>
        </thead>
        <tbody>${o}</tbody>
      </table>
    </div>`}function Ne(){const e=N.map(o=>`
      <tr>
        <th scope="row">${o.label}</th>
        <td>${o.level}</td>
        <td>${o.minimum}:1</td>
        <td>SC ${o.criterion}</td>
      </tr>`).join("");return`
    <div class="cl-contrast__key">
      <h3>What the grid means</h3>
      <ul class="cl-contrast__legend">${Object.values(F).map(o=>`
      <li class="cl-contrast__legend-item">
        <span class="cl-contrast__badge cl-contrast__badge--${o.id}"><span aria-hidden="true">${o.symbol}</span> ${o.label}</span>
        ${o.summary}
      </li>`).join("")}</ul>
      <div class="sb-table-scroll" role="region" aria-label="WCAG 2.1 contrast thresholds" tabindex="0">
        <table class="cl-contrast__table cl-contrast__table--key">
          <caption>WCAG 2.1 contrast thresholds. Level A has no contrast criterion, so it is not listed.</caption>
          <thead>
            <tr>
              <th scope="col">Content</th>
              <th scope="col">Level</th>
              <th scope="col">Minimum</th>
              <th scope="col">Criterion</th>
            </tr>
          </thead>
          <tbody>${e}</tbody>
        </table>
      </div>
    </div>`}const le=Object.values(V).reduce((e,t)=>{const o=ae($e(Se(t))),n=o.thresholds.find(s=>s.minimum===be);return{passing:e.passing+n.passing,total:e.total+o.total}},{passing:0,total:0}),Et={title:"Tokens/Colors"},E=()=>qe(ke);E.tags=["!dev"];const J={print_colors:Ze},Q=ke.colors;function v(e,t){return Object.fromEntries(t.filter(o=>Q[e]?.[o]).map(o=>[`${e}-${o}`,{...Q[e][o],css_var:`--color-${e}-${o}`}]))}const Ge=Q.blue?.yale?{hex:Q.blue.yale.hex,css_var:"--color-blue-yale"}:null,A=()=>z({...J,yale_blue_web:Ge,section:"yale-blue"});A.storyName="Yale Blue";A.tags=["!dev"];const P=()=>z({...J,section:"core"});P.storyName="Core Colors";P.tags=["!dev"];const B=()=>z({...J,section:"accent-print"});B.storyName="Accent Colors for Print";B.tags=["!dev"];const ft={yale_blue_web:Ge,colors:{Yellow:v("yellow",["umbrella","yale-gold"]),Orange:v("orange",["peach","coral"]),Green:v("green",["fog","ground","basil","pine"]),Blue:v("blue",["soft","pewter","shale","light","medium","horizon","royal","deep-teal","mint","oceanic","soft-oceanic","ocean"]),Gray:{...v("gray",["100","200","300","400","500"]),...v("blue",["slate"]),...v("gray",["600","700","hale","800","900"])}}},M=()=>z({...ft,...J,section:"accent-web"});M.storyName="Accent Colors for Web";M.tags=["!dev"];const j=()=>`
  <div style="max-width: 1200px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <h1 style="color: #00356b; margin-bottom: 20px;">Component Color Slots Reference</h1>
    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
      This reference lists all components in the YaleSites Design System that support color theming through "dials" or "slots".
      These controls allow you to customize the visual appearance of components while maintaining accessibility standards.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #00356b; padding: 20px; margin-bottom: 30px;">
      <h3 style="margin-top: 0;">What are Color Slots?</h3>
      <p style="margin-bottom: 0; line-height: 1.6;">
        Color slots (also called "dials" or "themes") are predefined color combinations that have been tested for accessibility.
        Each slot typically includes coordinated colors for backgrounds, text, borders, and accents that work together harmoniously.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background-color: #00356b; color: white;">
          <th style="padding: 15px; text-align: left; font-weight: 600;">Component</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Available Color Slots</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Banner</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Controls background theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Button (CTA)</td>
          <td style="padding: 15px;">Multiple theme options</td>
          <td style="padding: 15px;">Varies by button type and context</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Callout</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Quick Links</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Pull Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Standalone Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Tabs</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Tab navigation theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Site Header</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Site Footer</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin-top: 30px;">
      <h3 style="margin-top: 0;">💡 Usage Tips</h3>
      <ul style="margin-bottom: 0; line-height: 1.8;">
        <li><strong>Global Theme:</strong> Set via the toolbar at the top of Storybook - affects overall site color palette</li>
        <li><strong>Component Themes:</strong> Individual "dial" settings for specific components</li>
        <li><strong>Accessibility:</strong> Contrast is not automatic. Only ${le.passing} of the ${le.total} global theme slot pairings clear the WCAG 2.1 AA ${be}:1 minimum for normal text — check a specific pairing in the Contrast Matrix story before relying on it</li>
        <li><strong>Consistency:</strong> Using the same slot numbers across components creates visual cohesion</li>
      </ul>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6;">
      <h2 style="color: #00356b; margin-bottom: 15px;">Exploring Color Options</h2>
      <p style="line-height: 1.6; margin-bottom: 15px;">
        To see these color slots in action, visit these stories:
      </p>
      <ul style="line-height: 1.8;">
        <li><strong>Component Theme Color Pairings:</strong> View all component themes side-by-side</li>
        <li><strong>Global Theme Color Pairings:</strong> See how components adapt to global theme changes</li>
        <li><strong>Color Basic Themes:</strong> Review accessibility-tested background color options</li>
      </ul>
    </div>
  </div>
`;j.tags=["!dev"];const q=()=>{const e=u["global-themes"],o=Object.keys(Object.values(e)[0].colors).filter(l=>!I.includes(l)),n=l=>`Slots ${l.map(R).join(", ")}`,s=(l,c)=>{const g=fe(c),_=R(l);return`
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div style="
          width:64px;height:64px;border-radius:8px;
          background:${c};
          border:1px solid rgba(0,0,0,0.1);
        "></div>
        <span style="font-size:11px;font-weight:600;color:#444;">Slot ${_}</span>
        <span style="font-size:11px;color:#666;font-family:monospace;">${g}</span>
      </div>`},a=(l,c,g,_,T,y=!1)=>{const p=c.map(r=>s(r,g[r])).join("");return`
      <div style="${y?"flex:0 0 auto;":"flex:1;min-width:0;"}">
        <div style="
          font-size:11px;font-weight:700;text-transform:uppercase;
          letter-spacing:0.06em;color:var(--color-gray-600);margin-bottom:8px;
        ">${l}</div>
        <div style="
          background:${_};border:1px solid ${T};
          border-radius:10px;padding:14px;
          display:flex;flex-wrap:wrap;gap:12px;
        ">
          ${p}
        </div>
      </div>`};return`
    <div style="padding:2rem;max-width:960px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      ${Object.entries(e).map(([l,c])=>{const g=a(`Theme Colors — ${n(o)}`,o,c.colors,"#f9fafb","#e5e7eb"),_=a(`Yale Brand Colors — ${n(I)}`,I,c.colors,"#f0f4ff","#c7d4f0",!0);return`
      <div style="margin-bottom:1.5rem;padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="margin:0 0 1.25rem;font-size:1.35rem;font-weight:700;color:#111;">
          ${l.charAt(0).toUpperCase()+l.slice(1)}: ${c.label}
        </h2>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
          ${g}
          ${_}
        </div>
      </div>`}).join("")}
    </div>`};q.tags=["!dev"];const D=()=>`
  <h2>These pairings are selected to support accessibility standards.</h2>
  <p>This page is useful to check the accessibility of various components against the available background colors.</p>

  ${je(dt)}
`;D.tags=["!dev"];const C=({heading:e,description:t,image:o,calloutTheme:n,ctaButtonTheme:s,qlTheme:a,quoteTheme:d,standaloneQuoteTheme:l,tabTheme:c,bannerTheme:g,primaryNavPosition:_,menuVariation:T,siteHeaderImage:y,siteHeaderSiteNameImage:p,siteHeaderTwig:r,siteHeaderTheme:i,siteFooterTheme:h,siteHeaderAccent:f,siteFooterAccent:b,siteFooterVariation:m})=>De({...ue.responsive_images["16x9"],...ge,..._e,...r,...xe,...ve,...ct,...W,...U,...X,...K,...ne,site_header__site_name:"Department of Chemistry",site_header__site_link:"/",site_header__border_thickness:"8",site_header__nav_position:_,site_header__menu__variation:T,site_header__theme:i,site_header__background_image:y,site_header__branding_link:"https://www.yale.edu",site_header__site_name_image:p?me:!1,site_header__accent:f,utility_nav__items:W.items,primary_nav__items:U.items,quick_links__heading:e,quick_links__description:t,quick_links__image:o,quick_links__background_color:a,callout__background_color:n,cta_button__component_theme:s,quick_links__links:he.quick_links__links,tabs__theme:c,banner__content__background:g,pull_quote__accent_theme:d,standalone_quote__accent_theme:l,site_footer__theme:h,site_footer__accent:b,site_footer__variation:m});C.argTypes={primaryNavPosition:{name:"Header: Navigation Position",options:["left","center","right"],type:"select"},menuVariation:{name:"Header: Menu Variation",options:["basic","mega","focus"],type:"select"},siteHeaderTheme:{name:"Header: Theme (dial)",options:Te,type:"select"},siteHeaderAccent:{name:"Header: Accent Color (dial)",options:X,type:"select"},siteHeaderImage:{name:"Header: With image",type:"boolean"},siteHeaderSiteNameImage:{name:"Header: Site Name is an Image",type:"boolean"},bannerTheme:{name:"Banner Theme (dial)",type:"select",options:["one","two","three"]},ctaButtonTheme:{name:"Button CTA Theme (dial)",type:"select",options:ne},qlTheme:{name:"Quick Links Theme (dial)",type:"select",options:["one","two","three"]},quoteTheme:{name:"Quote Theme (dial)",type:"select",options:["one","two","three"]},standaloneQuoteTheme:{name:"Standalone Quote Theme (dial)",type:"select",options:["one","two","three"]},calloutTheme:{name:"Callout Theme (dial)",type:"select",options:["one","two","three"]},tabTheme:{name:"Tabs Theme (dial)",type:"select",options:["one","two","three"]},siteFooterTheme:{name:"Footer: Theme (dial)",options:Ce,type:"select"},siteFooterAccent:{name:"Footer: Accent Color (dial)",options:K,type:"select"},siteFooterVariation:{name:"Footer: Variation (dial)",options:["basic","mega"],type:"select"}};C.args={primaryNavPosition:"left",menuVariation:"basic",siteHeaderTheme:"one",siteHeaderAccent:"one",siteHeaderImage:!1,siteHeaderSiteNameImage:!1,bannerTheme:"one",ctaButtonTheme:"one",qlTheme:"one",quoteTheme:"one",standaloneQuoteTheme:"one",calloutTheme:"one",tabTheme:"one",siteFooterTheme:"one",siteFooterAccent:"one",siteFooterVariation:"basic"};C.tags=["!dev"];const w=({heading:e,description:t,image:o,globalTheme:n,calloutTheme:s,ctaButtonTheme:a,qlTheme:d,quoteTheme:l,standaloneQuoteTheme:c,tabTheme:g,bannerTheme:_,primaryNavPosition:T,menuVariation:y,siteHeaderTwig:p,siteHeaderTheme:r,siteHeaderAccent:i,siteHeaderImage:h,siteHeaderSiteNameImage:f,siteFooterTheme:b,siteFooterAccent:m,siteFooterVariation:Ee})=>Ie({...ue.responsive_images["16x9"],...mt,...Re,...ge,..._e,...p,...xe,...ve,...W,...U,...X,...K,site_global__theme:n,site_header__site_name:"Department of Chemistry",site_header__site_link:"/",site_header__border_thickness:"8",site_header__nav_position:T,site_header__menu__variation:y,site_header__theme:r,site_header__background_image:h,site_header__branding_link:"https://www.yale.edu",site_header__site_name_image:f?me:!1,site_header__accent:i,utility_nav__items:W.items,primary_nav__items:U.items,quick_links__heading:e,quick_links__description:t,quick_links__image:o,quick_links__background_color:d,callout__background_color:s,cta_button__component_theme:a,quick_links__links:he.quick_links__links,tabs__theme:g,banner__content__background:_,pull_quote__accent_theme:l,standalone_quote__accent_theme:c,site_footer__theme:b,site_footer__accent:m,site_footer__variation:Ee});w.argTypes={globalTheme:{name:"Site: Global Theme (lever)",options:pt,type:"select"},primaryNavPosition:{name:"Header: Navigation Position",options:["left","center","right"],type:"select"},menuVariation:{name:"Header: Menu Variation",options:["basic","mega","focus"],type:"select"},siteHeaderTheme:{name:"Header: Theme (dial)",options:Te,type:"select"},siteHeaderAccent:{name:"Header: Accent Color (dial)",options:X,type:"select"},siteHeaderImage:{name:"Header: With Image",type:"boolean"},siteHeaderSiteNameImage:{name:"Header: Site Name Is An Image",type:"boolean"},bannerTheme:{name:"Banner Theme (dial)",type:"select",options:["one","two","three"]},ctaButtonTheme:{name:"Button CTA Theme (dial)",type:"select",options:ne},qlTheme:{name:"Quick Links Theme (dial)",type:"select",options:["one","two","three"]},quoteTheme:{name:"Quote Theme (dial)",type:"select",options:["one","two","three"]},standaloneQuoteTheme:{name:"Standalone Quote Theme (dial)",type:"select",options:["one","two","three"]},calloutTheme:{name:"Callout Theme (dial)",type:"select",options:["one","two","three"]},tabTheme:{name:"Tabs Theme (dial)",type:"select",options:["one","two","three"]},siteFooterTheme:{name:"Footer: Theme (dial)",options:Ce,type:"select"},siteFooterAccent:{name:"Footer: Accent Color (dial)",options:K,type:"select"},siteFooterVariation:{name:"Footer: Variation (dial)",options:["basic","mega"],type:"select"}};w.tags=["!dev"];w.args={globalTheme:"one",primaryNavPosition:"left",menuVariation:"basic",siteHeaderTheme:"one",siteHeaderAccent:"one",siteHeaderImage:!1,siteHeaderSiteNameImage:!1,bannerTheme:"one",ctaButtonTheme:"one",qlTheme:"one",quoteTheme:"one",standaloneQuoteTheme:"one",calloutTheme:"one",tabTheme:"one",siteFooterTheme:"one",siteFooterAccent:"one",siteFooterVariation:"basic"};function Fe(e){const t=Object.entries(V).map(([o,n])=>`
        <section class="cl-contrast__theme">
          <h3 class="cl-contrast__theme-title">
            ${o.charAt(0).toUpperCase()+o.slice(1)}: ${n.label}
          </h3>
          ${e(o,n)}
        </section>`).join("");return`
    <div class="cl-contrast">
      ${Ne()}
      ${t}
    </div>`}const O=()=>Fe((e,t)=>{const o=$e(Se(t)),n=`Contrast ratios between every color slot in the ${t.label} theme`;return`
          ${He(o,ae(o))}
          ${Be(o,n)}`});O.storyName="Contrast Matrix";O.tags=["!dev"];const kt=Object.keys(ye),te=Object.keys(u["component-themes"]),ce=Object.fromEntries(te.map(e=>[e,$(u["component-themes"][e].background)]));function xt(e,t){const o=Ke(e,V),n=te.map(a=>`
        <th scope="col" class="cl-contrast__head">
          ${Y(ce[a])}
          <span>Block ${R(a)}</span>
        </th>`).join(""),s=kt.map(a=>{const d=ye[a],l=$(o[d.content]);return`
        <tr>
          <th scope="row" class="cl-contrast__head">
            ${Y($(o[d.background]))}
            <span>Section ${R(a)}</span>
            <span class="cl-contrast__hex">${G(l)} text</span>
          </th>
          ${te.map(c=>Pe(L(l,ce[c]))).join("")}
        </tr>`}).join("");return`
    <div class="sb-table-scroll" role="region" aria-label="${t}" tabindex="0">
      <table class="cl-contrast__table">
        <caption class="visually-hidden">${t}</caption>
        <thead>
          <tr>
            <th scope="col" class="cl-contrast__head">
              <span class="visually-hidden">Section theme</span>
            </th>
            ${n}
          </tr>
        </thead>
        <tbody>${s}</tbody>
      </table>
    </div>`}const H=()=>Fe((e,t)=>xt(e,`Contrast between each section theme's text color and each block theme's background, in the ${t.label} theme`));H.storyName="Nested Contrast Matrix";H.tags=["!dev"];const de="Enter a 3- or 6-digit hex color, for example #00356b.",Tt=()=>{const e=document.createElement("div");e.className="cl-contrast";const t=Object.values(V)[0].colors,o=r=>{const i=`cl-contrast-input-${r}`,h=G($(t[r]));return I.includes(r)?`
        <div class="form-item cl-contrast__field cl-contrast__field--static">
          <label class="form-item__label" for="${i}">${x(r)} color</label>
          <input
            class="form-item__textfield"
            type="text"
            id="${i}"
            data-slot="${r}"
            value="${h}"
            readonly
            aria-describedby="${i}-hint"
          />
          <p class="cl-contrast__field-hint" id="${i}-hint">Fixed Yale brand color — not editable.</p>
        </div>`:`
      <div class="form-item cl-contrast__field">
        <label class="form-item__label" for="${i}">${x(r)} color</label>
        <input
          class="form-item__textfield"
          type="text"
          id="${i}"
          data-slot="${r}"
          value="${h}"
          placeholder="#000000"
          maxlength="7"
          spellcheck="false"
          autocomplete="off"
          aria-describedby="${i}-error"
        />
        <p class="form-item__error-text" id="${i}-error"></p>
      </div>`},n=ee.findIndex(r=>I.includes(r)),a=[ee.slice(0,n),ee.slice(n)].map(r=>`<div class="cl-contrast__fields">${r.map(o).join("")}</div>`).join("");e.innerHTML=`
    ${Ne()}
    <form class="cl-contrast__form">
      <fieldset>
        <legend>Colors to check</legend>
        <p class="cl-contrast__form-hint">
          Type a hex color into any editable field to see how your palette
          scores against your colors and Yale's fixed brand colors. ${de}
          Leave an editable field empty to leave that slot out. Slots six,
          seven and eight are Yale's brand colors and cannot be edited.
        </p>
        ${a}
      </fieldset>
    </form>
    <div class="cl-contrast__results"></div>
    <button type="button" class="cl-contrast__download">
      Download these results as a text file
    </button>
    <p class="cl-contrast__download-hint">
      A plain-text summary of the colors, the coverage table and every pairing —
      for sending to someone who is not looking at this page.
    </p>
    <p class="visually-hidden" aria-live="polite"></p>`;const d=e.querySelector(".cl-contrast__results"),l=e.querySelector("[aria-live]"),c=e.querySelector(".cl-contrast__download"),g=Array.from(e.querySelectorAll("input[data-slot]")),_=()=>{const r={};return g.forEach(i=>{if(i.readOnly){r[i.dataset.slot]=re(i.value);return}const h=i.value.trim(),f=re(h),b=h!==""&&!f;i.setAttribute("aria-invalid",String(b)),i.classList.toggle("form-item__textfield--error",b),e.querySelector(`#${i.id}-error`).textContent=b?de:"",f&&(r[i.dataset.slot]=f)}),r},T=()=>{const r=_(),i=ae(r);return d.innerHTML=`
      ${He(r,i)}
      ${i.total?Be(r,"Contrast ratios between every color you entered"):""}`,c.disabled=!i.total,{palette:r,stats:i}};let{palette:y,stats:p}=T();return e.addEventListener("input",()=>{({palette:y,stats:p}=T())}),e.addEventListener("change",()=>{if(!p.total){l.textContent="Enter at least two colors to compare.";return}const r=p.thresholds.map(h=>`${h.passing} of ${p.total} at ${h.minimum}:1`).join(". "),i=p.total===1?"pairing":"pairings";l.textContent=`${p.total} ${i} compared. ${r}. ${Oe(p).text}`}),c.addEventListener("click",()=>{const r=new Date().toISOString().slice(0,10),i=ze({generatedOn:r,colors:Object.keys(y).map(m=>({label:x(m),hex:G(y[m])})),thresholds:p.thresholds.map(m=>({minimum:m.minimum,usedFor:Me(m),passing:m.passing,total:p.total,isolated:m.isolated.map(x)})),pairs:Ae(y).map(m=>({a:x(m.slots[0]),b:x(m.slots[1]),ratio:m.ratio,verdict:we(m.ratio).label}))}),h=`yalesites-contrast-check-${r}.txt`,f=URL.createObjectURL(new Blob([i],{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=f,b.download=h,b.click(),setTimeout(()=>URL.revokeObjectURL(f),0),l.textContent=`Downloaded ${h}.`}),e},vt=({build:e})=>{const t=se.useRef(null);return se.useEffect(()=>{const o=t.current;return o.replaceChildren(e()),()=>o.replaceChildren()},[e]),pe.createElement("div",{ref:t})},S=()=>pe.createElement(vt,{build:Tt});S.storyName="Custom Palette Contrast Checker";S.tags=["!dev"];S.__docgenInfo={description:"",methods:[],displayName:"CustomPaletteContrastChecker"};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:"() => colorsTwig(colorsData)",...E.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => webColorsTwig({
  ...printData,
  yale_blue_web: yaleBlueWeb,
  section: 'yale-blue'
})`,...A.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => webColorsTwig({
  ...printData,
  section: 'core'
})`,...P.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => webColorsTwig({
  ...printData,
  section: 'accent-print'
})`,...B.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => webColorsTwig({
  ...accentWebColors,
  ...printData,
  section: 'accent-web'
})`,...M.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => \`
  <div style="max-width: 1200px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <h1 style="color: #00356b; margin-bottom: 20px;">Component Color Slots Reference</h1>
    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
      This reference lists all components in the YaleSites Design System that support color theming through "dials" or "slots".
      These controls allow you to customize the visual appearance of components while maintaining accessibility standards.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #00356b; padding: 20px; margin-bottom: 30px;">
      <h3 style="margin-top: 0;">What are Color Slots?</h3>
      <p style="margin-bottom: 0; line-height: 1.6;">
        Color slots (also called "dials" or "themes") are predefined color combinations that have been tested for accessibility.
        Each slot typically includes coordinated colors for backgrounds, text, borders, and accents that work together harmoniously.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background-color: #00356b; color: white;">
          <th style="padding: 15px; text-align: left; font-weight: 600;">Component</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Available Color Slots</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Banner</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Controls background theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Button (CTA)</td>
          <td style="padding: 15px;">Multiple theme options</td>
          <td style="padding: 15px;">Varies by button type and context</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Callout</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Quick Links</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Pull Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Standalone Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Tabs</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Tab navigation theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Site Header</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Site Footer</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin-top: 30px;">
      <h3 style="margin-top: 0;">💡 Usage Tips</h3>
      <ul style="margin-bottom: 0; line-height: 1.8;">
        <li><strong>Global Theme:</strong> Set via the toolbar at the top of Storybook - affects overall site color palette</li>
        <li><strong>Component Themes:</strong> Individual "dial" settings for specific components</li>
        <li><strong>Accessibility:</strong> Contrast is not automatic. Only \${globalThemeContrastTotals.passing} of the \${globalThemeContrastTotals.total} global theme slot pairings clear the WCAG 2.1 AA \${AA_NORMAL_TEXT}:1 minimum for normal text — check a specific pairing in the Contrast Matrix story before relying on it</li>
        <li><strong>Consistency:</strong> Using the same slot numbers across components creates visual cohesion</li>
      </ul>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6;">
      <h2 style="color: #00356b; margin-bottom: 15px;">Exploring Color Options</h2>
      <p style="line-height: 1.6; margin-bottom: 15px;">
        To see these color slots in action, visit these stories:
      </p>
      <ul style="line-height: 1.8;">
        <li><strong>Component Theme Color Pairings:</strong> View all component themes side-by-side</li>
        <li><strong>Global Theme Color Pairings:</strong> See how components adapt to global theme changes</li>
        <li><strong>Color Basic Themes:</strong> Review accessibility-tested background color options</li>
      </ul>
    </div>
  </div>
\``,...j.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const themes = tokens['global-themes'];
  const themeSlots = Object.keys(Object.values(themes)[0].colors);
  const themeColorSlots = themeSlots.filter(s => !BRAND_SLOTS.includes(s));

  // Headings list the slots actually rendered. The previous hardcoded
  // "Slots 1–5" heading sat above six swatches, because slot-nine is a theme
  // color slot too.
  const slotsHeading = slots => \`Slots \${slots.map(slotNumber).join(', ')}\`;
  const renderSwatch = (slot, hsl) => {
    const hex = hslToHex(hsl);
    const num = slotNumber(slot);
    return \`
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div style="
          width:64px;height:64px;border-radius:8px;
          background:\${hsl};
          border:1px solid rgba(0,0,0,0.1);
        "></div>
        <span style="font-size:11px;font-weight:600;color:#444;">Slot \${num}</span>
        <span style="font-size:11px;color:#666;font-family:monospace;">\${hex}</span>
      </div>\`;
  };
  const renderGroup = (label, slots, colors, bgColor, borderColor, shrink = false) => {
    const swatches = slots.map(slot => renderSwatch(slot, colors[slot])).join('');
    return \`
      <div style="\${shrink ? 'flex:0 0 auto;' : 'flex:1;min-width:0;'}">
        <div style="
          font-size:11px;font-weight:700;text-transform:uppercase;
          letter-spacing:0.06em;color:var(--color-gray-600);margin-bottom:8px;
        ">\${label}</div>
        <div style="
          background:\${bgColor};border:1px solid \${borderColor};
          border-radius:10px;padding:14px;
          display:flex;flex-wrap:wrap;gap:12px;
        ">
          \${swatches}
        </div>
      </div>\`;
  };
  const themeCards = Object.entries(themes).map(([key, theme]) => {
    const themeGroup = renderGroup(\`Theme Colors — \${slotsHeading(themeColorSlots)}\`, themeColorSlots, theme.colors, '#f9fafb', '#e5e7eb');
    const brandGroup = renderGroup(\`Yale Brand Colors — \${slotsHeading(BRAND_SLOTS)}\`, BRAND_SLOTS, theme.colors, '#f0f4ff', '#c7d4f0', true);
    return \`
      <div style="margin-bottom:1.5rem;padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="margin:0 0 1.25rem;font-size:1.35rem;font-weight:700;color:#111;">
          \${key.charAt(0).toUpperCase() + key.slice(1)}: \${theme.label}
        </h2>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
          \${themeGroup}
          \${brandGroup}
        </div>
      </div>\`;
  }).join('');
  return \`
    <div style="padding:2rem;max-width:960px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      \${themeCards}
    </div>\`;
}`,...q.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => \`
  <h2>These pairings are selected to support accessibility standards.</h2>
  <p>This page is useful to check the accessibility of various components against the available background colors.</p>

  \${colorBasicThemesTwig(colorBasicThemeData)}
\``,...D.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`({
  heading,
  description,
  image,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderTwig,
  siteHeaderTheme,
  siteFooterTheme,
  siteHeaderAccent,
  siteFooterAccent,
  siteFooterVariation
}) => colorComponentThemeTwig({
  ...imageData.responsive_images['16x9'],
  ...tabData,
  ...bannerData,
  ...siteHeaderTwig,
  ...siteHeaderThemes,
  ...siteFooterThemes,
  ...colorComponentThemeData,
  ...utilityNavData,
  ...primaryNavData,
  ...siteHeaderAccents,
  ...siteFooterAccents,
  ...ctaButtonThemeOptions,
  site_header__site_name: 'Department of Chemistry',
  site_header__site_link: '/',
  site_header__border_thickness: '8',
  site_header__nav_position: primaryNavPosition,
  site_header__menu__variation: menuVariation,
  site_header__theme: siteHeaderTheme,
  site_header__background_image: siteHeaderImage,
  site_header__branding_link: 'https://www.yale.edu',
  site_header__site_name_image: siteHeaderSiteNameImage ? exampleSiteNameImageSvg : false,
  site_header__accent: siteHeaderAccent,
  utility_nav__items: utilityNavData.items,
  primary_nav__items: primaryNavData.items,
  quick_links__heading: heading,
  quick_links__description: description,
  quick_links__image: image,
  quick_links__background_color: qlTheme,
  callout__background_color: calloutTheme,
  cta_button__component_theme: ctaButtonTheme,
  quick_links__links: quickLinksData.quick_links__links,
  tabs__theme: tabTheme,
  banner__content__background: bannerTheme,
  pull_quote__accent_theme: quoteTheme,
  standalone_quote__accent_theme: standaloneQuoteTheme,
  site_footer__theme: siteFooterTheme,
  site_footer__accent: siteFooterAccent,
  site_footer__variation: siteFooterVariation
})`,...C.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`({
  heading,
  description,
  image,
  globalTheme,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderTwig,
  siteHeaderTheme,
  siteHeaderAccent,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteFooterTheme,
  siteFooterAccent,
  siteFooterVariation
}) => colorGlobalThemePairingTwig({
  ...imageData.responsive_images['16x9'],
  ...colorGlobalThemeData,
  ...colorGlobalThemeTwig,
  ...tabData,
  ...bannerData,
  ...siteHeaderTwig,
  ...siteHeaderThemes,
  ...siteFooterThemes,
  ...utilityNavData,
  ...primaryNavData,
  ...siteHeaderAccents,
  ...siteFooterAccents,
  site_global__theme: globalTheme,
  site_header__site_name: 'Department of Chemistry',
  site_header__site_link: '/',
  site_header__border_thickness: '8',
  site_header__nav_position: primaryNavPosition,
  site_header__menu__variation: menuVariation,
  site_header__theme: siteHeaderTheme,
  site_header__background_image: siteHeaderImage,
  site_header__branding_link: 'https://www.yale.edu',
  site_header__site_name_image: siteHeaderSiteNameImage ? exampleSiteNameImageSvg : false,
  site_header__accent: siteHeaderAccent,
  utility_nav__items: utilityNavData.items,
  primary_nav__items: primaryNavData.items,
  quick_links__heading: heading,
  quick_links__description: description,
  quick_links__image: image,
  quick_links__background_color: qlTheme,
  callout__background_color: calloutTheme,
  cta_button__component_theme: ctaButtonTheme,
  quick_links__links: quickLinksData.quick_links__links,
  tabs__theme: tabTheme,
  banner__content__background: bannerTheme,
  pull_quote__accent_theme: quoteTheme,
  standalone_quote__accent_theme: standaloneQuoteTheme,
  site_footer__theme: siteFooterTheme,
  site_footer__accent: siteFooterAccent,
  site_footer__variation: siteFooterVariation
})`,...w.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:"() => renderThemeGrid((key, theme) => {\n  const palette = usablePalette(themePalette(theme));\n  const caption = `Contrast ratios between every color slot in the ${theme.label} theme`;\n  return `\n          ${renderPaletteSummary(palette, paletteStats(palette))}\n          ${renderMatrixTable(palette, caption)}`;\n})",...O.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:"() => renderThemeGrid((key, theme) => renderNestedTable(key, `Contrast between each section theme's text color and each block ` + `theme's background, in the ${theme.label} theme`))",...H.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => React.createElement(MountedDom, {
  build: buildCustomPaletteContrastChecker
})`,...S.parameters?.docs?.source}}};const jt=["Colors","YaleBlue","CoreColors","AccentPrint","AccentWeb","ComponentColorSlots","ColorGlobalThemes","ColorBasicThemes","ComponentThemeColorPairings","GlobalThemeColorPairings","ThemeContrastMatrix","NestedSurfaceContrastMatrix","CustomPaletteContrastChecker"];export{B as AccentPrint,M as AccentWeb,D as ColorBasicThemes,q as ColorGlobalThemes,E as Colors,j as ComponentColorSlots,C as ComponentThemeColorPairings,P as CoreColors,S as CustomPaletteContrastChecker,w as GlobalThemeColorPairings,H as NestedSurfaceContrastMatrix,O as ThemeContrastMatrix,A as YaleBlue,jt as __namedExportsOrder,Et as default};
//# sourceMappingURL=colors.stories-vu1IjDC_.js.map
