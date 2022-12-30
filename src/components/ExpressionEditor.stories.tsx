// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { createExpressionEditorState,createExpressionArgEditorState, ExpressionEditor, ExpressionEditorState } from './ExpressionEditor';
import { Expression } from 'survey-engine/data_types';

import 'localStyles';

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

export const ClientExpression = Template.bind({});

ClientExpression.args = {
  mode: 'client',
  state: createExpressionEditorState(undefined),
  onChange: DummySave
};
ClientExpression.title = 'Client mode';

export const ClientExpressionArg = Template.bind({});

ClientExpressionArg.args = {
  mode: 'client',
  state: createExpressionArgEditorState(undefined),
  onChange: DummySave
};

