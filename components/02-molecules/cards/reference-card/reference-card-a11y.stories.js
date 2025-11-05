import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import getGlobalThemes from '../../../00-tokens/colors/color-global-themes';
import referenceCardTwig from './examples/_card--examples.twig';
import referenceCardData from './examples/post-card.yml';
import eventCardData from './examples/event-card.yml';
import referenceProfileCardData from './examples/profile-card.yml';
import referencePageCardData from './examples/page-card.yml';
import referenceResourceData from './examples/resource-card.yml';
import imageData from '../../../01-atoms/images/image/image.yml';
import { transformToObjectArray } from '../../../utility';

const siteGlobalThemeOptions = getGlobalThemes(tokens['global-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Cards',
  parameters: {
    layout: 'fullscreen',
  },
};

export const AccessibilityTesting = ({ globalTheme }) => {
  const componentThemes = ['one', 'two', 'three', 'four', 'five'];
  const collectionTypes = ['grid', 'list', 'condensed', 'single'];
  const categoriesArray = transformToObjectArray(
    'Computer Science, Business, Law',
  );
  const tagsArray = transformToObjectArray(
    'Public Event, Campus Event, Exhibitions',
  );

  const renderPostCard = (componentTheme, collectionType) => {
    return `
      <div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="true">
        <div class='card-collection__inner'>
          <ul class='card-collection__cards'>
            ${referenceCardTwig({
              card_collection__source_type: 'post',
              card_collection__type: collectionType,
              ...imageData.responsive_images['3x2'],
              reference_card__date: referenceCardData.reference_card__date,
              reference_card__eyebrow: 'Featured Story',
              reference_card__heading:
                referenceCardData.reference_card__heading,
              reference_card__snippet:
                referenceCardData.reference_card__snippet,
              reference_card__featured: 'true',
              reference_card__image: 'true',
              reference_card__url: referenceCardData.reference_card__url,
              reference_card__component_theme: componentTheme,
              show_categories: 'true',
              show_eyebrow: 'true',
              show_tags: 'true',
              reference_card__categories: categoriesArray,
              reference_card__tags: tagsArray,
              reference_card__overlay: 'Pinned',
            })}
          </ul>
        </div>
      </div>
    `;
  };

  const renderEventCard = (componentTheme, collectionType) => {
    return `
      <div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="true">
        <div class='card-collection__inner'>
          <ul class='card-collection__cards'>
            ${referenceCardTwig({
              card_collection__source_type: 'event',
              card_collection__type: collectionType,
              ...imageData.responsive_images['3x2'],
              format: 'Online',
              reference_card__heading: eventCardData.reference_card__heading,
              reference_card__prefix: 'Upcoming Event',
              reference_card__snippet: eventCardData.reference_card__snippet,
              reference_card__date: eventCardData.reference_card__date,
              reference_card__featured: 'true',
              reference_card__image: 'true',
              reference_card__url: referenceCardData.reference_card__url,
              reference_card__component_theme: componentTheme,
              reference_card__cta_primary__href: 'https://yale.edu',
              reference_card__cta_primary__content: 'Buy Tickets',
              reference_card__cta_secondary__href: 'https://yale.edu',
              reference_card__cta_secondary__content: 'Add to Calendar',
              multi_day_event: true,
              reference_card__categories: categoriesArray,
              show_categories: 'true',
              reference_card__tags: tagsArray,
              show_tags: 'true',
            })}
          </ul>
        </div>
      </div>
    `;
  };

  const renderProfileCard = (componentTheme, collectionType) => {
    return `
      <div class='card-collection' data-component-width='site' data-collection-source='profile' data-collection-type='${collectionType}' data-collection-featured="true">
        <div class='card-collection__inner'>
          <ul class='card-collection__cards'>
            ${referenceCardTwig({
              card_collection__source_type: 'profile',
              card_collection__type: collectionType,
              ...imageData.responsive_images['1x1'],
              reference_card__featured: 'true',
              reference_card__image: 'true',
              reference_card__heading:
                referenceProfileCardData.reference_card__heading,
              reference_card__heading_extra:
                referenceProfileCardData.reference_card__pronouns,
              reference_card__subheading:
                referenceProfileCardData.reference_card__subheading,
              reference_card__snippet:
                referenceProfileCardData.reference_card__snippet,
              reference_card__url: referenceProfileCardData.reference_card__url,
              reference_card__component_theme: componentTheme,
              reference_card__categories: categoriesArray,
              show_categories: 'true',
              show_pronouns: 'true',
              reference_card__tags: tagsArray,
              show_tags: 'true',
            })}
          </ul>
        </div>
      </div>
    `;
  };

  const renderPageCard = (componentTheme, collectionType) => {
    return `
      <div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="true">
        <div class='card-collection__inner'>
          <ul class='card-collection__cards'>
            ${referenceCardTwig({
              card_collection__source_type: 'page',
              card_collection__type: collectionType,
              ...imageData.responsive_images['3x2'],
              reference_card__eyebrow: 'Important Page',
              reference_card__heading:
                referencePageCardData.reference_card__heading,
              reference_card__snippet:
                referencePageCardData.reference_card__snippet,
              reference_card__featured: 'true',
              reference_card__image: 'true',
              reference_card__url: referencePageCardData.reference_card__url,
              reference_card__component_theme: componentTheme,
              show_categories: 'true',
              show_eyebrow: 'true',
              show_tags: 'true',
              show_thumbnail: 'true',
              reference_card__categories: categoriesArray,
              reference_card__tags: tagsArray,
            })}
          </ul>
        </div>
      </div>
    `;
  };

  const renderResourceCard = (componentTheme, collectionType) => {
    return `
      <div class='card-collection' data-component-width='site' data-collection-type='${collectionType}' data-collection-featured="true">
        <div class='card-collection__inner'>
          <ul class='card-collection__cards'>
            ${referenceCardTwig({
              card_collection__source_type: 'resource',
              card_collection__type: collectionType,
              ...imageData.responsive_images['3x2'],
              reference_card__date: referenceResourceData.reference_card__date,
              reference_card__eyebrow: 'Resource Document',
              reference_card__heading:
                referenceResourceData.reference_card__heading,
              reference_card__snippet:
                referenceResourceData.reference_card__snippet,
              reference_card__featured: 'true',
              reference_card__image: 'true',
              reference_card__url: referenceResourceData.reference_card__url,
              reference_card__component_theme: componentTheme,
              show_categories: 'true',
              show_eyebrow: 'true',
              show_tags: 'true',
              reference_card__categories: categoriesArray,
              reference_card__tags: tagsArray,
              reference_card__overlay: 'Download',
            })}
          </ul>
        </div>
      </div>
    `;
  };

  return `
    <div class="wrap-for-global-theme" data-global-theme="${globalTheme}">
      <style>
        .a11y-test-section {
          margin-bottom: 4rem;
        }
        .a11y-test-section > h2 {
          font-size: 2rem;
          font-weight: bold;
          margin: 2rem 0 1rem;
          padding: 1rem;
          background: #f5f5f5;
        }
        .a11y-test-card {
          margin-bottom: 2rem;
        }
      </style>

      <div style="padding: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">
          Reference Card Accessibility Testing
        </h1>
        <p style="font-size: 1.25rem; margin-bottom: 2rem;">
          Testing all reference card types (Post, Event, Profile, Page, Resource) across all component themes (one through five) and all collection types (grid, list, condensed, single).
          <br>
          <strong>All optional features enabled:</strong> Eyebrow, Categories, Tags, Pronouns, Overlays, CTAs, etc.
          <br>
          Use the Global Theme toolbar control to test against different global themes.
        </p>

        ${componentThemes
          .map(
            (theme) => `
          <div class="a11y-test-section">
            <h2>Component Theme: ${theme.toUpperCase()}</h2>

            ${collectionTypes
              .map(
                (collectionType) => `
              <div class="a11y-test-subsection">
                <h3 style="font-size: 1.25rem; font-weight: bold; margin: 1rem 0 0.5rem; padding: 0.5rem; background: #e8e8e8;">
                  Collection Type: ${
                    collectionType.charAt(0).toUpperCase() +
                    collectionType.slice(1)
                  }
                </h3>

                <h4 style="font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;">Post Card</h4>
                <div class="a11y-test-card">
                  ${renderPostCard(theme, collectionType)}
                </div>

                <h4 style="font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;">Event Card</h4>
                <div class="a11y-test-card">
                  ${renderEventCard(theme, collectionType)}
                </div>

                <h4 style="font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;">Profile Card</h4>
                <div class="a11y-test-card">
                  ${renderProfileCard(theme, collectionType)}
                </div>

                <h4 style="font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;">Page Card</h4>
                <div class="a11y-test-card">
                  ${renderPageCard(theme, collectionType)}
                </div>

                <h4 style="font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem;">Resource Card</h4>
                <div class="a11y-test-card">
                  ${renderResourceCard(theme, collectionType)}
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
};

AccessibilityTesting.argTypes = {
  globalTheme: {
    name: 'Global Theme (lever)',
    options: siteGlobalThemeOptions,
    type: 'select',
    defaultValue: 'one',
  },
};
