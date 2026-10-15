import{s as o}from"./related-content-Ds55UXo3.js";import{t as s,a as l}from"./component-props-De-d7Djp.js";import{a1 as d}from"../iframe.js";const n={heading:{twigProp:"related_content__heading",name:"Heading",type:"string",required:!1,description:'Heading shown above the related content list. Defaults to "Related Content".',default:"Related Content",control:"text"},itemCount:{twigProp:"related_content__view",name:"Number of Items",type:"number",required:!1,description:'Storybook-only control. Generates that many sample rows of "Type — Title" markup matching what the embedded view emits in Drupal.',default:4,control:{type:"number",min:0,max:6,step:1}}},i=r=>{const a=o.related_content__sample_items.slice(0,r);return a.length?`<div class="js-view-dom-id-storybook">${a.map(e=>`
      <article class="related-card">
        <p class="related-card__eyebrow">${e.category?`${e.type.toUpperCase()}<span class="related-card__eyebrow-separator" aria-hidden="true"> | </span><span class="related-card__category">${e.category.toUpperCase()}</span>`:e.type.toUpperCase()}</p>
        <h3 class="related-card__title">
          <a href="${e.url}">${e.title}</a>
        </h3>
      </article>`).join(`
`)}</div>`:""},c={title:"Molecules/Related Content",tags:["!dev"],argTypes:l(n),args:{...s(n),heading:o.related_content__heading,itemCount:6},parameters:{docs:{description:{component:"Storybook Definition."}}}},t=({heading:r,itemCount:a})=>d({related_content__heading:r,related_content__view:i(a)});t.storyName="Related Content";t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  heading,
  itemCount
}) => relatedContentTwig({
  related_content__heading: heading,
  related_content__view: buildSampleViewHtml(itemCount)
})`,...t.parameters?.docs?.source}}};const p=["RelatedContent"],h=Object.freeze(Object.defineProperty({__proto__:null,RelatedContent:t,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{h as R,t as a,n as c};
//# sourceMappingURL=related-content.stories-qlY8t0ri.js.map
