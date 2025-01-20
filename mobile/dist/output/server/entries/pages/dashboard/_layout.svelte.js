import "clsx";
import { N as pop, J as push } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
function _layout($$payload, $$props) {
  push();
  if (typeof window !== "undefined") {
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex items-center justify-center h-screen w-full"><p>Loading...</p></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
