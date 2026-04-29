import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.47 8.97a.75.75 0 0 1 1.061 0l5 5a.75.75 0 0 1-1.061 1.06L12 10.56l-4.47 4.47a.75.75 0 0 1-1.06-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronUp;
