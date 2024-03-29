// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Pagination> = (args) => {
//   return <Pagination {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react';

import Pagination from './Pagination';

export const generated = () => {
    return <Pagination />;
};

export default {
    title: 'Components/Pagination',
    component: Pagination,
} as Meta<typeof Pagination>;
