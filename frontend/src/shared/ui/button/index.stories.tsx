import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Button } from ".";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    priority: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "버튼 스타일",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    priority: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    priority: "secondary",
    children: "Button",
  },
};

export const Tertiary: Story = {
  args: {
    priority: "tertiary",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    priority: "primary",
    children: "Button",
    disabled: true,
  },
};
