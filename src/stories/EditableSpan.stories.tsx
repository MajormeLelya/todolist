import type { Meta, StoryObj } from "@storybook/react";
import { EditableSpan } from "../EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,

  tags: ["autodocs"],

  argTypes: {
    onChange: {
      description: "Value changed",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {
    value: "HTML",
  },
};
