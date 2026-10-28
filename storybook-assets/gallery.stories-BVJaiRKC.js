import{ak as d}from"../iframe.js";import{m as r}from"./media-grid-XjaELNhJ.js";import"./yds-media-grid-interactive-3TBB8IX5.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const s={title:"Organisms/Galleries",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{gridHeading:{name:"Gallery heading",type:"string"}},args:{gridHeading:r.media_grid__heading}},a=({gridHeading:i})=>d({...r,media_grid__heading:i}),e=({gridHeading:i})=>`
  ${d({...r,media_grid__variation:"interactive",media_grid__heading:i})}
  ${d({...r,media_grid__variation:"interactive",media_grid__heading:i})}
`;a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  gridHeading
}) => {
  return mediaGridTwig({
    ...mediaGridData,
    media_grid__heading: gridHeading
  });
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  gridHeading
}) => \`
  \${mediaGridTwig({
  ...mediaGridData,
  media_grid__variation: 'interactive',
  media_grid__heading: gridHeading
})}
  \${mediaGridTwig({
  ...mediaGridData,
  media_grid__variation: 'interactive',
  media_grid__heading: gridHeading
})}
\``,...e.parameters?.docs?.source}}};const _=["ImageGrid","InteractiveGrid"];export{a as ImageGrid,e as InteractiveGrid,_ as __namedExportsOrder,s as default};
//# sourceMappingURL=gallery.stories-BVJaiRKC.js.map
