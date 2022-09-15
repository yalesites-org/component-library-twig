import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import headingTwig from '../01-atoms/typography/headings/yds-heading.twig';
import textFieldTwig from '../02-molecules/text/yds-text-field.twig';
import dividerTwig from '../01-atoms/divider/yds-divider.twig';

const layoutOptions = Object.keys(tokens.layout['flex-position']);
const thicknessOptions = Object.keys(tokens.border.thickness);
const widths = Object.keys(tokens.layout.width);

export default {
  title: 'Config',
  argTypes: {
    thickness: {
      name: 'Line thickness',
      options: thicknessOptions,
      type: 'select',
      defaultValue: 'hairline',
    },
    dividerColor: {
      name: 'Line Color',
      options: ['gray-500', 'blue-yale', 'accent'],
      type: 'select',
      defaultValue: 'gray-500',
    },
    width: {
      name: 'Divider width',
      options: [...widths],
      type: 'select',
      defaultValue: '100',
    },
    position: {
      name: 'Divider position',
      options: layoutOptions,
      type: 'select',
      defaultValue: 'center',
    },
  },
};

export const Config = ({ position, thickness, dividerColor, width }) => {
  const customProperties = {
    '--thickness-theme-divider': `var(--size-thickness-${thickness})`,
    '--width-theme-divider': `var(--layout-width-${width})`,
    '--color-theme-divider': `var(--color-${dividerColor})`,
    '--position-theme-divider': `var(--layout-flex-position-${position})`,
  };

  const root = document.documentElement;
  Object.entries(customProperties).forEach((entry) => {
    const [key, value] = entry;
    root.style.setProperty(key, value);
  });

  return `
  ${headingTwig({ heading__level: '2', heading: 'How to use this page.' })}
  ${textFieldTwig({
    text_field__content:
      '<p>The controls on this page will affect various components across the component library, and represented on some stories, like example pages. For example, the "Line thickness" option affects the "Divider", "Tabs", and "Two Column" components, and may affect more in the future.</p>',
  })}
  ${headingTwig({ heading__level: '2', heading: 'Divider' })}
  ${dividerTwig()}
  `;
};
