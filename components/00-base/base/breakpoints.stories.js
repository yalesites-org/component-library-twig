import breakpointsTwig from './breakpoints.twig';

const breakpointsData = {
  breakpoints: {
    'X-Small': {
      variable: 'none',
      dimensions: '<576px',
    },
    Small: {
      variable: '$break-s',
      dimensions: '≥576px',
    },
    Medium: {
      variable: '$break-m',
      dimensions: '≥768px',
    },
    Large: {
      variable: '$break-l',
      dimensions: '≥992px',
    },
    'X-Large': {
      variable: '$break-xl',
      dimensions: '≥1200px',
    },
    'XX-Large': {
      variable: '$break-2xl',
      dimensions: '≥1400px',
    },
    'Max-Width': {
      variable: '$max-width',
      dimensions: '2400px',
    },
  },
};

export default {
  title: 'Base/breakpoints',
};

export const breakpoints = () => breakpointsTwig(breakpointsData);
