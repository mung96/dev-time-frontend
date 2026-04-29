import * as React from "react";
import type { SVGProps } from "react";
const SvgTodo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4m8-4a2 2 0 1 0 0 4h24a2 2 0 1 0 0-4zm0 10a2 2 0 1 0 0 4h24a2 2 0 1 0 0-4zm0 10a2 2 0 1 0 0 4h24a2 2 0 1 0 0-4zm-6-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0M8 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTodo;
