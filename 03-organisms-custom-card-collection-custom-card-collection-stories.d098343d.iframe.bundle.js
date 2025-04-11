(self.webpackChunk_yalesites_org_component_library_twig=self.webpackChunk_yalesites_org_component_library_twig||[]).push([[184],{"./components/00-tokens/colors/color-global-themes.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=globalThemeTokens=>{const globalThemeOptions={};return Object.keys(globalThemeTokens).forEach((element=>{globalThemeOptions[globalThemeTokens[element].label]=element})),globalThemeOptions}},"./components/03-organisms/custom-card-collection/custom-card-collection.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,customCardCollection:()=>customCardCollection,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _yalesites_org_tokens_build_json_tokens_json__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@yalesites-org/tokens/build/json/tokens.json"),_00_tokens_colors_color_global_themes__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./components/00-tokens/colors/color-global-themes.js"),_yds_custom_card_collection_twig__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/03-organisms/custom-card-collection/yds-custom-card-collection.twig"),_yds_custom_card_collection_twig__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_yds_custom_card_collection_twig__WEBPACK_IMPORTED_MODULE_1__),_02_molecules_cards_custom_card_custom_card_yml__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/02-molecules/cards/custom-card/custom-card.yml"),_02_molecules_cards_custom_card_custom_card_yml__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_02_molecules_cards_custom_card_custom_card_yml__WEBPACK_IMPORTED_MODULE_2__),_01_atoms_images_image_image_yml__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./components/01-atoms/images/image/image.yml"),_01_atoms_images_image_image_yml__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_01_atoms_images_image_image_yml__WEBPACK_IMPORTED_MODULE_3__);const __WEBPACK_DEFAULT_EXPORT__={title:"Organisms/Card Collection/Custom Card Collection",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{globalTheme:{name:"Global Theme (lever)",options:(0,_00_tokens_colors_color_global_themes__WEBPACK_IMPORTED_MODULE_4__.A)(_yalesites_org_tokens_build_json_tokens_json__WEBPACK_IMPORTED_MODULE_0__.Fz),type:"select"},customCardCollectionHeading:{name:"Collection Heading",type:"string"},featured:{name:"Featured",type:"boolean"},withImage:{name:"With Images",type:"boolean"}},args:{customCardCollectionHeading:"Custom Card Collection Heading",featured:!0,withImage:!0,globalTheme:"one"}},customCardCollection=({heading,snippet,url,customCardCollectionHeading,withImage,featured,globalTheme})=>{const items=featured?[1,2,3]:[1,2,3,4];return`\n    <div class="wrap-for-global-theme" data-global-theme="${globalTheme}">\n      ${_yds_custom_card_collection_twig__WEBPACK_IMPORTED_MODULE_1___default()({site_global__theme:globalTheme,custom_card_collection__heading:customCardCollectionHeading,custom_card__heading:heading,custom_card__snippet:snippet,custom_card__url:url,custom_card__image:withImage?"true":"false",custom_card_collection__featured:featured?"true":"false",custom_card_collection__cards:items,..._02_molecules_cards_custom_card_custom_card_yml__WEBPACK_IMPORTED_MODULE_2___default(),..._01_atoms_images_image_image_yml__WEBPACK_IMPORTED_MODULE_3___default().responsive_images["3x2"]})}\n    </div>\n  `},__namedExportsOrder=["customCardCollection"];customCardCollection.parameters={...customCardCollection.parameters,docs:{...customCardCollection.parameters?.docs,source:{originalSource:"({\n  heading,\n  snippet,\n  url,\n  customCardCollectionHeading,\n  withImage,\n  featured,\n  globalTheme\n}) => {\n  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];\n  return `\n    <div class=\"wrap-for-global-theme\" data-global-theme=\"${globalTheme}\">\n      ${customCardCollectionTwig({\n    site_global__theme: globalTheme,\n    custom_card_collection__heading: customCardCollectionHeading,\n    custom_card__heading: heading,\n    custom_card__snippet: snippet,\n    custom_card__url: url,\n    custom_card__image: withImage ? 'true' : 'false',\n    custom_card_collection__featured: featured ? 'true' : 'false',\n    custom_card_collection__cards: items,\n    ...customCardData,\n    ...imageData.responsive_images['3x2']\n  })}\n    </div>\n  `;\n}",...customCardCollection.parameters?.docs?.source}}}},"./components/01-atoms/images/image/image.yml":module=>{const doc=[{responsive_images:{"16x9":{output_image_tag:!0,image__srcset:"https://picsum.photos/320/180 320w, https://picsum.photos/480/270 480w, https://picsum.photos/640/360 640w, https://picsum.photos/800/450 800w, https://picsum.photos/960/540 960w, https://picsum.photos/1120/630 1120w, https://picsum.photos/1280/720 1280w, https://picsum.photos/1440/810 1440w, https://picsum.photos/1600/900 1600w, https://picsum.photos/1760/990 1760w, https://picsum.photos/1920/1080 1920w, https://picsum.photos/2080/1170 2080w, https://picsum.photos/2240/1260 2240w, https://picsum.photos/2400/1350 2400w",image__sizes:"100vw",image__src:"https://picsum.photos/320/180",image__alt:"A 16 by 9 image"},"3x2":{output_image_tag:!0,image__srcset:"https://picsum.photos/320/213 320w, https://picsum.photos/480/320 480w, https://picsum.photos/640/427 640w, https://picsum.photos/800/533 800w, https://picsum.photos/960/640 960w, https://picsum.photos/1120/747 1120w, https://picsum.photos/1280/853 1280w, https://picsum.photos/1440/960 1440w, https://picsum.photos/1600/1067 1600w, https://picsum.photos/1760/1173 1760w, https://picsum.photos/1920/1280 1920w, https://picsum.photos/2080/1387 2080w, https://picsum.photos/2240/1493 2240w, https://picsum.photos/2400/1600 2400w",image__sizes:"100vw",image__src:"https://picsum.photos/320/213",image__alt:"A 3 by 2 image"},"1x1":{output_image_tag:!0,image__srcset:"https://picsum.photos/320 320w, https://picsum.photos/480 480w, https://picsum.photos/640 640w, https://picsum.photos/800 800w, https://picsum.photos/960 960w, https://picsum.photos/1120 1120w, https://picsum.photos/1280 1280w, https://picsum.photos/1440 1440w, https://picsum.photos/1600 1600w, https://picsum.photos/1760 1760w, https://picsum.photos/1920 1920w, https://picsum.photos/2080 2080w, https://picsum.photos/2240 2240w, https://picsum.photos/2400 2400w",image__sizes:"100vw",image__src:"https://picsum.photos/320",image__alt:"A 1 by 1 image"},"1x1.6":{output_image_tag:!0,image__srcset:"https://picsum.photos/320/512 320w, https://picsum.photos/480/768 480w, https://picsum.photos/640/1024 640w, https://picsum.photos/800/1280 800w, https://picsum.photos/960/1536 960w, https://picsum.photos/1120/1792 1120w, https://picsum.photos/1280/2048 1280w, https://picsum.photos/1440/2304 1440w, https://picsum.photos/1600/2560 1600w, https://picsum.photos/1760/2816 1760w, https://picsum.photos/1920/3072 1920w, https://picsum.photos/2080/3328 2080w, https://picsum.photos/2240/3584 2240w, https://picsum.photos/2400/3840 2400w",image__sizes:"100vw",image__src:"https://picsum.photos/320/512",image__alt:"A 1 by 1.6 image"},"4x3":{output_image_tag:!0,image__srcset:"https://picsum.photos/320/240 320w, https://picsum.photos/480/360 480w, https://picsum.photos/640/480 640w, https://picsum.photos/800/600 800w, https://picsum.photos/960/720 960w, https://picsum.photos/1120/840 1120w, https://picsum.photos/1280/960 1280w, https://picsum.photos/1440/1080 1440w, https://picsum.photos/1600/1200 1600w, https://picsum.photos/1760/1320 1760w, https://picsum.photos/1920/1440 1920w, https://picsum.photos/2080/1560 2080w, https://picsum.photos/2240/1680 2240w, https://picsum.photos/2400/1800 2400w",image__sizes:"100vw",image__src:"https://picsum.photos/320/240",image__alt:"A 4 by 3 image"},"2x3":{output_image_tag:!0,image__srcset:"https://picsum.photos/213/320 213w, https://picsum.photos/320/480 320w, https://picsum.photos/427/640 427w, https://picsum.photos/533/800 533w, https://picsum.photos/640/960 640w, https://picsum.photos/747/1120 747w, https://picsum.photos/853/1280 853w, https://picsum.photos/960/1440 960w, https://picsum.photos/1067/1600 1067w, https://picsum.photos/1173/1760 1173w, https://picsum.photos/1280/1920 1280w, https://picsum.photos/1387/2080 1387w, https://picsum.photos/1493/2240 1493w, https://picsum.photos/1600/2400 1600w",image__sizes:"100vw",image__src:"https://picsum.photos/213/320",image__alt:"A 2 by 3 image"}}}];module.exports=doc.length<=1?doc[0]:doc},"./components/01-atoms/typography/text/yds-text.twig":(module,__unused_webpack_exports,__webpack_require__)=>{var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1",data:[{type:"raw",value:"\n\n",position:{start:178,end:180}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__base_class",expression:[{type:"Twig.expression.type.variable",value:"text__base_class",match:["text__base_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"text"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:180,end:241}},position:{start:180,end:241}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__element",expression:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:242,end:296}},position:{start:242,end:296}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__attributes",expression:[{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:297,end:354}},position:{start:297,end:354}},{type:"raw",value:"\n",position:{start:355,end:356}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__attributes",expression:[{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"text__base_class",match:["text__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__modifiers",match:["text__modifiers"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__blockname",match:["text__blockname"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__extra_class",match:["text__extra_class"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:356,end:497}},position:{start:356,end:497}},{type:"raw",value:"\n<",position:{start:498,end:500}},{type:"output",position:{start:500,end:519},stack:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"],position:{start:500,end:519}}]},{type:"raw",value:" ",position:{start:519,end:520}},{type:"output",position:{start:520,end:558},stack:[{type:"Twig.expression.type._function",position:{start:520,end:558},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:520,end:558}},{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"],position:{start:520,end:558}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:520,end:558},expression:!1}]}]},{type:"raw",value:">",position:{start:558,end:562}},{type:"output_whitespace_both",position:{start:562,end:587},stack:[{type:"Twig.expression.type.variable",value:"text__content",match:["text__content"],position:{start:562,end:587}},{type:"Twig.expression.type.filter",value:"raw",match:["|raw","raw"],position:{start:562,end:587}}]},{type:"raw",value:"</",position:{start:587,end:590}},{type:"output",position:{start:590,end:609},stack:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"],position:{start:590,end:609}}]},{type:"raw",value:">\n",position:{start:609,end:609}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./node_modules/@yalesites-org/tokens/build/json/tokens.json":module=>{"use strict";module.exports=JSON.parse('{"yW":{"z1":{"yale":"hsl(210, 100%, 21%)","medium":"hsl(213, 66%, 45%)","light":"hsl(213, 100%, 69%)","horizon":"hsl(210, 47%, 46%)","shale":"hsl(199, 27%, 58%)","pewter":"hsl(183, 16%, 75%)","royal":"hsl(221, 47%, 40%)","slate":"hsl(188, 14%, 32%)","oceanic":"hsl(175, 36%, 32%)","soft-oceanic":"hsl(174, 57%, 93%)","soft":"hsl(210, 59%, 93%)","deep-teal":"hsl(210, 26%, 26%)"},"wL":{"basil":"hsl(100, 13%, 36%)","ground":"hsl(87, 12%, 57%)","fog":"hsl(52, 26%, 83%)","pine":"hsl(148, 16%, 19%)"},"T_":{"peach":"hsl(36, 59%, 61%)","coral":"hsl(6, 100%, 66%)"},"D9":{"umbrella":"hsl(43, 64%, 68%)","onha":"hsl(46, 90%, 65%)"},"HX":{"white":"hsl(0, 0%, 100%)","black":"hsl(0, 0%, 0%)","brown-gray":"hsl(28, 7%, 44%)"},"wm":{"100":"hsl(0, 0%, 97%)","200":"hsl(0, 0%, 85%)","300":"hsl(0, 0%, 73%)","400":"hsl(0, 0%, 61%)","500":"hsl(0, 0%, 46%)","600":"hsl(0, 0%, 37%)","700":"hsl(0, 0%, 25%)","800":"hsl(0, 0%, 13%)","900":"hsl(0, 0%, 11%)","hale":"hsl(215, 12%, 30%)"}},"cX":{"s":"576px","m":"768px","l":"992px","xl":"1200px","2xl":"1400px","max-width":"2400px","mobile":"992px","mobile-max":"992px - 0.05"},"zh":{"one":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(0, 0%, 97%)","slot-five":"hsl(0, 0%, 13%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"two":{"background":"hsl(0, 0%, 25%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)","slot-one":"hsl(0, 0%, 25%)","slot-two":"hsl(100, 13%, 36%)","slot-three":"hsl(87, 12%, 57%)","slot-four":"hsl(52, 26%, 83%)","slot-five":"hsl(148, 16%, 19%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"three":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(221, 47%, 40%)","slot-three":"hsl(36, 59%, 61%)","slot-four":"hsl(43, 64%, 68%)","slot-five":"hsl(188, 14%, 32%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"four":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(175, 36%, 32%)","slot-three":"hsl(46, 90%, 65%)","slot-four":"hsl(210, 59%, 93%)","slot-five":"hsl(0, 0%, 46%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 11%)","slot-eight":"hsl(0, 0%, 100%)"}},"five":{"background":"hsl(174, 57%, 93%)","text":"hsl(210, 100%, 21%)","heading":"hsl(210, 100%, 21%)","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(175, 36%, 32%)","slot-three":"hsl(46, 90%, 65%)","slot-four":"hsl(210, 59%, 93%)","slot-five":"hsl(0, 0%, 46%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 11%)","slot-eight":"hsl(0, 0%, 100%)"}}},"Fz":{"one":{"label":"Old Blues","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(0, 0%, 97%)","slot-five":"hsl(0, 0%, 13%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"two":{"label":"New Haven Green","colors":{"slot-one":"hsl(0, 0%, 25%)","slot-two":"hsl(100, 13%, 36%)","slot-three":"hsl(87, 12%, 57%)","slot-four":"hsl(52, 26%, 83%)","slot-five":"hsl(148, 16%, 19%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"three":{"label":"Shoreline Summer","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(221, 47%, 40%)","slot-three":"hsl(36, 59%, 61%)","slot-four":"hsl(43, 64%, 68%)","slot-five":"hsl(188, 14%, 32%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"four":{"label":"Onha","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(175, 36%, 32%)","slot-three":"hsl(46, 90%, 65%)","slot-four":"hsl(210, 59%, 93%)","slot-five":"hsl(0, 0%, 46%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 11%)","slot-eight":"hsl(0, 0%, 100%)"}},"five":{"label":"It’s Your Yale","colors":{"slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(6, 100%, 66%)","slot-four":"hsl(0, 0%, 97%)","slot-five":"hsl(210, 26%, 26%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 11%)","slot-eight":"hsl(0, 0%, 100%)"}}},"ul":{"gray-800":{"background":"hsl(0, 0%, 13%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)"},"gray-700":{"background":"hsl(0, 0%, 25%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)"},"gray-200":{"background":"hsl(0, 0%, 85%)","text":"hsl(0, 0%, 25%)","heading":"hsl(0, 0%, 13%)"},"gray-100":{"background":"hsl(0, 0%, 97%)","text":"hsl(0, 0%, 25%)","heading":"hsl(0, 0%, 13%)"},"white":{"background":"hsl(0, 0%, 100%)","text":"hsl(0, 0%, 25%)","heading":"hsl(0, 0%, 13%)"},"blue-yale":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","heading":"hsl(0, 0%, 100%)"}},"Jx":{"one":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"two":{"background":"hsl(213, 66%, 45%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"three":{"background":"hsl(213, 100%, 69%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"four":{"background":"hsl(183, 16%, 75%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"five":{"background":"hsl(215, 12%, 30%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"six":{"background":"hsl(0, 0%, 13%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"seven":{"background":"hsl(210, 100%, 21%)","text":"hsl(0, 0%, 100%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"Zp":{"V":{"25":"25%","50":"50%","75":"75%","100":"100%"}},"Ej":{"YK":{"0":"0rem","1":"0.125rem","2":"0.25rem","3":"0.5rem","4":"0.75rem","5":"1rem","6":"1.5rem","7":"2rem","8":"2.5rem","9":"3rem","10":"4rem","11":"5rem","12":"6rem","13":"10rem"}},"PQ":{"X":{"0":"0rem","1":"0.063rem","2":"0.125rem","4":"0.25rem","6":"0.375rem","8":"0.5rem","hairline":"0.031rem"}},"gx":{"iF":{"R_":{"h1-yale-new":"400 clamp(2.6875rem, calc(2.32vw + 1.8574rem), 3.875rem)/1.1 YaleNew, serif","h2-yale-new":"400 clamp(2.25rem, calc(1.94vw + 1.5510rem), 3.25rem)/1.1 YaleNew, serif","h3-yale-new":"400 clamp(1.8125rem, calc(1.46vw + 1.2882rem), 2.5625rem)/1.14 YaleNew, serif","h4-yale-new":"400 clamp(1.5rem, calc(0.73vw + 1.2379rem), 1.875rem)/1.14 YaleNew, serif","h5-yale-new":"400 clamp(1.3125rem, calc(0.49vw + 1.1377rem), 1.5625rem)/1.14 YaleNew, serif","h6-yale-new":"400 clamp(1rem, calc(0.36vw + 0.8689rem), 1.1875rem)/1.05 YaleNew, serif","h1-mallory-compact-medium":"500 clamp(2.5625rem, calc(2.06vw + 1.8198rem), 3.625rem)/1 \'Mallory Compact\', sans-serif","h2-mallory-compact-medium":"500 clamp(2.0625rem, calc(1.58vw + 1.4945rem), 2.875rem)/1 \'Mallory Compact\', sans-serif","h3-mallory-compact-medium":"500 clamp(1.6875rem, calc(1.09vw + 1.2943rem), 2.25rem)/1.05 \'Mallory Compact\', sans-serif","h4-mallory-compact-medium":"500 clamp(1.4375rem, calc(0.73vw + 1.1754rem), 1.8125rem)/1.10 \'Mallory Compact\', sans-serif","h5-mallory-compact-medium":"500 clamp(1.25rem, calc(0.49vw + 1.0752rem), 1.5rem)/1.15 \'Mallory Compact\', sans-serif","h6-mallory-compact-medium":"500 clamp(0.9375rem, calc(0.36vw + 0.8064rem), 1.125rem)/1.05 \'Mallory Compact\', sans-serif","h1-mallory-compact-book":"400 clamp(2.5625rem, calc(2.06vw + 1.8198rem), 3.625rem)/1 \'Mallory Compact\', sans-serif","h2-mallory-compact-book":"400 clamp(2.0625rem, calc(1.58vw + 1.4945rem), 2.875rem)/1 \'Mallory Compact\', sans-serif","h3-mallory-compact-book":"400 clamp(1.6875rem, calc(1.09vw + 1.2943rem), 2.25rem)/1.05 \'Mallory Compact\', sans-serif","h4-mallory-compact-book":"400 clamp(1.4375rem, calc(0.73vw + 1.1754rem), 1.8125rem)/1.10 \'Mallory Compact\', sans-serif","h5-mallory-compact-book":"400 clamp(1.25rem, calc(0.49vw + 1.0752rem), 1.5rem)/1.15 \'Mallory Compact\', sans-serif","h6-mallory-compact-book":"400 clamp(0.9375rem, calc(0.36vw + 0.8064rem), 1.125rem)/1.05 \'Mallory Compact\', sans-serif"},"rf":{"xl":"400 clamp(1.4375rem, calc(0.73vw + 1.1754rem), 1.8125rem)/1.5 \'Mallory Compact\', sans-serif","l":"400 clamp(1.25rem, calc(0.73vw + 0.9879rem), 1.625rem)/1.7 \'Mallory Compact\', sans-serif","default":"400 clamp(1.0625rem, calc(0.36vw + 0.9314rem), 1.25rem)/1.7 \'Mallory Compact\', sans-serif","default-condensed":"400 clamp(1.0625rem, calc(0.36vw + 0.9314rem), 1.25rem)/1.4 \'Mallory Compact\', sans-serif","s":"400 clamp(0.9375rem, calc(0.12vw + 0.8938rem), 1rem)/1.7 \'Mallory Compact\', sans-serif","s-condensed":"400 clamp(0.9375rem, calc(0.12vw + 0.8938rem), 1rem)/1.4 \'Mallory Compact\', sans-serif","xs":"400 clamp(0.8125rem, calc(0.12vw + 0.7688rem), 0.875rem)/1.4 \'Mallory Compact\', sans-serif"}},"hs":{"43-62":"clamp(2.6875rem, calc(2.32vw + 1.8574rem), 3.875rem)","41-58":"clamp(2.5625rem, calc(2.06vw + 1.8198rem), 3.625rem)","38-55":"clamp(2.375rem, calc(2.06vw + 1.6323rem), 3.4375rem)","36-52":"clamp(2.25rem, calc(1.94vw + 1.5510rem), 3.25rem)","33-46":"clamp(2.0625rem, calc(1.58vw + 1.4945rem), 2.875rem)","29-41":"clamp(1.8125rem, calc(1.46vw + 1.2882rem), 2.5625rem)","27-36":"clamp(1.6875rem, calc(1.09vw + 1.2943rem), 2.25rem)","24-30":"clamp(1.5rem, calc(0.73vw + 1.2379rem), 1.875rem)","23-29":"clamp(1.4375rem, calc(0.73vw + 1.1754rem), 1.8125rem)","21-25":"clamp(1.3125rem, calc(0.49vw + 1.1377rem), 1.5625rem)","20-26":"clamp(1.25rem, calc(0.73vw + 0.9879rem), 1.625rem)","20-24":"clamp(1.25rem, calc(0.49vw + 1.0752rem), 1.5rem)","17-20":"clamp(1.0625rem, calc(0.36vw + 0.9314rem), 1.25rem)","16-19":"clamp(1rem, calc(0.36vw + 0.8689rem), 1.1875rem)","15-18":"clamp(0.9375rem, calc(0.36vw + 0.8064rem), 1.125rem)","15-16":"clamp(0.9375rem, calc(0.12vw + 0.8938rem), 1rem)","13-14":"clamp(0.8125rem, calc(0.12vw + 0.7688rem), 0.875rem)"},"oU":{"h6-yale-new":"0.03em","h1-mallory-compact-medium":"-0.01em","h2-mallory-compact-medium":"-0.01em","h6-mallory-compact-medium":"0.02em","h1-mallory-compact-book":"-0.01em","h2-mallory-compact-book":"-0.01em","h6-mallory-compact-book":"0.02em","yalenew-bold":"0.01em"},"G7":{"h6-yale-new":"uppercase","h6-mallory-compact-medium":"uppercase","h6-mallory-compact-book":"uppercase"}},"rM":{"one":{"background-color":"hsl(0, 0%, 100%)","yale-branding":"hsl(210, 100%, 21%)","border-color":"hsl(210, 100%, 21%)","divider-color":"hsl(0, 0%, 73%)","text-color":"hsl(0, 0%, 0%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"two":{"background-color":"hsl(0, 0%, 100%)","yale-branding":"hsl(210, 100%, 21%)","border-color":"hsl(210, 100%, 21%)","divider-color":"hsl(0, 0%, 73%)","text-color":"hsl(0, 0%, 0%)","slot-one":"hsl(0, 0%, 25%)","slot-two":"hsl(100, 13%, 36%)","slot-three":"hsl(87, 12%, 57%)","slot-four":"hsl(52, 26%, 83%)","slot-five":"hsl(148, 16%, 19%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"three":{"background-color":"hsl(0, 0%, 97%)","yale-branding":"hsl(213, 100%, 69%)","border-color":"hsl(213, 100%, 69%)","divider-color":"hsl(0, 0%, 46%)","text-color":"hsl(0, 0%, 0%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(221, 47%, 40%)","slot-three":"hsl(36, 59%, 61%)","slot-four":"hsl(43, 64%, 68%)","slot-five":"hsl(188, 14%, 32%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"Zo":{"one":{"background":"hsl(0, 0%, 100%)","yale-branding":"hsl(210, 100%, 21%)","site-branding":"hsl(210, 100%, 21%)","border-color":"hsl(210, 100%, 21%)","divider-color":"hsl(0, 0%, 73%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(213, 66%, 45%)","slot-three":"hsl(213, 100%, 69%)","slot-four":"hsl(183, 16%, 75%)","slot-five":"hsl(215, 12%, 30%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"two":{"background":"hsl(0, 0%, 13%)","yale-branding":"hsl(221, 47%, 40%)","site-branding":"hsl(0, 0%, 100%)","border-color":"hsl(221, 47%, 40%)","divider-color":"hsl(0, 0%, 46%)","slot-one":"hsl(0, 0%, 25%)","slot-two":"hsl(100, 13%, 36%)","slot-three":"hsl(87, 12%, 57%)","slot-four":"hsl(52, 26%, 83%)","slot-five":"hsl(148, 16%, 19%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"},"three":{"background":"hsl(210, 100%, 21%)","yale-branding":"hsl(221, 47%, 40%)","site-branding":"hsl(0, 0%, 100%)","border-color":"hsl(221, 47%, 40%)","divider-color":"hsl(0, 0%, 46%)","slot-one":"hsl(210, 100%, 21%)","slot-two":"hsl(221, 47%, 40%)","slot-three":"hsl(36, 59%, 61%)","slot-four":"hsl(43, 64%, 68%)","slot-five":"hsl(188, 14%, 32%)","slot-six":"hsl(210, 100%, 21%)","slot-seven":"hsl(0, 0%, 13%)","slot-eight":"hsl(0, 0%, 100%)"}},"_E":{"Level 1":"0px 1px 2px 0px #00000029,0px 4px 4px 0px #00000017,0px 6px 8px 0px #00000021","Level 1 - Bottom Shadow Only":"0px 8px 6px -6px #00000029","Level 2":"0px 0.5985091924667358px 0.7980122566223145px 0px #00000014,0px 2.010267734527588px 2.680356979370117px 0px #0000001c,0px 9px 12px 0px #00000030","Level 3":"0px 0.33000001311302185px 1.7290265560150146px 0px #0000001a,0px 2.4700000286102295px 2.809999942779541px 0px #0000001f,0px 16px 23px 0px #00000038","Level 4":"0px 0.9975153207778931px 1.9285296201705933px 0px #00000012,0px 3.3504464626312256px 6.477529525756836px 0px #00000012,0px 15px 28px 0px #00000059"},"r8":{"0":"0rem","4":"0.25rem","10":"0.625rem","20":"1.25rem"}}')}}]);