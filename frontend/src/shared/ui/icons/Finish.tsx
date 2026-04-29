import * as React from "react";
import type { SVGProps } from "react";
const SvgFinish = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 100 100"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 8a8 8 0 0 1 8-8h84a8 8 0 0 1 8 8v84a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
    />
  </svg>
);
export default SvgFinish;
