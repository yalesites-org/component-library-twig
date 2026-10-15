import{g as _,d,e as u,D as g,T as f}from"../iframe.js";import{i as o}from"./image-CSdbOboU.js";import{c as S}from"./global-theme-stories-BeJELyur.js";import{c as p,a as w}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const I={tags:["visreg"],title:"Molecules/Meta/Profile Meta/Visreg",parameters:{chromatic:{disableSnapshot:!1},controls:{disable:!0},docs:{description:{component:`Storybook Definition.

Profile Meta has its own visreg file rather than sharing
\`Molecules/Meta/Visreg\` with Basic and Resource Meta, for the same reason
Event Meta does. With both of its sweeps stacked under the other two, the
shared story reached 1,200 x 19,638 = 23,565,600px, 94% of the 25,000,000px
snapshot ceiling.

It uses the two sweeps the other own-theme components use (callout, quote
callout, wrapped callout, accordion, action banner): every section theme
with the background fixed at \`one\`, then every component-theme background on
section \`one\`.

\`yds-profile-meta.twig\` puts its own \`data-component-theme\` on itself, taken
from \`profile_meta__background\`, and \`_yds-profile-meta.scss\` keys off that --
so the component paints its own background over the section behind it, and
the section sweep is expected to render the same block each time.
YaleSites-Internal#1601 dropped that sweep for that reason; it is back for
consistency with the other own-theme components, so a section theme that
ever does reach the block shows up here the same way it would there.`}}}},l=(t,h)=>w(t,f({...o.responsive_images["3x2"],profile_meta__heading:"Person Namerton",profile_meta__title_line:"Professional Title",profile_meta__subtitle_line:"Subtitle",profile_meta__department:"Department name",profile_meta__pronouns:"They/They/Them",profile_meta__background:h,profile_meta__image_orientation:"landscape",image__srcset__1:o.responsive_images["2x3"].image__srcset,image__sizes__1:o.responsive_images["2x3"].image__sizes,image__alt__1:o.responsive_images["2x3"].image__alt,image__src__1:o.responsive_images["2x3"].image__src,profile_meta__image_style:"inline",profile_meta__image_alignment:"right"})),b=()=>`
  ${p(t=>l(t,"one"),u,"Profile Meta: All Section Theme Variations","","Section Theme")}
  ${p(t=>l("one",t),g,"Profile Meta: All Background Variations","","Background")}
`,e=S(b,d,_),s=e.one,a=e.two,i=e.three,n=e.four,r=e.five,m=e.six,c=e.seven;r.storyName="It’s Your Yale";s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"themeStories.one",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"themeStories.two",...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"themeStories.three",...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"themeStories.four",...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"themeStories.five",...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"themeStories.six",...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"themeStories.seven",...c.parameters?.docs?.source}}};const P=["OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter"];export{m as AI,r as ItsYourYale,a as NewHavenGreen,s as OldBlues,n as Onha,i as ShorelineSummer,c as WhitneyHumanitiesCenter,P as __namedExportsOrder,I as default};
//# sourceMappingURL=profile-meta.visreg.stories-BTyj8sJq.js.map
