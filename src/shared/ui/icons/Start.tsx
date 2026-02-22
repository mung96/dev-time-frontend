import * as React from "react";
import type { SVGProps } from "react";
const SvgStart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 100 100"
    {...props}
  >
    <path
      fill="#4C79FF"
      d="M87.673 45.568c3.103 1.97 3.103 6.894 0 8.864L16.982 99.307c-3.103 1.97-6.982-.493-6.982-4.432V5.125c0-3.94 3.879-6.402 6.982-4.432z"
    />
  </svg>
);
export default SvgStart;
