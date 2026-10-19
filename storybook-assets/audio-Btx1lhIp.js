import{u as a,j as e,M as t,C as d,a as c}from"./blocks-C3MhvIPG.js";import{A as h,a as n,c as o}from"./audio.stories-CVzCqOKP.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./audio-DnZN_Tx8.js";import"./component-props-De-d7Djp.js";function l(i){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:h,name:"Overview"}),`
`,e.jsx(s.h1,{id:"audio-player",children:"Audio Player"}),`
`,e.jsxs(s.p,{children:["The audio component wraps an HTML5 ",e.jsx(s.code,{children:"<audio>"})," element in a custom, keyboard-accessible player with play/pause, a draggable progress bar with elapsed and total time, playback-speed selection, and a volume control. An optional label can be shown above the player. In Drupal the audio source is supplied by the block's media field rather than a URL prop."]}),`
`,e.jsx(s.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(s.p,{children:"Use the controls panel below to see the audio component in action."}),`
`,e.jsx(d,{of:n}),`
`,e.jsx(c,{of:n}),`
`,e.jsx(s.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(s.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(o,"required"),`
`,e.jsx(s.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(o,"optional"),`
`,e.jsx(s.h2,{id:"player-controls",children:"Player Controls"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Play / Pause"}),": Toggles playback; the button swaps between the play and pause icons."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Progress bar"}),": A range slider showing playback position; drag to seek. The current and total time are displayed alongside it (",e.jsx(s.code,{children:"m:ss"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Playback speed"}),": A gauge toggle opens a menu of 0.5x, 1x, and 2x options. The whole speed control area (including the visible active label) is the click target, not just the icon."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Volume"}),": A mute toggle plus a range slider. The volume control is hidden below the mobile breakpoint, where the device's physical volume controls take over."]}),`
`]}),`
`,e.jsx(s.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Template"}),": ",e.jsx(s.code,{children:"yds-audio.twig"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Styles"}),": ",e.jsx(s.code,{children:"yds-audio.scss"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Behavior"}),": ",e.jsx(s.code,{children:"yds-audio-player.js"})," (attached via the ",e.jsx(s.code,{children:"audio-player"})," asset library in the Atomic theme)"]}),`
`]}),`
`,e.jsx(s.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Keyboard"}),": All controls (play/pause, progress, speed toggle and options, volume) are native ",e.jsx(s.code,{children:"<button>"})," / ",e.jsx(s.code,{children:"<input>"})," elements and are keyboard focusable and operable."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Accessible names"}),": Each control has a visually-hidden label or ",e.jsx(s.code,{children:"aria-label"}),' (for example "Play the Audio File", "Audio Playback Progress Bar", "Volume").']}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"State"}),": The speed toggle exposes ",e.jsx(s.code,{children:"aria-expanded"}),"; the volume mute toggle exposes ",e.jsx(s.code,{children:"aria-pressed"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Fallback"}),': Browsers without HTML5 audio support see the message "Your browser does not support the audio element."']}),`
`]}),`
`,e.jsx(s.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"The player scales to the content width of its container."}),`
`,e.jsx(s.li,{children:"Below the mobile breakpoint the volume control is hidden (device volume handles it) while the progress bar and playback controls remain usable."}),`
`]}),`
`,e.jsx(s.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(s.h3,{id:"basic-audio-embed",children:"Basic Audio Embed"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-twig",children:`{{ include('@atoms/audio/yds-audio.twig', {
  audio_embed__content: 'Get Your Kicks on Route 66',
  audio_embed__url: 'https://example.com/audio.mp3',
}) }}
`})}),`
`,e.jsxs(s.p,{children:["In Drupal the audio source is provided by the block's media field, so ",e.jsx(s.code,{children:"audio_embed__url"})," is used mainly for the Storybook preview and standalone examples."]}),`
`,e.jsx(s.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(s.p,{children:["For comprehensive visual regression testing with all audio player variations and theme combinations, see the ",e.jsx(s.a,{href:"?path=/story/atoms-audio-player-visreg--old-blues",children:"Visreg page"}),"."]})]})}function w(i={}){const{wrapper:s}={...a(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(l,{...i})}):l(i)}export{w as default};
//# sourceMappingURL=audio-Btx1lhIp.js.map
