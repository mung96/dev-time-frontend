import { Input } from "@shared/ui/input-field/input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const Typing: Story = {
  args: {
    value: "Typing",
  },
};

export const Typed: Story = {
  args: { value: "Typed" },
};

export const Error: Story = {
  args: { isError: true, placeholder: "Placeholder" },
};
