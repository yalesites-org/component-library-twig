import{D as s,M as i}from"../iframe.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const h={title:"Molecules/In This Section Toggle",parameters:{layout:"fullscreen",viewport:{defaultViewport:"mobile1"},docs:{description:{component:"Storybook Definition.\n\nThe \"In This Section\" button — the control that opens the section navigation\non a narrow viewport. It ships inside `yds-site-in-this-section.twig` and,\nuntil this story, appeared in no story of its own, so none of its colour\npairings had ever been measured (yalesites-org/YaleSites-Internal#1757, from\nthe control parity audit in `docs/storybook-drupal-control-parity.md`).\n\nIt is rendered here inside `.in-this-section[data-component-theme]` rather\nthan on its own, and that is the whole point of the story. The icon and\nlabel are painted with `var(--color-link-base)`, which is defined ONLY\ninside that themed wrapper — a bare `.secondary-menu-toggle` resolves it to\nwhatever the page happens to carry and would measure clean while being\nwrong.\n\n**This component is mobile-only.** `.in-this-section .secondary-menu-toggle`\nis `display: none` above the mobile breakpoint, and the rules that give it a\nbackground live inside that same media query, so the story sets a mobile\nviewport. At a wider viewport it correctly renders nothing.\n\nUnlike `Molecules/Menu Toggle`, this one IS global-theme dependent: component\nthemes one, two and three map `--color-link-base` to `--color-slot-one`,\nwhich the global theme repoints. Use the global theme toolbar to walk the\npalettes. Themes four and five set no `--color-link-base` of their own, so\nthey inherit — that inheritance is exactly what this story makes visible.\n\nDeliberately carries no `tags: ['!dev']`: that would take the entry out of\nthe sidebar, which is only safe when an `*.mdx` supplies one in its place.\nThis component has no MDX page, so it follows `Molecules/Modal`,\n`Organisms/Galleries` and `Templates/Two Column (70/30)` and stays untagged."}}}},t=(e,o)=>`
  <div
    class="in-this-section"
    data-component-theme="${e}"
    data-secondary-menu-state="${o?"open":"closed"}"
  >
    ${i({secondary_menu_toggle__aria_expanded:o?"true":"false",secondary_menu_toggle__text:o?"Close":"In This Section"})}
  </div>
`,n=()=>s.map(e=>`
        <div class="sb-section__group">
          <p class="sb-section__subheading">Component theme ${e} — closed</p>
          ${t(e,!1)}
          <p class="sb-section__subheading">Component theme ${e} — open</p>
          ${t(e,!0)}
        </div>
      `).join("");n.storyName="In This Section Toggle";n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => componentThemes.map(theme => \`
        <div class="sb-section__group">
          <p class="sb-section__subheading">Component theme \${theme} — closed</p>
          \${sectionWrapper(theme, false)}
          <p class="sb-section__subheading">Component theme \${theme} — open</p>
          \${sectionWrapper(theme, true)}
        </div>
      \`).join('')`,...n.parameters?.docs?.source}}};const c=["InThisSectionToggle"];export{n as InThisSectionToggle,c as __namedExportsOrder,h as default};
//# sourceMappingURL=menu-in-this-section-toggle.stories-DOe-i91X.js.map
