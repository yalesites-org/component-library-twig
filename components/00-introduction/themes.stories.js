import calloutTwig from '../02-molecules/callout/yds-callout.twig';
import textFieldTwig from '../02-molecules/text/yds-text-field.twig';
import pageTitleTwig from '../02-molecules/page-title/yds-page-title.twig';
import headingTwig from '../01-atoms/typography/headings/yds-heading.twig';
import dividerTwig from '../01-atoms/divider/yds-divider.twig';
import listTwig from '../01-atoms/lists/yds-list.twig';

export default {
  title: 'Introduction/Theme System',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
};

const themesHTML = `
  <div class="wrap-for-global-theme">
    <div data-component-theme="default" data-component-width="site" data-component-padding="no-padding" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">

          ${pageTitleTwig({
            page_title__heading: 'Understanding the Theme System',
            page_title__width: 'site',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p class="lead-text">The Yale Sites component library uses a three-tier theme system that works together to create cohesive, flexible, and branded experiences. Understanding how these three types of themes interact is key to effectively using the design system.</p>',
            text_field__width: 'site',
          })}

          ${calloutTwig({
            callouts: [
              {
                callout__heading: 'Three Theme Types Working Together',
                callout__text: `
                <p>
                  Think of themes as layers: <strong>Global Theme</strong> sets the overall color palette,
                  <strong>Section Theme</strong> applies background colors to page sections, and
                  <strong>Component Theme (dial)</strong> adds accent colors to individual components.
                  Together, they create unlimited design combinations while maintaining brand consistency.
                </p>
              `,
              },
            ],
            callout__background_color: 'one',
            callout__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'The Three Theme Types',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: '1. Global Theme (Lever)',
          })}

          ${textFieldTwig({
            text_field__content: `
              <p><em>Site-wide color palette</em></p>
              <p>
                The global theme is the foundation of your entire site's color scheme. It's called a "lever" because
                switching it fundamentally changes all the color values used throughout the site.
              </p>
              <p><strong>Available options (6):</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  { list__item__content: '<code>one</code> - Old Blues' },
                  { list__item__content: '<code>two</code> - New Haven Green' },
                  {
                    list__item__content:
                      '<code>three</code> - Shoreline Summer',
                  },
                  { list__item__content: '<code>four</code> - Onha' },
                  { list__item__content: "<code>five</code> - It's Your Yale" },
                  { list__item__content: '<code>six</code> - AI' },
                ],
              })}
              <p><strong>Where you control it:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'In CMS: Site-level global theme setting',
                  },
                  {
                    list__item__content:
                      'In Storybook: Top toolbar "Site: Global Theme (lever)"',
                  },
                ],
              })}
              <p><strong>What it does:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'Changes the actual color values in the design system',
                  },
                  {
                    list__item__content:
                      'Affects how section and component themes render',
                  },
                  {
                    list__item__content:
                      'Typically set once per site and rarely changed',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: '2. Section Theme',
          })}

          ${textFieldTwig({
            text_field__content: `
              <p><em>Background colors for page sections</em></p>
              <p>
                Section themes control the background color of layout sections. Think of them as the "canvas"
                on which components are placed. They create visual hierarchy and group related content.
              </p>
              <p><strong>Available options (5):</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      '<code>default</code> - White/light background',
                  },
                  {
                    list__item__content:
                      '<code>one</code> - Primary brand color',
                  },
                  { list__item__content: '<code>two</code> - Secondary color' },
                  {
                    list__item__content: '<code>three</code> - Tertiary color',
                  },
                  {
                    list__item__content: '<code>four</code> - Quaternary color',
                  },
                ],
              })}
              <p><strong>Where you control it:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  { list__item__content: 'In CMS: Per-section or per-page' },
                  {
                    list__item__content:
                      'In Storybook: "Section Theme" control in playground stories',
                  },
                ],
              })}
              <p><strong>What it does:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'Sets background color for an entire section',
                  },
                  {
                    list__item__content:
                      'Actual colors come from the active global theme',
                  },
                  {
                    list__item__content:
                      'Can vary by page section to create visual interest',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: '3. Component Theme (Dial)',
          })}

          ${textFieldTwig({
            text_field__content: `
              <p><em>Accent colors for individual components</em></p>
              <p>
                Component themes control accent colors within individual components - headings, icons, borders,
                and decorative elements. Called a "dial" in the CMS because you turn it to select different color accents.
              </p>
              <p><strong>Available options (5):</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      '<code>one</code> through <code>five</code> - Different color palettes',
                  },
                ],
              })}
              <p><strong>Where you control it:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'In CMS: Per-component "color dial" setting',
                  },
                  {
                    list__item__content:
                      'In Storybook: "[Component Name] Theme (dial)" controls',
                  },
                ],
              })}
              <p><strong>What it does:</strong></p>
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'Applies accent colors to a specific component',
                  },
                  {
                    list__item__content:
                      'Actual colors come from the active global theme',
                  },
                  {
                    list__item__content:
                      'Adds visual emphasis and variety within sections',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'How They Work Together',
          })}

          ${textFieldTwig({
            text_field__content: `
              <p>Here's an example showing how all three theme types combine to create a cohesive design:</p>
              <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Theme Type</th>
                    <th scope="col">Setting</th>
                    <th scope="col">What It Does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Global Theme</th>
                    <td><code>one</code> (Old Blues)</td>
                    <td>Sets the site's overall color palette to Yale's traditional blue-based colors</td>
                  </tr>
                  <tr>
                    <th scope="row">Section Theme</th>
                    <td><code>two</code></td>
                    <td>Within the Old Blues palette, this section gets a gray background</td>
                  </tr>
                  <tr>
                    <th scope="row">Component Theme<br>(Accordion)</th>
                    <td><code>three</code></td>
                    <td>Within that gray section, the accordion's headings use accent color three from Old Blues palette</td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Result</strong></th>
                    <td colspan="2"><strong>A cohesive design where the accordion's accent colors complement both the section's gray background and the overall Old Blues color scheme.</strong></td>
                  </tr>
                </tbody>
              </table>
              </div>
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'Key Differences Explained',
          })}

          ${textFieldTwig({
            text_field__content: `
            <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Global Theme (Lever)</th>
                  <th scope="col">Section Theme</th>
                  <th scope="col">Component Theme (Dial)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Scope</th>
                  <td>Entire site</td>
                  <td>Page section</td>
                  <td>Individual component</td>
                </tr>
                <tr>
                  <th scope="row">Options</th>
                  <td>6 palettes</td>
                  <td>5 background options</td>
                  <td>5 accent options</td>
                </tr>
                <tr>
                  <th scope="row">CMS Name</th>
                  <td>Global Theme (lever)</td>
                  <td>Theme or Section Theme</td>
                  <td>Color Dial</td>
                </tr>
                <tr>
                  <th scope="row">Controls</th>
                  <td>Color palette values</td>
                  <td>Background colors</td>
                  <td>Accent colors</td>
                </tr>
                <tr>
                  <th scope="row">Change Frequency</th>
                  <td>Rarely (site-level decision)</td>
                  <td>Per page or section</td>
                  <td>Per component instance</td>
                </tr>
                <tr>
                  <th scope="row">Example</th>
                  <td>Old Blues, New Haven Green</td>
                  <td>White section, blue section</td>
                  <td>Green accordion, orange card</td>
                </tr>
              </tbody>
            </table>
            </div>
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'Using Themes in Storybook',
          })}

          ${textFieldTwig({
            text_field__content:
              "<p>When exploring components in Storybook, you'll see all three theme types represented:</p>",
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: 'Top Toolbar (Global Controls)',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      '<strong>Site: Global Theme (lever)</strong> - Changes the entire color palette for all stories',
                  },
                  {
                    list__item__content:
                      '<strong>Typography: Heading Fonts</strong> - Changes font pairings (separate from themes)',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: 'Controls Panel (Story-Specific)',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      '<strong>Section Theme</strong> - Background color for the demo section',
                  },
                  {
                    list__item__content:
                      '<strong>[Component] Theme (dial)</strong> - Accent colors for the specific component being demoed',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: 'VRT Sections (Visual Regression Testing)',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p>Below the interactive controls, playground stories show all theme variations for visual regression testing (VRT). These sections demonstrate how components look across all possible theme combinations, ensuring consistent rendering and catching any visual bugs.</p>',
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'Best Practices',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      "<strong>Choose your global theme carefully</strong> - It affects the entire site and should align with your department or school's brand",
                  },
                  {
                    list__item__content:
                      '<strong>Use section themes to create hierarchy</strong> - Alternate between light and colored backgrounds to group content',
                  },
                  {
                    list__item__content:
                      '<strong>Apply component themes purposefully</strong> - Not every component needs a custom dial setting; use them to emphasize key content',
                  },
                  {
                    list__item__content:
                      '<strong>Test combinations</strong> - Use Storybook to preview how themes work together before publishing',
                  },
                  {
                    list__item__content:
                      '<strong>Maintain contrast</strong> - Always ensure text remains readable against chosen backgrounds',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${headingTwig({
            heading__level: '3',
            heading: 'For Developers',
          })}

          ${textFieldTwig({
            text_field__content: `
              ${listTwig({
                list__type: 'ul',
                list__items: [
                  {
                    list__item__content:
                      'Developer documentation: <code>components/_storybook/README.md</code>',
                  },
                  {
                    list__item__content:
                      'Theme constants: <code>components/_storybook/theme-constants.js</code>',
                  },
                  {
                    list__item__content:
                      'See any playground story for examples of all three theme types in action',
                  },
                ],
              })}
            `,
            text_field__width: 'site',
          })}

          ${dividerTwig({
            divider__component_width: 'site',
          })}

          ${textFieldTwig({
            text_field__content:
              '<p><em>The three-tier theme system provides flexibility and consistency. By understanding how global themes, section themes, and component themes work together, you can create beautiful, accessible, and on-brand experiences that are uniquely Yale.</em></p>',
            text_field__width: 'site',
            text_field__alignment: 'center',
          })}
        </div>

        </div>

      </div>
    </div>
  </div>
`;

export const ThemeSystem = () => themesHTML;
