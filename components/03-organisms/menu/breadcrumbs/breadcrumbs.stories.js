// Markup.
import breadcrumbsTwig from './yds-breadcrumbs.twig';

// Data.
import breadcrumbsData from './breadcrumbs.yml';

// Props.
import componentProps from './breadcrumbs-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

// JavaScript.
import './yds-breadcrumbs';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Breadcrumbs = () => breadcrumbsTwig({ ...breadcrumbsData });
