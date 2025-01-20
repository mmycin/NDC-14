import { T as bind_props, N as pop, J as push } from "../../../../../../chunks/index2.js";
import "../../../../../../chunks/client.js";
/* empty css                       */
/* empty css                                */
import { e as escape_html } from "../../../../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  data.slug;
  let name = "";
  $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4"><div class="max-w-2xl mx-auto"><div class="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden"><div class="bg-gray-800/60 border-b border-gray-700/50 px-6 py-4"><h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Update Notice</h2> <p class="text-gray-400 mt-1">Editor: ${escape_html(name)}</p></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center h-64"><div class="flex flex-col items-center space-y-3"><div class="w-10 h-10 border-3 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div> <p class="text-gray-400 text-sm">Loading notice data...</p></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
