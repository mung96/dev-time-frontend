import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AutoComplete } from ".";
import { useState } from "react";

const meta = {
  title: "AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    setValue: () => {},
    children: null,
  },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete value={value} setValue={setValue}>
        <AutoComplete.Input placeholder="선택" />
        <AutoComplete.Options>
          <AutoComplete.Option
            value="First Item"
            label="First Item"
            id="First Item"
          />
          <AutoComplete.Option
            value="Second Item"
            label="Second Item"
            id="Second Item"
          />
          <AutoComplete.Option
            value="Third Item"
            label="Third Item"
            id="Third Item"
          />
          <AutoComplete.Option
            value="Fourth Item"
            label="Fourth Item"
            id="Fourth Item"
          />
          <AutoComplete.Option
            value="Fifth Item"
            label="Fifth Item"
            id="Fifth Item"
          />
          <AutoComplete.Option
            value="Sixth Item"
            label="Sixth Item"
            id="Sixth Item"
          />
          <AutoComplete.Option
            value="Seventh Item"
            label="Seventh Item"
            id="Seventh Item"
          />
        </AutoComplete.Options>
      </AutoComplete>
    );
  },
};
