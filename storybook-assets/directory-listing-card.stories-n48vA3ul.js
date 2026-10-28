import{I as _}from"../iframe.js";import{d as e}from"./yds-directory-listing-card-BNQB32qj.js";import{i as p}from"./image-CSdbOboU.js";import{t as g,a as y}from"./component-props-De-d7Djp.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const r={heading:{twigProp:"directory_listing_card__heading",name:"Heading",type:"string",required:!0,description:"The heading text for the directory listing card",control:"text"},subheading:{twigProp:"directory_listing_card__subheading",name:"Subheading",type:"string",required:!1,description:"Optional subheading text below the main heading",control:"text"},snippet:{twigProp:"directory_listing_card__snippet",name:"Snippet",type:"string",required:!1,description:"Descriptive text content for the listing",control:"text"},showEmail:{twigProp:"directory_listing_card__email",name:"Show Email",type:"boolean",required:!1,description:"Whether to display the email address",detail:`Controls whether the email address from the data file is passed to the Twig template. This is a Storybook-only UI toggle — the actual Twig prop is directory_listing_card__email.
`,default:!0,control:"boolean"},phone:{twigProp:"directory_listing_card__phone",name:"Phone",type:"string",required:!1,description:"Phone number to display",control:"text"},featured:{name:"Featured",type:"boolean",required:!1,description:"Whether the collection displays cards in a featured layout style",detail:`Controls the data-collection-featured attribute on the card collection wrapper. This is a Storybook-only UI toggle — it is not a direct Twig prop on the card template itself.
`,default:!0,control:"boolean"},overline:{twigProp:"directory_listing_card__overline",name:"Overline",type:"string",required:!1,description:"Optional overline text displayed above the heading",control:"text"}},w={title:"Molecules/Cards",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:y(r),args:{...g(r),heading:e.directory_listing_card__heading,subheading:e.directory_listing_card__subheading,snippet:e.directory_listing_card__snippet,phone:e.directory_listing_card__phone,overline:e.directory_listing_card__overline}},i=({collectionType:t,featured:o,heading:n,subheading:a,snippet:d,overline:c,showEmail:l,phone:s})=>`
<div class='card-collection' data-component-width='site' data-collection-type='profile-directory' data-collection-featured="${o}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${_({card_collection__source_type:"profile",card_collection__type:t,...p.responsive_images["1x1"],directory_listing_card__overline:c,directory_listing_card__heading:n,directory_listing_card__subheading:a,directory_listing_card__snippet:d,directory_listing_card__email:l?e.directory_listing_card__email:"",directory_listing_card__phone:s,directory_listing_card__url:e.directory_listing_card__url})}
    </ul>
  </div>
</div>
`;i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  collectionType,
  featured,
  heading,
  subheading,
  snippet,
  overline,
  showEmail,
  phone
}) => \`
<div class='card-collection' data-component-width='site' data-collection-type='profile-directory' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${directoryCardTwig({
  card_collection__source_type: 'profile',
  card_collection__type: collectionType,
  ...imageData.responsive_images['1x1'],
  directory_listing_card__overline: overline,
  directory_listing_card__heading: heading,
  directory_listing_card__subheading: subheading,
  directory_listing_card__snippet: snippet,
  directory_listing_card__email: showEmail ? directoryCardData.directory_listing_card__email : '',
  directory_listing_card__phone: phone,
  directory_listing_card__url: directoryCardData.directory_listing_card__url
})}
    </ul>
  </div>
</div>
\``,...i.parameters?.docs?.source}}};const x=["ProfileCardDirectoryListing"];export{i as ProfileCardDirectoryListing,x as __namedExportsOrder,w as default};
//# sourceMappingURL=directory-listing-card.stories-n48vA3ul.js.map
