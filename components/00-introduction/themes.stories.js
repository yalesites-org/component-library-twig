import calloutTwig from '../02-molecules/callout/yds-callout.twig';
import textFieldTwig from '../02-molecules/text/yds-text-field.twig';
import pageTitleTwig from '../02-molecules/page-title/yds-page-title.twig';
import headingTwig from '../01-atoms/typography/headings/yds-heading.twig';
import dividerTwig from '../01-atoms/divider/yds-divider.twig';
import listTwig from '../01-atoms/lists/yds-list.twig';

export default {
  title: 'Introduction/Theme System',
  parameters: {
    layout: 'fullscreen',
  },
};

const themesHTML = `
  <div class="wrap-for-global-theme" data-global-theme="one">
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

          ${calloutTwig({
            callouts: [
              {
                callout__heading: '1. Global Theme (Lever)',
                callout__text: `
                  <p><em>Site-wide color palette</em></p>
                  <p>
                    The global theme is the foundation of your entire site's color scheme. It's called a "lever" because
                    switching it fundamentally changes all the color values used throughout the site.
                  </p>

                  <p><strong>Available options (6):</strong></p>
                  <ul>
                    <li><code>one</code> - Old Blues</li>
                    <li><code>two</code> - New Haven Green</li>
                    <li><code>three</code> - Shoreline Summer</li>
                    <li><code>four</code> - Onha</li>
                    <li><code>five</code> - It's Your Yale</li>
                    <li><code>six</code> - AI</li>
                  </ul>

                  <p><strong>Where you control it:</strong></p>
                  <ul>
                    <li>In CMS: Site-level global theme setting</li>
                    <li>In Storybook: Top toolbar "Site: Global Theme (lever)"</li>
                  </ul>

                  <p><strong>What it does:</strong></p>
                  <ul>
                    <li>Changes the actual color values in the design system</li>
                    <li>Affects how section and component themes render</li>
                    <li>Typically set once per site and rarely changed</li>
                  </ul>
                `,
              },
              {
                callout__heading: '2. Section Theme',
                callout__text: `
                  <p><em>Background colors for page sections</em></p>
                  <p>
                    Section themes control the background color of layout sections. Think of them as the "canvas"
                    on which components are placed. They create visual hierarchy and group related content.
                  </p>

                  <p><strong>Available options (5):</strong></p>
                  <ul>
                    <li><code>default</code> - White/light background</li>
                    <li><code>one</code> - Primary brand color</li>
                    <li><code>two</code> - Secondary color</li>
                    <li><code>three</code> - Tertiary color</li>
                    <li><code>four</code> - Quaternary color</li>
                  </ul>

                  <p><strong>Where you control it:</strong></p>
                  <ul>
                    <li>In CMS: Per-section or per-page</li>
                    <li>In Storybook: "Section Theme" control in playground stories</li>
                  </ul>

                  <p><strong>What it does:</strong></p>
                  <ul>
                    <li>Sets background color for an entire section</li>
                    <li>Actual colors come from the active global theme</li>
                    <li>Can vary by page section to create visual interest</li>
                  </ul>
                `,
              },
              {
                callout__heading: '3. Component Theme (Dial)',
                callout__text: `
                  <p><em>Accent colors for individual components</em></p>
                  <p>
                    Component themes control accent colors within individual components - headings, icons, borders,
                    and decorative elements. Called a "dial" in the CMS because you turn it to select different color accents.
                  </p>

                  <p><strong>Available options (5):</strong></p>
                  <ul>
                    <li><code>one</code> through <code>five</code> - Different color palettes</li>
                  </ul>

                  <p><strong>Where you control it:</strong></p>
                  <ul>
                    <li>In CMS: Per-component "color dial" setting</li>
                    <li>In Storybook: "[Component Name] Theme (dial)" controls</li>
                  </ul>

                  <p><strong>What it does:</strong></p>
                  <ul>
                    <li>Applies accent colors to a specific component</li>
                    <li>Actual colors come from the active global theme</li>
                    <li>Adds visual emphasis and variety within sections</li>
                  </ul>
                `,
              },
            ],
            callout__background_color: 'two',
            callout__width: 'site',
          })}

          ${headingTwig({
            heading__level: '2',
            heading: 'How They Work Together',
          })}

          ${calloutTwig({
            callouts: [
              {
                callout__heading: 'Example Combination',
                callout__text: `
                <p><strong>Global Theme:</strong> <code>one</code> (Old Blues)<br>
                → Sets the site's overall color palette to Yale's traditional blue-based colors</p>

                <p><strong>Section Theme:</strong> <code>two</code><br>
                → Within the Old Blues palette, this section gets a gray background</p>

                <p><strong>Component Theme (Accordion):</strong> <code>three</code><br>
                → Within that gray section, the accordion's headings use accent color three from Old Blues palette</p>

                <p><strong>Result:</strong> A cohesive design where the accordion's accent colors complement both
                the section's gray background and the overall Old Blues color scheme.</p>
              `,
              },
            ],
            callout__background_color: 'three',
            callout__width: 'site',
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

          ${calloutTwig({
            callouts: [
              {
                callout__heading: 'Top Toolbar (Global Controls)',
                callout__text: `
                  <ul>
                    <li><strong>Site: Global Theme (lever)</strong> - Changes the entire color palette for all stories</li>
                    <li><strong>Typography: Heading Fonts</strong> - Changes font pairings (separate from themes)</li>
                  </ul>
                `,
              },
              {
                callout__heading: 'Controls Panel (Story-Specific)',
                callout__text: `
                  <ul>
                    <li><strong>Section Theme</strong> - Background color for the demo section</li>
                    <li><strong>[Component] Theme (dial)</strong> - Accent colors for the specific component being demoed</li>
                  </ul>
                `,
              },
              {
                callout__heading: 'VRT Sections (Below Controls)',
                callout__text: `
                  <p>
                    Playground stories show all theme variations for visual regression testing. These sections demonstrate
                    how components look across all possible theme combinations, ensuring consistent rendering.
                  </p>
                `,
              },
            ],
            callout__background_color: 'one',
            callout__width: 'site',
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

          ${calloutTwig({
            callouts: [
              {
                callout__heading: 'For Developers',
                callout__text: `
                <ul>
                  <li>Developer documentation: <code>components/_storybook/README.md</code></li>
                  <li>Theme constants: <code>components/_storybook/theme-constants.js</code></li>
                  <li>See any playground story for examples of all three theme types in action</li>
                </ul>
              `,
              },
            ],
            callout__background_color: 'two',
            callout__width: 'site',
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
