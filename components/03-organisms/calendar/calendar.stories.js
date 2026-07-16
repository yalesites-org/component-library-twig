import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import componentProps from './calendar-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Organisms/Calendar',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    month: monthData,
  },
};

export const Calendar = ({ month }) => {
  return calendarTwig({ month });
};
