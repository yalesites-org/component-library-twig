import{R as s,S as o}from"../iframe.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const d={title:"Molecules/Menu Toggle",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition.\n\nThe mobile menu button — the primary navigation control for every visitor on\na narrow viewport. It ships inside `yds-site-header.twig` and, until this\nstory, appeared in no story of its own, so none of its colour pairings had\never been measured (yalesites-org/YaleSites-Internal#1757, from the control\nparity audit in `docs/storybook-drupal-control-parity.md`).\n\nIt is rendered here inside `.site-header[data-header-theme]` rather than on\nits own, and that is the whole point of the story. The bars are painted with\n`var(--color-text)`, which is defined ONLY inside that themed wrapper — a\nbare `.menu-toggle` resolves it to whatever the page happens to carry and\nwould measure clean while being wrong.\n\nOn a real page the button sits one level deeper, in `.site-header__mobile-\nheader`, which is `display: none` above the mobile breakpoint. That wrapper\npaints itself with `var(--color-background)`, which the theme block maps to\nthe same `--color-site-header-background` used here, so the pairing shown is\nthe pairing that ships; skipping it only keeps the story visible at any\nwidth.\n\nHeader **accent** is deliberately not varied: `data-header-accent` only\nremaps `--color-site-header-border-color`, which this component never reads.\nGlobal theme is not varied either — unlike most components, the three header\nthemes map text and background to fixed primitives rather than to palette\nslots, so the toggle's contrast is the same under every global theme. Those\ntwo facts are why three rows cover it completely.\n\nDeliberately carries no `tags: ['!dev']`: that would take the entry out of\nthe sidebar, which is only safe when an `*.mdx` supplies one in its place.\nThis component has no MDX page, so it follows `Molecules/Modal`,\n`Organisms/Galleries` and `Templates/Two Column (70/30)` and stays untagged."}}}},n=(e,a)=>`
  <div
    class="site-header"
    data-header-theme="${e}"
    data-main-menu-state="${a?"open":"closed"}"
  >
    ${o({main_menu_toggle__aria_expanded:a?"true":"false"})}
  </div>
`,t=()=>s.map(e=>`
        <div class="sb-section__group">
          <p class="sb-section__subheading">Header theme ${e} — closed</p>
          ${n(e,!1)}
          <p class="sb-section__subheading">Header theme ${e} — open</p>
          ${n(e,!0)}
        </div>
      `).join("");t.storyName="Menu Toggle";t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => siteHeaderThemes.map(theme => \`
        <div class="sb-section__group">
          <p class="sb-section__subheading">Header theme \${theme} — closed</p>
          \${headerStrip(theme, false)}
          <p class="sb-section__subheading">Header theme \${theme} — open</p>
          \${headerStrip(theme, true)}
        </div>
      \`).join('')`,...t.parameters?.docs?.source}}};const l=["MenuToggle"];export{t as MenuToggle,l as __namedExportsOrder,d as default};
//# sourceMappingURL=menu-toggle.stories-Tlxq3g8N.js.map
