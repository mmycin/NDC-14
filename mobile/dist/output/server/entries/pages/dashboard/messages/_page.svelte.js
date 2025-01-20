import "clsx";
import { N as pop, J as push } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
/* empty css                       */
/* empty css                          */
function _page($$payload, $$props) {
  push();
  $$payload.out += `<div class="min-h-screen text-gray-100 p-4 md:p-6"><h1 class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Message Board</h1> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center min-h-[200px]"><div class="animate-pulse text-blue-400">Loading...</div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
