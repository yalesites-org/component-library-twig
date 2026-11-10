import{u as l,j as e,M as d,C as n,a as c}from"./blocks-BZS-r3VN.js";import{A as h,a as t,b as p,c as r}from"./audio.stories-BQz1woq2.js";import{t as o}from"./twig-props-table-C-YBRhyi.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-BnO6idpc.js";import"./audio-LH1Hxl4f.js";import"./component-props-De-d7Djp.js";function a(s){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:h,name:"Overview"}),`
`,e.jsx(i.h1,{id:"audio-player",children:"Audio Player"}),`
`,e.jsxs(i.p,{children:["The audio component wraps an HTML5 ",e.jsx(i.code,{children:"<audio>"})," element in a custom, keyboard-accessible player with play/pause, a draggable progress bar with elapsed and total time, playback-speed selection, and a volume control. An optional label can be shown above the player, and an optional transcript below it. In Drupal the audio source is supplied by the block's media field rather than a URL prop."]}),`
`,e.jsx(i.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(i.p,{children:"Use the controls panel below to see the audio component in action."}),`
`,e.jsx(n,{of:t}),`
`,e.jsx(c,{of:t}),`
`,e.jsx(i.h2,{id:"with-transcript",children:"With Transcript"}),`
`,e.jsx(i.p,{children:'A transcript renders below the player as ordinary page text, styled like the Video description, under a visible "Transcript" button that shows and hides it. Once JavaScript runs the transcript starts collapsed, so a long one does not push the rest of the page down; without JavaScript it stays open. Either way it is reachable without playing the audio, which is what WCAG 2.1 Level A (SC 1.2.1) asks of prerecorded audio.'}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(i.h2,{id:"player-controls",children:"Player Controls"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Play / Pause"}),": Toggles playback; the button swaps between the play and pause icons."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Progress bar"}),": A range slider showing playback position; drag to seek. The current and total time are displayed alongside it (",e.jsx(i.code,{children:"m:ss"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Playback speed"}),": A gauge toggle opens a menu of 0.5x, 1x, and 2x options. The whole speed control area (including the visible active label) is the click target, not just the icon."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Volume"}),": A mute toggle plus a range slider. The volume control is hidden below the mobile breakpoint, where the device's physical volume controls take over."]}),`
`]}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Template"}),": ",e.jsx(i.code,{children:"yds-audio.twig"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Styles"}),": ",e.jsx(i.code,{children:"yds-audio.scss"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Behavior"}),": ",e.jsx(i.code,{children:"yds-audio-player.js"})," (attached via the ",e.jsx(i.code,{children:"audio-player"})," asset library in the Atomic theme)"]}),`
`]}),`
`,e.jsx(i.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Keyboard"}),": All controls (play/pause, progress, speed toggle and options, volume) are native ",e.jsx(i.code,{children:"<button>"})," / ",e.jsx(i.code,{children:"<input>"})," elements and are keyboard focusable and operable."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Accessible names"}),": Each control has a visually-hidden label or ",e.jsx(i.code,{children:"aria-label"}),' (for example "Play the Audio File", "Audio Playback Progress Bar", "Volume").']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"State"}),": The speed toggle and the transcript toggle expose ",e.jsx(i.code,{children:"aria-expanded"}),"; the volume mute toggle exposes ",e.jsx(i.code,{children:"aria-pressed"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Transcript"}),": An optional transcript renders as page text after the player, under a native ",e.jsx(i.code,{children:"<button>"}),' labelled "Transcript" with ',e.jsx(i.code,{children:"aria-expanded"})," and ",e.jsx(i.code,{children:"aria-controls"}),". The ",e.jsx(i.code,{children:"audioTranscript"})," behavior collapses it on load; the markup itself renders it open, so it is reachable without playing the audio or running JavaScript."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Fallback"}),': Browsers without HTML5 audio support see the message "Your browser does not support the audio element."']}),`
`]}),`
`,e.jsx(i.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"The player scales to the content width of its container."}),`
`,e.jsx(i.li,{children:"Below the mobile breakpoint the volume control is hidden (device volume handles it) while the progress bar and playback controls remain usable."}),`
`]}),`
`,e.jsx(i.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(i.h3,{id:"basic-audio-embed",children:"Basic Audio Embed"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-twig",children:`{{ include('@molecules/audio/yds-audio.twig', {
  audio_embed__content: 'Get Your Kicks on Route 66',
  audio_embed__url: 'https://example.com/audio.mp3',
}) }}
`})}),`
`,e.jsx(i.h3,{id:"with-a-transcript",children:"With a Transcript"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-twig",children:`{{ include('@molecules/audio/yds-audio.twig', {
  audio_embed__content: 'Listen to this content',
  audio_embed__url: 'https://example.com/audio.mp3',
  audio_embed__transcript: '<p>Full transcript of the audio.</p>',
}) }}
`})}),`
`,e.jsxs(i.p,{children:["The transcript is passed through the text atom unescaped, to support Drupal's rich-text field output. In Drupal it comes from the Audio block's Transcription field, and a player with a transcript gets the ",e.jsx(i.code,{children:"audio-embed--has-transcript"}),' modifier, which Editoria11y uses to skip its "Does this audio have a transcript?" check.']}),`
`,e.jsxs(i.p,{children:["In Drupal the audio source is provided by the block's media field, so ",e.jsx(i.code,{children:"audio_embed__url"})," is used mainly for the Storybook preview and standalone examples."]}),`
`,e.jsx(i.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive visual regression testing with all audio player variations and theme combinations, see the ",e.jsx(i.a,{href:"?path=/story/molecules-audio-player-visreg--old-blues",children:"Visreg page"}),"."]})]})}function f(s={}){const{wrapper:i}={...l(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(a,{...s})}):a(s)}export{f as default};
//# sourceMappingURL=audio-By03-snx.js.map
