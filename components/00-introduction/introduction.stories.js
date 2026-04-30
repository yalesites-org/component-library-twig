import calloutTwig from '../02-molecules/callout/yds-callout.twig';
import quickLinksTwig from '../02-molecules/quick-links/yds-quick-links.twig';
import textFieldTwig from '../02-molecules/text/yds-text-field.twig';
import pageTitleTwig from '../02-molecules/page-title/yds-page-title.twig';
import headingTwig from '../01-atoms/typography/headings/yds-heading.twig';
import dividerTwig from '../01-atoms/divider/yds-divider.twig';
import listTwig from '../01-atoms/lists/yds-list.twig';
import inlineMessageTwig from '../02-molecules/inline-message/yds-inline-message.twig';
import factsAndFiguresGroupTwig from '../03-organisms/facts-and-figures-group/yds-facts-and-figures-group.twig';

export default {
  title: 'Introduction/Welcome',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
};

const introductionHTML = `
  <div class="wrap-for-global-theme">
    <div data-component-theme="default" data-component-width="site" data-component-padding="no-padding" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">

          ${pageTitleTwig({
            page_title__heading: 'Welcome to the YaleSites Design System',
            page_title__width: 'site',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p class="lead-text">This is the comprehensive component library and design system for Yale University websites, built on atomic design principles.</p>',
            text_field__width: 'site',
          })}

          <div class="sb-reduce-padding">
          ${calloutTwig({
            callouts: [
              {
                callout__heading: 'About This Design System',
                callout__text: `
                <p>
                  The YaleSites Design System provides a consistent, accessible, and flexible foundation for building
                  websites across Yale University. It includes reusable components, design tokens, and comprehensive
                  documentation to ensure brand consistency and excellent user experiences.
                </p>
              `,
              },
            ],
            callout__background_color: 'one',
            callout__width: 'site',
          })}
          </div>

          ${headingTwig({
            heading__level: '2',
            heading: 'Atomic Design Principles',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p>Our component library is organized using <strong>Atomic Design</strong> methodology, breaking interfaces down into fundamental building blocks:</p>',
            text_field__width: 'site',
          })}

          ${factsAndFiguresGroupTwig({
            facts_and_figures__group__has_icon: 'true',
            facts_and_figures__group__presentation_style: 'with-icon',
            facts_and_figures__group__grid_count: 'four',
            facts_and_figures__group__theme: 'one',
            facts_and_figures__group__alignment: 'center',
            facts_and_figures__group: [
              {
                facts_and_figures__group__stat: 'Atoms',
                facts_and_figures__group__content:
                  "The foundational building blocks - buttons, links, inputs, headings, images, and other basic HTML elements that can't be broken down further.",
                facts_and_figures__has_icon: 'true',
                facts_and_figures__icon_name: 'atom-solid',
              },
              {
                facts_and_figures__group__stat: 'Molecules',
                facts_and_figures__group__content:
                  'Simple groups of atoms functioning together - cards, forms, search bars, navigation items, and other relatively simple components.',
                facts_and_figures__has_icon: 'true',
                facts_and_figures__icon_name: 'flask-solid',
              },
              {
                facts_and_figures__group__stat: 'Organisms',
                facts_and_figures__group__content:
                  'Complex components made of molecules and atoms - headers, footers, card collections, galleries, and other substantial interface sections.',
                facts_and_figures__has_icon: 'true',
                facts_and_figures__icon_name: 'gears',
              },
              {
                facts_and_figures__group__stat: 'Pages',
                facts_and_figures__group__content:
                  'Complete page layouts and examples combining organisms, molecules, and atoms into fully functional page templates and demonstrations.',
                facts_and_figures__has_icon: 'true',
                facts_and_figures__icon_name: 'book-solid',
              },
            ],
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'Organization Structure',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      '<strong>Tokens:</strong> Design system tokens including colors, typography, spacing, and effects',
                  },
                  {
                    list__item__content:
                      '<strong>Atoms:</strong> Basic elements like buttons, links, images, and form controls',
                  },
                  {
                    list__item__content:
                      '<strong>Molecules:</strong> Component combinations like cards, banners, navigation items, and content blocks',
                  },
                  {
                    list__item__content:
                      '<strong>Organisms:</strong> Complex sections like headers, footers, menus, and content collections',
                  },
                  {
                    list__item__content:
                      '<strong>Page Layouts:</strong> Page structure templates with various column configurations',
                  },
                  {
                    list__item__content:
                      '<strong>Page Examples:</strong> Complete page demonstrations showing real-world implementations',
                  },
                  {
                    list__item__content:
                      '<strong>Global Themes:</strong> Use the toolbar controls at the top to switch between global color themes and typography options',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'Global Themes & Typography',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p>Use the toolbar controls at the top of Storybook to:</p>',
            text_field__width: 'site',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      "<strong>Site: Global Theme:</strong> Switch between Yale's six global color palettes (Old Blues, New Haven Green, Shoreline Summer, Onha, It's Your Yale, AI)",
                  },
                  {
                    list__item__content:
                      '<strong>Typography: Heading Fonts:</strong> Switch between YaleNew, Mallory, and Yale Old-Style Numerals heading font pairings',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${inlineMessageTwig({
            inline_message__type: 'general',
            inline_message__heading: 'Tip',
            inline_message__content:
              '<p>These global controls apply to all components, allowing you to preview how designs adapt across different themes and typography settings.</p>',
            inline_message__theme: 'one',
          })}

          ${dividerTwig({
            divider__component_width: 'site',
          })}

          <div class="sb-reduce-padding">
          ${quickLinksTwig({
            quick_links__heading: 'Quick Links',
            quick_links__variation: 'promotional',
            quick_links__background_color: 'one',
            quick_links__links: [
              {
                quick_links__link__url: 'https://yalesites.yale.edu',
                quick_links__link__content: 'YaleSites Website',
              },
              {
                quick_links__link__url: 'https://github.com/yalesites-org',
                quick_links__link__content: 'GitHub Organization',
              },
              {
                quick_links__link__url:
                  'https://github.com/yalesites-org/component-library-twig',
                quick_links__link__content: 'Component Library Repo',
              },
            ],
          })}
          </div>

        </div>

        </div>

      </div>
    </div>
  </div>

  <div class="wrap-for-global-theme">
    <div data-component-theme="default" data-component-width="site" data-component-padding="no-padding" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">

          ${dividerTwig({
            divider__component_width: 'site',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p>Built with ❤️ for the Yale University community</p>',
            text_field__width: 'site',
            text_field__alignment: 'center',
          })}
        </div>

        </div>

      </div>
    </div>
  </div>
`;

export const Welcome = () => introductionHTML;
