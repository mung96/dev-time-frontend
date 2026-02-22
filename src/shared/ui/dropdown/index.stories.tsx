import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Dropdown } from ".";
import { useState } from "react";

const meta = {
  title: "Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

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
      <Dropdown value={value} setValue={setValue}>
        <Dropdown.Trigger placeholder="선택" />
        <Dropdown.Options>
          <Dropdown.Option
            value="First Item"
            label="First Item"
            id="First Item"
          />
          <Dropdown.Option
            value="Second Item"
            label="Second Item"
            id="Second Item"
          />
          <Dropdown.Option
            value="Third Item"
            label="Third Item"
            id="Third Item"
          />
          <Dropdown.Option
            value="Fourth Item"
            label="Fourth Item"
            id="Fourth Item"
          />
          <Dropdown.Option
            value="Fifth Item"
            label="Fifth Item"
            id="Fifth Item"
          />
          <Dropdown.Option
            value="Sixth Item"
            label="Sixth Item"
            id="Sixth Item"
          />
          <Dropdown.Option
            value="Seventh Item"
            label="Seventh Item"
            id="Seventh Item"
          />
        </Dropdown.Options>
      </Dropdown>
    );
  },
};
