import type { Meta, StoryObj } from '@storybook/react';

import { Browser } from '../Browser';

import { Example } from './Example';

const meta: Meta<typeof Browser> = {
  title: 'react-router-dom-v5-fake-browser',
  component: Browser,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Browser>;

export const ExampleStory: Story = {
  name: 'Example',
  render: (props) => <Example {...props} />,
  args: {
    initialEntries: ['/one', '/two', '/three'],
    initialIndex: 0,
  },
};
