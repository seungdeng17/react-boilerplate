import { ComponentStory, ComponentMeta } from '@storybook/react';

import Sample from '@/Sample';

export default {
  title: 'Example/Sample',
  component: Sample,
} as ComponentMeta<typeof Sample>;

const Template: ComponentStory<typeof Sample> = () => <Sample />;

export const Normal = Template.bind({});
