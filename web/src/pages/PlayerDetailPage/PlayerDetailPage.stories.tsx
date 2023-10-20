import type { Meta, StoryObj } from '@storybook/react';

import PlayerDetailPage from './PlayerDetailPage';

const meta: Meta<typeof PlayerDetailPage> = {
    component: PlayerDetailPage,
};

export default meta;

type Story = StoryObj<typeof PlayerDetailPage>;

export const Primary: Story = {};
