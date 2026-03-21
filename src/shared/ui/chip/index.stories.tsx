import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Chip } from ".";

const meta = {
  title: "Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "item",
  },
};
