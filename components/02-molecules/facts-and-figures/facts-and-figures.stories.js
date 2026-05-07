import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';
import componentProps from './facts-and-figures-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Molecules/Facts and Figures',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Interactive = ({ stat }) => `
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'false',
      facts_and_figures__alignment: 'center',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'true',
      facts_and_figures__alignment: 'left',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__alignment: 'center',
      facts_and_figures__has_icon: 'true',
    })}
  </ul>
`;

export const FactsAndFigures = ({ stat }) => `
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'false',
      facts_and_figures__alignment: 'center',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'true',
      facts_and_figures__alignment: 'left',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__alignment: 'center',
      facts_and_figures__has_icon: 'true',
    })}
  </ul>
`;
