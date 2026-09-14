// Markup.
import twoColumnTwig from './two-column/_two-column--example.twig';

// Data files
import textData from '../../02-molecules/text/text-field.yml';

/**
 * Storybook Definition.
 *
 * The Two Column (70/30) section, which ships as the `ys_layout_two_column` Layout Builder
 * layout. Unlike `Templates/Layout` it declares no controls and has no `*-props.yml`, because
 * `yds-two-column.twig` takes none -- it hardcodes `data-component-width='site'`, emits no
 * `data-component-theme` or `data-component-padding`, and reads only the two content regions.
 *
 * On the Drupal side that is only mostly true. `ys_layouts.layouts.yml` gives this layout no
 * `class:`, so it never reaches `YSLayoutOptions` and an editor gets no theme and no divider.
 * It does still get PADDING: with no `class:` the plugin falls back to core's `LayoutDefault`,
 * which implements `PluginFormInterface`, and `ys_layouts`' section-form alter is keyed on the
 * form ID rather than the layout plugin, so it adds `padding_options` to every section alike.
 * Padding is therefore `Drupal-only` here -- reachable in the CMS, unshowable in this story.
 *
 * It is here so the section can be previewed and contrast-checked at all; use the global
 * theme toolbar to see it against each palette, which is the only colour variation it has.
 * See `docs/storybook-drupal-control-parity.md` for the wider audit this came out of
 * (yalesites-org/YaleSites-Internal#1661).
 */
export default {
  title: 'Templates/Two Column (70/30)',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const twoColumn = () => twoColumnTwig(textData);

twoColumn.storyName = 'Two Column (70/30)';
