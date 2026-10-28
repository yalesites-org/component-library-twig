import{u as n,j as e,M as r,C as a}from"./blocks-BudrnkdM.js";import{ColorGlobalThemes as l}from"./colors.stories-C6A1FYeK.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./color-global-themes-C7UI5K9x.js";import"./yds-text-copy-button-li-VLzqi.js";import"./utility-nav-cXaVPHEz.js";import"./primary-nav-3-07Xq0g.js";import"./yds-menu-toggle-CCw3uUL5.js";import"./yds-tabs-Egev4hry.js";import"./quick-links-vBLtUtYH.js";import"./image-CSdbOboU.js";import"./tabs-Dl0Hirov.js";import"./banner-CWi5B0T_.js";function s(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Tokens/Colors/Color Palettes (Theme)"}),`
`,e.jsx(t.h1,{id:"color-palettes-theme",children:"Color Palettes (Theme)"}),`
`,e.jsx(t.p,{children:"Global themes are the top-level color palettes available to YaleSites. Each theme defines nine color slots that cascade through the entire site — changing the global theme shifts the colors used by every component, section, and layout on the page."}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.strong,{children:"Site: Global Theme (lever)"})," toolbar control at the top of Storybook to preview the full design system in any theme."]}),`
`,e.jsxs(t.p,{children:["To see the measured contrast ratio between any two slots in a theme, see the ",e.jsx(t.a,{href:"?path=/docs/tokens-colors-contrast-matrix--docs",children:"Contrast Matrix"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," Some palettes are designated for specific Yale units or programs. For example, the IYY palette is reserved for OPAC and your.yale.edu. If your site is not part of that program's offerings, do not use that palette. When in doubt, check with the YaleSites team before selecting a non-standard palette."]}),`
`]}),`
`,e.jsx(t.h2,{id:"palette-overview",children:"Palette Overview"}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(a,{of:l})}),`
`,e.jsx(t.h2,{id:"theme-colors--slots-15-and-9",children:"Theme Colors — Slots 1–5 and 9"}),`
`,e.jsx(t.p,{children:"Slots 1–5 and Slot 9 are the customizable palette for each theme. These are the colors that give each theme its distinct personality and vary between themes. They are used across:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 1"})," — Primary brand color. Used for dominant UI surfaces like headers, hero banners, and primary buttons."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 2"})," — Secondary brand color. Used for section backgrounds, card accents, and secondary CTAs."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 3"})," — Accent color. Used for highlights, hover states, tags, and decorative elements."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 4"})," — Light background. Used for subtle section backgrounds and surface variants that need a low-contrast wash."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 5"})," — Dark tone. Used for text on light backgrounds, borders, and muted UI elements."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 9"})," — Light neutral surface. A near-white or very light tint used for subtle fills and dividers; it varies per theme alongside slots 1–5."]}),`
`]}),`
`,e.jsx(t.p,{children:'These slots are what component theme dials (1–5) map to — so a callout set to "dial two" will always pull from Slot 2 of whatever global theme is active.'}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Section backgrounds:"})," When choosing a background color for a page section in Drupal, the available options are limited to a curated set of colors from the active palette that have been validated to meet WCAG 2.1 AA contrast standards. These constraints are built into the Drupal UI — you don't need to manually verify accessibility when using the provided options."]}),`
`]}),`
`,e.jsx(t.h2,{id:"yale-brand-colors--slots-68",children:"Yale Brand Colors — Slots 6–8"}),`
`,e.jsx(t.p,{children:"Slots 6–8 are fixed across every theme and cannot be changed. They represent the non-negotiable Yale brand colors that must be present on every site regardless of palette:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 6"})," — Yale Blue (",e.jsx(t.code,{children:"#00356b"}),"). Always present as the official Yale brand anchor color. The token stores this slot as ",e.jsx(t.code,{children:"hsl(210, 100%, 21%)"}),", a rounded HSL that converts back to ",e.jsx(t.code,{children:"#00366b"}),", so tools reading the token — including the Contrast Matrix — report that value rather than the exact brand hex."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 7"})," — Near Black. Used for body text and high-contrast elements."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Slot 8"})," — White. Used for text on dark backgrounds and primary surface whites."]}),`
`]}),`
`,e.jsx(t.p,{children:"These slots exist to ensure that no matter which global theme a site uses, core Yale branding — particularly Yale Blue — is always available and consistent across all properties."}),`
`,e.jsx(t.h2,{id:"how-global-themes-work",children:"How Global Themes Work"}),`
`,e.jsx(t.p,{children:'Component themes (dials) reference slots by number. A component set to "dial one" always maps to Slot 1 of the active global theme, making every component in the system automatically theme-aware. Switching the global theme lever in Drupal (or the toolbar in Storybook) cascades through all nine slots simultaneously.'}),`
`,e.jsxs(t.p,{children:["For a deeper explanation of how global, section, and component themes layer together, see the ",e.jsx(t.a,{href:"?path=/docs/introduction-theme-system--docs",children:"Theme System page"}),"."]})]})}function k(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(s,{...o})}):s(o)}export{k as default};
//# sourceMappingURL=color-global-themes-Cv3dPQjD.js.map
