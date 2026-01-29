import factsAndFiguresTwig from './yds-facts-and-figures.twig';
import factsAndFiguresData from './facts-and-figures.yml';

export default {
  title: 'Molecules/Facts and Figures',
  tags: ['!dev'],
};

export const Interactive = () => `
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'false',
      facts_and_figures__alignment: 'center',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'true',
      facts_and_figures__alignment: 'left',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__alignment: 'center',
      facts_and_figures__has_icon: 'true',
    })}
  </ul>
`;

export const FactsAndFigures = () => `
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'false',
      facts_and_figures__alignment: 'center',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__has_icon: 'true',
      facts_and_figures__alignment: 'left',
    })}
    ${factsAndFiguresTwig({
      facts_and_figures__stat: factsAndFiguresData.facts_and_figures__stat,
      facts_and_figures__content:
        factsAndFiguresData.facts_and_figures__content,
      facts_and_figures__presentation_style: 'basic',
      facts_and_figures__alignment: 'center',
      facts_and_figures__has_icon: 'true',
    })}
  </ul>
`;
