import * as React from "react";
import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 4.05a.75.75 0 0 1 .75.75v6.45h6.45a.75.75 0 1 1 0 1.5h-6.45v6.45a.75.75 0 1 1-1.5 0v-6.45H4.8a.75.75 0 1 1 0-1.5h6.45V4.8a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPlus;
