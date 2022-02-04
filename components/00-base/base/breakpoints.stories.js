import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import breakpointsTwig from './breakpoints.twig';

const breakpointsData = { breakpoints: tokens.break };

export default {
  title: 'Base/breakpoints',
};

export const breakpoints = () => breakpointsTwig(breakpointsData);
