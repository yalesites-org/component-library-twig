import referenceCardTwig from './examples/_card--examples.twig';
import referenceCardData from './examples/post-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';

/**
 * Contrast Testing Story - displays all theme combinations for accessibility testing
 */
export default {
  title: 'Testing/Contrast Analysis',
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export const AllThemeCombinations = () => {
  const globalThemes = [
    { key: 'one', label: 'Old Blues' },
    { key: 'two', label: 'New Haven Green' },
    { key: 'three', label: 'Shoreline Summer' },
    { key: 'four', label: 'Onha' },
    { key: 'five', label: "It's Your Yale" },
    { key: 'six', label: 'AI' },
  ];

  const componentThemes = [
    { key: 'one', label: 'Theme One' },
    { key: 'two', label: 'Theme Two' },
    { key: 'three', label: 'Theme Three' },
    { key: 'four', label: 'Theme Four' },
    { key: 'five', label: 'Theme Five' },
  ];

  const categoriesArray = [
    { content: 'Computer Science' },
    { content: 'Business' },
    { content: 'Law' },
  ];
  const tagsArray = [
    { content: 'Public Event' },
    { content: 'Campus Event' },
    { content: 'Exhibitions' },
  ];

  let output = `
    <div style="padding: 20px;">
      <h1>Reference Card Contrast Testing - All Theme Combinations</h1>
      <p>This page displays all 30 possible theme combinations for accessibility testing.</p>
      <p>The Accessibility addon will automatically flag any contrast violations.</p>
    </div>
  `;

  globalThemes.forEach((globalTheme) => {
    output += `
      <div data-global-theme="${globalTheme.key}" style="margin: 40px 0; padding: 20px; border: 2px solid #ccc;">
        <h2>Global Theme: ${globalTheme.label}</h2>
    `;

    componentThemes.forEach((componentTheme) => {
      output += `
        <div style="margin: 40px 0;">
          <h3 style="margin-bottom: 20px;">Component Theme: ${
            componentTheme.label
          }</h3>
          <div class='card-collection' data-component-width='site' data-collection-type='single' data-collection-featured='true' data-component-theme='${
            componentTheme.key
          }'>
            <div class='card-collection__inner'>
              <ul class='card-collection__cards'>
                ${referenceCardTwig({
                  card_collection__source_type: 'post',
                  card_collection__type: 'single',
                  card_collection__featured: 'true',
                  ...imageData.responsive_images['3x2'],
                  reference_card__date: referenceCardData.reference_card__date,
                  reference_card__heading: `${globalTheme.label} × ${componentTheme.label}`,
                  reference_card__snippet:
                    'Testing contrast for this theme combination. This text should have proper contrast against the background.',
                  reference_card__featured: 'true',
                  reference_card__image: 'true',
                  reference_card__url: '#',
                  show_categories: 'true',
                  show_tags: 'true',
                  reference_card__categories: categoriesArray,
                  reference_card__tags: tagsArray,
                })}
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    output += `
      </div>
    `;
  });

  return output;
};

AllThemeCombinations.parameters = {
  docs: {
    description: {
      story:
        'Displays all 30 theme combinations in a single view for comprehensive accessibility testing. The a11y addon will automatically flag any contrast violations for easy identification.',
    },
  },
};
