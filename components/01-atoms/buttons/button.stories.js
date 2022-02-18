import button from './button.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Button' };

export const Button = () => `
  <h2>Filled</h2>
  <div class="button-group">
    ${button({
      button__content: 'Button',
    })}
    ${button({
      button__content: 'Button',
      button__radius: 'soft',
    })}
    ${button({
      button__content: 'Button',
      button__radius: 'pill',
    })}
  </div>
  <h2>Outline</h2>
  <div class="button-group">
    ${button({
      button__content: 'Button',
      button__style: 'outline',
    })}
    ${button({
      button__content: 'Button',
      button__radius: 'soft',
      button__style: 'outline',
    })}
    ${button({
      button__content: 'Button',
      button__radius: 'pill',
      button__style: 'outline',
    })}
  </div>
  <h2>Outline Weights</h2>
  <div class="button-group">
    ${button({
      button__content: 'Button',
      button__style: 'outline',
      button__outline_weight: '1',
    })}
    ${button({
      button__content: 'Button',
      button__style: 'outline',
      button__outline_weight: '2',
    })}
    ${button({
      button__content: 'Button',
      button__style: 'outline',
      button__outline_weight: '4',
    })}
  </div>
  <h2>Hover Effects</h2>
  <div class="button-group">
    ${button({
      button__content: 'Fade',
    })}
    ${button({
      button__content: 'Rise',
      button__hover_style: 'rise',
    })}
    ${button({
      button__content: 'Wipe',
      button__hover_style: 'wipe',
    })}
  </div>
  <div class="button-group">
    ${button({
      button__content: 'Fade',
      button__style: 'outline',
    })}
    ${button({
      button__content: 'Rise',
      button__style: 'outline',
      button__hover_style: 'rise',
    })}
    ${button({
      button__content: 'Wipe',
      button__style: 'outline',
      button__hover_style: 'wipe',
    })}
  </div>
`;
