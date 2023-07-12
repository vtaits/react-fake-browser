import type { Meta, StoryObj } from '@storybook/react';

import { FakeBrowser } from '../FakeBrowser';

import { Example } from './Example';

const meta: Meta<typeof FakeBrowser> = {
  title: 'react-fake-browser-ui',
  component: FakeBrowser,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FakeBrowser>;

export const ExampleStory: Story = {
  name: 'Example',
  render: (props) => <Example {...props} />,
  args: {
    canMoveForward: false,
    canMoveBack: false,
    currentAddress: '',
  },
};
