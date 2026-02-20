import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.25 12a.75.75 0 0 1-.22.53l-5 5a.75.75 0 1 1-1.06-1.06L13.44 12 8.97 7.53a.75.75 0 0 1 1.06-1.06l5 5c.141.14.22.331.22.53"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronRight;
