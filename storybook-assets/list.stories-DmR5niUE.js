import{w as c,u as d,v as _}from"../iframe.js";import{b as m,l as o,a as p}from"./categories-list-4ZYIRA_k.js";import{t as u,a as g}from"./component-props-De-d7Djp.js";const n={listItems:{twigProp:"list__items",name:"List Items",type:"array",required:!0,description:"Array of list item objects to render",detail:`Array of objects passed to the Twig template. Each item should have list__item__content for the item text. This prop is constructed in the story's render function and is not directly editable via the Controls panel.
`},listType:{twigProp:"list__type",name:"List Type",type:"select",required:!1,description:"HTML list element type (ul for unordered, ol for ordered)",default:"ul",options:["ul","ol"],control:"select"},sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}}},y={title:"Atoms/Lists",tags:["!dev"],argTypes:g(n),args:u(n),parameters:{docs:{description:{component:"Storybook Definition."}}}},t=({sectionTheme:e,listType:l})=>`
  <div class="yds-layout" data-section-theme="${e}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>${l==="ul"?"Unordered":"Ordered"} List</h3>
        <div class="text-field">
          ${d({list__items:l==="ul"?o.unordered__list__items:o.ordered__list__items,list__type:l})}
        </div>

        <h3>Tags List</h3>
        ${_(p)}

        <h3>Categories List</h3>
        ${c(m)}
      </div>
    </div>
  </div>
`,s=()=>`
  <div class="text-field">
    ${d({list__items:o.unordered__list__items})}
  </div>
`,i=()=>`
<div class="text-field">
  ${d({list__items:o.ordered__list__items,list__type:"ol"})}
</div>
`,r=e=>_({...p,...e}),a=e=>c({...m,...e});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  sectionTheme,
  listType
}) => \`
  <div class="yds-layout" data-section-theme="\${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>\${listType === 'ul' ? 'Unordered' : 'Ordered'} List</h3>
        <div class="text-field">
          \${listTwig({
  list__items: listType === 'ul' ? listData.unordered__list__items : listData.ordered__list__items,
  list__type: listType
})}
        </div>

        <h3>Tags List</h3>
        \${listTagsTwig(listTagsData)}

        <h3>Categories List</h3>
        \${listCategoriesTwig(listCategoriesData)}
      </div>
    </div>
  </div>
\``,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => \`
  <div class="text-field">
    \${listTwig({
  list__items: listData.unordered__list__items
})}
  </div>
\``,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => \`
<div class="text-field">
  \${listTwig({
  list__items: listData.ordered__list__items,
  list__type: 'ol'
})}
</div>
\``,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => listTagsTwig({
  ...listTagsData,
  ...args
})`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => listCategoriesTwig({
  ...listCategoriesData,
  ...args
})`,...a.parameters?.docs?.source}}};const T=["Interactive","UnorderedList","OrderedList","TagsList","CategoriesList"],w=Object.freeze(Object.defineProperty({__proto__:null,CategoriesList:a,Interactive:t,OrderedList:i,TagsList:r,UnorderedList:s,__namedExportsOrder:T,default:y},Symbol.toStringTag,{value:"Module"}));export{t as I,w as L,n as c};
//# sourceMappingURL=list.stories-DmR5niUE.js.map
