"use strict";(self.webpackChunk_yalesites_org_component_library_twig=self.webpackChunk_yalesites_org_component_library_twig||[]).push([[9921],{"./components/02-molecules/accordion/accordion.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Accordion:()=>Accordion,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _yds_accordion_twig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./components/02-molecules/accordion/yds-accordion.twig"),_yds_accordion_twig__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_yds_accordion_twig__WEBPACK_IMPORTED_MODULE_0__),_accordion_yml__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/02-molecules/accordion/accordion.yml"),_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_accordion_yml__WEBPACK_IMPORTED_MODULE_1__);__webpack_require__("./components/02-molecules/accordion/yds-accordion.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Molecules/Accordion",argTypes:{accordionHeading:{name:"Accordion Heading",type:"string"},heading:{name:"Heading",type:"string"},content:{name:"Content",type:"string"},themeColor:{name:"Component Theme (dial)",options:["default","one","two","three","four","five"],type:"select"},sectionTheme:{name:"Section Theme",type:"select",options:["default","one","two","three","four"],control:{type:"select"}},itemsToDisplay:{name:"Items to Display",options:{"One Item":1,"Multiple Items":3},type:"select"}},args:{accordionHeading:_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default().accordion__heading,heading:_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default().accordion__item__heading,content:_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default().accordion__item__content,themeColor:"default",sectionTheme:"default",itemsToDisplay:3},parameters:{docs:{description:{component:"Storybook Definition."}}}},Accordion=({accordionHeading,heading,content,themeColor,itemsToDisplay,sectionTheme})=>{const accordionItems=Array.from({length:itemsToDisplay},((_,index)=>({accordion__item__heading:0===index?heading:_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default().accordion__item__heading,accordion__item__content:0===index?content:_accordion_yml__WEBPACK_IMPORTED_MODULE_1___default().accordion__item__content})));return`\n    <div>\n      ${_yds_accordion_twig__WEBPACK_IMPORTED_MODULE_0___default()({accordion__theme:themeColor,accordion__heading:accordionHeading,accordion__items:[{accordion__item__heading:heading,accordion__item__content:content}]})}\n    </div>\n    <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">\n    <div class="yds-layout__inner">\n      <div class="yds-layout__primary">\n        <h2>Playground</h2>\n        <p>Use the StoryBook controls to see the accordion below implement the available variations and colors.</p>\n        ${_yds_accordion_twig__WEBPACK_IMPORTED_MODULE_0___default()({accordion__theme:themeColor,accordion__heading:accordionHeading,accordion__items:accordionItems})}\n      </div>\n    </div>\n  </div>\n  `},__namedExportsOrder=["Accordion"];Accordion.parameters={...Accordion.parameters,docs:{...Accordion.parameters?.docs,source:{originalSource:'({\n  accordionHeading,\n  heading,\n  content,\n  themeColor,\n  itemsToDisplay,\n  sectionTheme\n}) => {\n  const accordionItems = Array.from({\n    length: itemsToDisplay\n  }, (_, index) => ({\n    accordion__item__heading: index === 0 ? heading : accordionData.accordion__item__heading,\n    accordion__item__content: index === 0 ? content : accordionData.accordion__item__content\n  }));\n  return `\n    <div>\n      ${accordionTwig({\n    accordion__theme: themeColor,\n    accordion__heading: accordionHeading,\n    accordion__items: [{\n      accordion__item__heading: heading,\n      accordion__item__content: content\n    }]\n  })}\n    </div>\n    <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">\n    <div class="yds-layout__inner">\n      <div class="yds-layout__primary">\n        <h2>Playground</h2>\n        <p>Use the StoryBook controls to see the accordion below implement the available variations and colors.</p>\n        ${accordionTwig({\n    accordion__theme: themeColor,\n    accordion__heading: accordionHeading,\n    accordion__items: accordionItems\n  })}\n      </div>\n    </div>\n  </div>\n  `;\n}',...Accordion.parameters?.docs?.source}}}}}]);