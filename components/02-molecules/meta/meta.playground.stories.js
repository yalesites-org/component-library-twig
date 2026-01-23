import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import eventLocalistMetaTwig from './event-meta/yds-event-meta-localist.twig';
import profileMetaTwig from './profile-meta/yds-profile-meta.twig';
import resourceMetaTwig from './resource-meta/yds-resource-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';
import imageData from '../../01-atoms/images/image/image.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';
import eventLocalistData from './event-meta/event-localist.yml';
import resourceMetaData from './resource-meta/resource-meta.yml';

import './event-meta/event-meta-localist';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Meta/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
  },
  args: {
    sectionTheme: 'one',
  },
};

export const Playground = ({ sectionTheme }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>All 4 meta component types are shown below: Basic, Event, Profile, and Resource.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>Basic Meta</h3>
        ${basicMetaTwig({
          basic_meta: `<span>By Charlyn Paradis</span>${dateTimeTwig({
            date_time__start: '2022-01-25',
            date_time__format: 'day__full',
          })}`,
        })}

        <h3 style="margin-top: 2rem;">Event Meta</h3>
        ${eventLocalistMetaTwig({
          ...imageData.responsive_images['3x2'],
          event_title__heading: 'Sample Event Title',
          event_dates: eventLocalistData.event_dates,
          formatted_start_date: eventLocalistData.formatted_start_date,
          formatted_end_date: eventLocalistData.formatted_end_date,
          event_meta__format: 'Virtual Event',
          event_meta__address: '123 Main St, New Haven, CT',
          event_meta__cta_primary__content: 'Register',
          event_meta__cta_primary__href: '#',
          cost_button_text: 'Register',
          event_meta__cta_secondary__content: 'Add to calendar',
          event_meta__cta_secondary__href: '#',
          event_meta__with_calendar: true,
          event_meta__image: 'true',
          event_meta__all_day: false,
          ...eventLocalistData,
        })}

        <h3 style="margin-top: 2rem;">Profile Meta</h3>
        ${profileMetaTwig({
          ...imageData.responsive_images['3x2'],
          profile_meta__heading: 'Person Namerton',
          profile_meta__title_line: 'Professional Title',
          profile_meta__subtitle_line: 'Subtitle',
          profile_meta__department: 'Department name',
          profile_meta__pronouns: 'They/They/Them',
          profile_meta__background: 'one',
          profile_meta__image_orientation: 'landscape',
          image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
          image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
          image__alt__1: imageData.responsive_images['2x3'].image__alt,
          image__src__1: imageData.responsive_images['2x3'].image__src,
          profile_meta__image_style: 'inline',
          profile_meta__image_alignment: 'right',
        })}

        <h3 style="margin-top: 2rem;">Resource Meta</h3>
        ${resourceMetaTwig({
          resource_meta__heading: 'Resource Title',
          resource_meta__category: 'Video',
          resource_meta__publish_date_label: 'Published On',
          resource_meta__publish_date: 'July 1, 2025',
          resource_meta__metadata: resourceMetaData.resource_meta__metadata,
          resource_meta__resource_type: 'video',
          resource_meta__download_label: 'Download',
          resource_meta__download_aria_label: 'Download file',
          resource_meta__download_url: '#.pdf',
          resource_meta__description:
            'This is a sample resource description that will appear below the media content.',
          image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
          image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
          image__alt__1: imageData.responsive_images['2x3'].image__alt,
          image__src__1: imageData.responsive_images['2x3'].image__src,
          video_embed__content__1: videoEmbedData.video_embed__content,
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations with all 4 meta types for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 3rem;">
      <h3>Section Theme: ${theme}</h3>
      <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            <h4>Basic Meta</h4>
            ${basicMetaTwig({
              basic_meta: `<span>By Charlyn Paradis</span>${dateTimeTwig({
                date_time__start: '2022-01-25',
                date_time__format: 'day__full',
              })}`,
            })}

            <h4 style="margin-top: 2rem;">Event Meta</h4>
            ${eventLocalistMetaTwig({
              ...imageData.responsive_images['3x2'],
              event_title__heading: 'Sample Event Title',
              event_dates: eventLocalistData.event_dates,
              formatted_start_date: eventLocalistData.formatted_start_date,
              formatted_end_date: eventLocalistData.formatted_end_date,
              event_meta__format: 'Virtual Event',
              event_meta__address: '123 Main St, New Haven, CT',
              event_meta__cta_primary__content: 'Register',
              event_meta__cta_primary__href: '#',
              cost_button_text: 'Register',
              event_meta__cta_secondary__content: 'Add to calendar',
              event_meta__cta_secondary__href: '#',
              event_meta__with_calendar: true,
              event_meta__image: 'true',
              event_meta__all_day: false,
              ...eventLocalistData,
            })}

            <h4 style="margin-top: 2rem;">Profile Meta</h4>
            ${profileMetaTwig({
              ...imageData.responsive_images['3x2'],
              profile_meta__heading: 'Person Namerton',
              profile_meta__title_line: 'Professional Title',
              profile_meta__subtitle_line: 'Subtitle',
              profile_meta__department: 'Department name',
              profile_meta__pronouns: 'They/They/Them',
              profile_meta__background: 'one',
              profile_meta__image_orientation: 'landscape',
              image__srcset__1:
                imageData.responsive_images['2x3'].image__srcset,
              image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
              image__alt__1: imageData.responsive_images['2x3'].image__alt,
              image__src__1: imageData.responsive_images['2x3'].image__src,
              profile_meta__image_style: 'inline',
              profile_meta__image_alignment: 'right',
            })}

            <h4 style="margin-top: 2rem;">Resource Meta</h4>
            ${resourceMetaTwig({
              resource_meta__heading: 'Resource Title',
              resource_meta__category: 'Video',
              resource_meta__publish_date_label: 'Published On',
              resource_meta__publish_date: 'July 1, 2025',
              resource_meta__metadata: resourceMetaData.resource_meta__metadata,
              resource_meta__resource_type: 'video',
              resource_meta__download_label: 'Download',
              resource_meta__download_aria_label: 'Download file',
              resource_meta__download_url: '#.pdf',
              resource_meta__description:
                'This is a sample resource description that will appear below the media content.',
              image__srcset__1:
                imageData.responsive_images['2x3'].image__srcset,
              image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
              image__alt__1: imageData.responsive_images['2x3'].image__alt,
              image__src__1: imageData.responsive_images['2x3'].image__src,
              video_embed__content__1: videoEmbedData.video_embed__content,
            })}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
