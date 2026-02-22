import * as React from "react";
import type { SVGProps } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.25 3A.75.75 0 0 1 9 2.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 3m-5 3.176a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5h-1.319q.032.188.025.383l-.456 11.59c-.008 1.535-1.197 2.851-2.75 2.851h-7c-1.553 0-2.742-1.316-2.75-2.852l-.456-11.59q-.008-.194.025-.382H4a.75.75 0 0 1-.75-.75m3.793.75c-.101 0-.259.104-.25.324l.457 11.618v.014c0 .797.6 1.368 1.25 1.368h7c.65 0 1.25-.571 1.25-1.368v-.014l.457-11.618c.009-.22-.149-.324-.25-.324zM10 9.662a.75.75 0 0 1 .75.75v6.353a.75.75 0 0 1-1.5 0v-6.353a.75.75 0 0 1 .75-.75m4 0a.75.75 0 0 1 .75.75v6.353a.75.75 0 0 1-1.5 0v-6.353a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTrash;
