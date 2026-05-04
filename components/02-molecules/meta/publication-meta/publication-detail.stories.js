import publicationDetailTwig from './yds-publication-detail.twig';
import componentProps from './publication-detail-props.yml';
import publicationDetailData from './publication-detail.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

/**
 * Pre-formatted publish_date strings keyed per story.
 *
 * On a Resource node the publish_date passed to the molecule is already
 * formatted upstream (atomic_preprocess_node + field_date_format). For
 * Storybook we simulate the format selection by mapping the dateFormat
 * control to one of three pre-formatted strings per variant.
 */
const dateFormats = {
  policyBrief: {
    year: '2018',
    monthYear: 'March 2018',
    full: 'March 15, 2018',
  },
  journalArticle: {
    year: '2023',
    monthYear: 'April 2023',
    full: 'April 17, 2023',
  },
  videoResource: {
    year: '2024',
    monthYear: 'October 2024',
    full: 'October 12, 2024',
  },
};

/**
 * Renders the molecule with the variant's base data merged with the
 * Storybook control args. Boolean controls (showDescription /
 * showExternalSource / showJournalInfo) blank out the corresponding
 * twig variables when off so the conditional branches in
 * yds-publication-detail.twig show the empty-cell behaviour.
 */
const renderPublicationDetail = (data, args, datesKey = 'policyBrief') => {
  const dateMap = dateFormats[datesKey];
  return publicationDetailTwig({
    ...data,
    publication_detail__heading: args.heading,
    publication_detail__category: args.category,
    publication_detail__publish_date: dateMap[args.dateFormat] || dateMap.year,
    publication_detail__description: args.showDescription
      ? data.publication_detail__description
      : '',
    publication_detail__external_source: args.showExternalSource
      ? data.publication_detail__external_source
      : { url: '', title: '' },
    publication_detail__journal_publication_name: args.showJournalInfo
      ? data.publication_detail__journal_publication_name
      : '',
    publication_detail__journal_publication_issue: args.showJournalInfo
      ? data.publication_detail__journal_publication_issue
      : '',
  });
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Meta/Publication Detail',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: publicationDetailData.publication_detail__heading,
    category: publicationDetailData.publication_detail__category,
  },
};

/**
 * Policy Brief — ISPS-published document with PDF download, author list
 * (mix of affiliated + non-affiliated), abstract, and a metadata grid
 * with Location / Discipline / Areas of Study / DCN cells.
 *
 * Mirrors the shape of /research/publications/isps18-04 on the live site.
 */
export const PolicyBrief = (args) =>
  renderPublicationDetail(publicationDetailData, args, 'policyBrief');
PolicyBrief.storyName = 'Policy Brief';

/**
 * Journal Article — externally published paper with publication name +
 * issue cells, an external-source CTA (DOI / publisher link), and a
 * description section in addition to the abstract. No PDF download.
 */
const journalArticleData = {
  ...publicationDetailData,
  publication_detail__heading:
    'Effects of Voter ID Laws on Turnout in Multi-Ethnic Districts',
  publication_detail__category: 'Journal Article',
  publication_detail__authors: [
    { label: 'Marcus T. Allen', url: '/people/marcus-allen' },
    { label: 'Diane R. Bennett', url: null },
  ],
  publication_detail__journal_publication_name:
    'American Journal of Political Science',
  publication_detail__journal_publication_issue: 'Vol. 67, No. 3, pp. 712–728',
  publication_detail__citation:
    '<p>Allen, Marcus T., and Diane R. Bennett. (2023). Effects of Voter ID Laws on Turnout in Multi-Ethnic Districts. <em>American Journal of Political Science</em>, 67(3), 712–728.</p>',
  publication_detail__abstract:
    '<p>This study uses a difference-in-differences design across twelve states to estimate the effect of voter identification requirements on first-time voter turnout in multi-ethnic districts. Results indicate a statistically significant reduction of 2.4 percentage points among Hispanic and Asian voters, concentrated in districts with limited transportation access.</p>',
  publication_detail__description:
    '<p>Working data, replication code, and supplementary regression tables are available alongside the published article on the AJPS Dataverse. The pre-registered analysis plan is available on OSF.</p>',
  publication_detail__external_source: {
    url: 'https://doi.org/10.1111/example',
    title: 'View on Wiley Online Library',
  },
  publication_detail__download_url: '',
  publication_detail__download_label: '',
  publication_detail__download_aria_label: '',
  publication_detail__metadata: {
    field_geographic_areas: { label: 'Location', items: ['United States'] },
    field_discipline: { label: 'Discipline', items: ['Political Science'] },
    field_areas_of_study: {
      label: 'Areas of Study',
      items: ['Voting Rights', 'Public Policy'],
    },
  },
};

export const JournalArticle = (args) =>
  renderPublicationDetail(
    journalArticleData,
    {
      ...args,
      heading: journalArticleData.publication_detail__heading,
      category: journalArticleData.publication_detail__category,
      showJournalInfo: true,
      showExternalSource: true,
      showDescription: true,
    },
    'journalArticle',
  );
JournalArticle.storyName = 'Journal Article';

/**
 * Video Resource — lecture / talk where the primary media is an oEmbed
 * video. The video block renders above the metadata grid; document_image
 * and download_url are not used. video_embed__content__1 is the
 * pre-rendered iframe markup the Drupal preprocess hands the molecule.
 */
const videoResourceData = {
  ...publicationDetailData,
  publication_detail__heading: 'How Local Politics Shapes National Outcomes',
  publication_detail__category: 'ISPS Lecture',
  publication_detail__authors: [
    { label: 'Eleanor M. Davis', url: '/people/eleanor-davis' },
  ],
  publication_detail__citation: '',
  publication_detail__abstract:
    '<p>A 45-minute lecture exploring how local political structures translate into national policy outcomes through case studies in three U.S. states. Recorded at the ISPS Distinguished Speaker series.</p>',
  publication_detail__description: '',
  publication_detail__external_source: { url: '', title: '' },
  publication_detail__resource_type: 'video',
  publication_detail__media_id: 12345,
  publication_detail__document_image: '',
  publication_detail__download_url: '',
  publication_detail__download_label: '',
  publication_detail__download_aria_label: '',
  publication_detail__journal_publication_name: '',
  publication_detail__journal_publication_issue: '',
  publication_detail__metadata: {
    field_discipline: { label: 'Discipline', items: ['Political Science'] },
    field_areas_of_study: {
      label: 'Areas of Study',
      items: ['Local Government'],
    },
  },
  // Pre-rendered iframe — what atomic's media-oembed-content.html.twig
  // override emits on a Resource page with field_media_oembed_video.
  video_embed__content__1:
    '<iframe src="https://www.youtube.com/embed/EXAMPLE_VIDEO_ID" title="How Local Politics Shapes National Outcomes" width="560" height="315" frameborder="0" allowfullscreen class="media-oembed-content"></iframe>',
};

export const VideoResource = (args) =>
  renderPublicationDetail(
    videoResourceData,
    {
      ...args,
      heading: videoResourceData.publication_detail__heading,
      category: videoResourceData.publication_detail__category,
    },
    'videoResource',
  );
VideoResource.storyName = 'Video Resource';
