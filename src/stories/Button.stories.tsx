import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'antd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Atomic/Button',
	component: Button,
	argTypes: {
		type: { control: 'inline-radio', options: ['primary', 'dashed', 'ghost', 'link'] },
		size: { control: 'inline-radio', options: ['default', 'middle', 'small', 'large'] },
	},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
export const Primary = Template.bind({});
export const Dashed = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});
export const Link = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	type: 'primary',
	size: 'middle',
};
Dashed.args = {
	type: 'dashed',
	size: 'middle',
};
Large.args = {
	size: 'large',
};

Small.args = {
	size: 'small',
};

Link.args = {
	type: 'link',
};
