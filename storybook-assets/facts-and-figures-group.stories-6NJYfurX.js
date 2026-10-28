import{aj as h,t as y}from"../iframe.js";import{f as n}from"./facts-and-figures-group-BzGzpGy8.js";import{f as i}from"./facts-and-figures-icons-DGGA7p6m.js";import{i as b}from"./image-CSdbOboU.js";import{t as F,a as w}from"./component-props-De-d7Djp.js";const u={themeColor:{twigProp:"facts_and_figures__group__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Color theme applied to the facts and figures group",detail:`Applies a color theme to the component. Options are derived from the component-themes design tokens. Maps to facts_and_figures__group__theme.
`,default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},factsAndFiguresGroupHeading:{twigProp:"facts_and_figures__group__heading",name:"Infographic Group Heading",type:"string",required:!1,description:"Optional heading displayed above the facts and figures group",control:"text"},factsAndFiguresGroupContent:{twigProp:"facts_and_figures__group__content",name:"Infographic Group Content",type:"string",required:!1,description:"Optional introductory content text for the group",control:"text"},image:{twigProp:"facts_and_figures__group__bg_image",name:"With image",type:"boolean",required:!1,description:"Display a background image behind the statistics",default:!1,control:"boolean"},presentationStyle:{twigProp:"facts_and_figures__group__presentation_style",name:"Presentation Style",type:"select",required:!1,description:"Visual style controlling whether items display with or without a line",default:"basic",options:{"With line":"basic","Without line":"icon-only"},control:"select"},columnCount:{twigProp:"facts_and_figures__group__grid_count",name:"Columns",type:"select",required:!1,description:"Number of columns in the grid layout",default:"four",options:["two","three","four"],control:"select",labels:{two:"Two",three:"Three",four:"Four"}},alignment:{twigProp:"facts_and_figures__group__alignment",name:"Alignment",type:"select",required:!1,description:"Text alignment for fact items",default:"center",options:["left","center"],control:"select",labels:{left:"Left",center:"Center"}},iconName:{twigProp:"facts_and_figures__icon_name",name:"Icon",type:"select",required:!1,description:"Icon to display on each fact item (overrides individual item icons in story)",detail:`Selects an icon from the facts-and-figures-icons.yml registry. Options are built dynamically from that file. The '- None -' option disables icons. Maps to facts_and_figures__icon_name on each individual item.
`,control:"select"}},G=Object.keys(y["component-themes"]),g={"- None -":"- None -"};i.icons&&typeof i.icons=="object"&&Object.entries(i.icons).forEach(([o,a])=>{g[a]=o});const t=w(u);t.themeColor={...t.themeColor,options:G};t.iconName={...t.iconName,options:g};const A={title:"Organisms/Facts and Figures Group",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:t,args:{...F(u),factsAndFiguresGroupHeading:n.facts_and_figures__group__heading,factsAndFiguresGroupContent:n.facts_and_figures__group__content,columnCount:"three",alignment:"left",image:!0,iconName:"- None -"}},e=({factsAndFiguresGroupHeading:o,factsAndFiguresGroupContent:a,presentationStyle:_,columnCount:f,alignment:c,themeColor:p,image:l,iconName:s})=>{const r=s&&s!=="- None -",d={...n,facts_and_figures__group:n.facts_and_figures__group.map(m=>({...m,facts_and_figures__has_icon:r?"true":"false",facts_and_figures__icon_name:r?s:null,facts_and_figures__presentation_style:_,facts_and_figures__alignment:c}))};return`
    <div class="wrap-for-global-theme">
      ${h({facts_and_figures__group__heading:o,facts_and_figures__group__content:a,facts_and_figures__group__has_icon:r?"true":"false",facts_and_figures__group__grid_count:f,facts_and_figures__group__alignment:c,facts_and_figures__group__presentation_style:_,facts_and_figures__group__theme:p,facts_and_figures__group__bg_image:l,...d,...b.responsive_images["16x9"]})}
    </div>
    `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  factsAndFiguresGroupHeading,
  factsAndFiguresGroupContent,
  presentationStyle,
  columnCount,
  alignment,
  themeColor,
  image,
  iconName
}) => {
  // Determine if icons should be shown based on icon selection
  const hasIcon = iconName && iconName !== '- None -';

  // Create custom data with the same icon for all items
  const customGroupData = {
    ...factsAndFiguresGroupData,
    facts_and_figures__group: factsAndFiguresGroupData.facts_and_figures__group.map(item => {
      return {
        ...item,
        facts_and_figures__has_icon: hasIcon ? 'true' : 'false',
        facts_and_figures__icon_name: hasIcon ? iconName : null,
        facts_and_figures__presentation_style: presentationStyle,
        facts_and_figures__alignment: alignment
      };
    })
  };
  return \`
    <div class="wrap-for-global-theme">
      \${factsAndFiguresGroupTwig({
    facts_and_figures__group__heading: factsAndFiguresGroupHeading,
    facts_and_figures__group__content: factsAndFiguresGroupContent,
    facts_and_figures__group__has_icon: hasIcon ? 'true' : 'false',
    facts_and_figures__group__grid_count: columnCount,
    facts_and_figures__group__alignment: alignment,
    facts_and_figures__group__presentation_style: presentationStyle,
    facts_and_figures__group__theme: themeColor,
    facts_and_figures__group__bg_image: image,
    ...customGroupData,
    ...imageData.responsive_images['16x9']
  })}
    </div>
    \`;
}`,...e.parameters?.docs?.source}}};const C=["FactsAndFiguresGroup"],x=Object.freeze(Object.defineProperty({__proto__:null,FactsAndFiguresGroup:e,__namedExportsOrder:C,default:A},Symbol.toStringTag,{value:"Module"}));export{x as F,e as a,u as c};
//# sourceMappingURL=facts-and-figures-group.stories-6NJYfurX.js.map
