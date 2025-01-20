import { P as ensure_array_like, N as pop, J as push } from "../../../../../chunks/index2.js";
import "../../../../../chunks/client.js";
/* empty css                       */
/* empty css                             */
function _page($$payload, $$props) {
  push();
  $$payload.out += `<div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="bg-gray-800 rounded-t-2xl p-6 shadow-xl text-center"><h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-2">Edit Profile</h1> <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Update your account details</p></div> `;
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(6));
    $$payload.out += `<div class="bg-gray-800 p-8 rounded-b-2xl shadow-xl"><div class="animate-pulse space-y-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<div class="h-4 bg-gray-700 rounded w-3/4"></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
export {
  _page as default
};
