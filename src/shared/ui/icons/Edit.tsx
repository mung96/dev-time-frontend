import * as React from "react";
import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.902 4.27a1.95 1.95 0 0 1 2.757-.001l2.07 2.068a1.95 1.95 0 0 1 .002 2.758l-9.774 9.78a1.95 1.95 0 0 1-.994.532l-4.366.88a.75.75 0 0 1-.883-.884l.88-4.36a1.95 1.95 0 0 1 .533-.993zm1.697 1.06a.45.45 0 0 0-.636 0l-1.537 1.538 2.705 2.706 1.539-1.54a.45.45 0 0 0 0-.636zm-.528 5.305-2.706-2.706-7.177 7.181a.45.45 0 0 0-.123.23l-.657 3.253 3.259-.656a.45.45 0 0 0 .229-.123z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEdit;
