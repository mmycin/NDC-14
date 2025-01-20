import { T as bind_props, N as pop, J as push } from "../../../../../chunks/index2.js";
import "../../../../../chunks/client.js";
/* empty css                       */
/* empty css                             */
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  $$payload.out += `<div class="min-h-screen bg-gray-900 py-12"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center h-64"><div class="flex flex-col items-center space-y-4"><div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> <span class="text-gray-400 font-medium">Loading notice...</span></div></div>`;
  }
  $$payload.out += `<!--]--> <div class="flex justify-center mt-5 items-stretch"><button class="px-6 py-3 rounded-xl mr-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">Go Back</button> <button class="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">Edit</button></div></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
