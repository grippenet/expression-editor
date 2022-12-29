// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExpressionEditor, ExpressionEditorState } from './ExpressionEditor';
import { Expression } from 'survey-engine/data_types';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'ExpressionEditor',
  component: ExpressionEditor,
} as ComponentMeta<typeof ExpressionEditor>;

const DummySave = (state: ExpressionEditorState)=> {};

const Template: ComponentStory<typeof ExpressionEditor> = (args) => <ExpressionEditor {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  mode: 'client',
  onChange: DummySave
};
