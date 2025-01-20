import { P as ensure_array_like, N as pop, J as push } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let data = {};
  $$payload.out += `<div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="bg-gray-800 rounded-t-2xl p-6 shadow-xl text-center relative"><h1 class="text-3xl font-bold text-white mb-2">Profile</h1> `;
  if (data.isAdmin) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute top-2 right-3 p-2 pr-4 bg-gray-900 text-white text-xs font-bold rounded-full"><span class="inline-block w-2.5 h-2.5 text-yellow-300 mr-2">☆</span> Admin</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <p class="text-gray-400">Your account details</p></div> `;
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
  $$payload.out += `<!--]--> <div class="text-center mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6"><button class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto">Go Back</button> <button class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto">Edit Profile</button></div></div></div>`;
  pop();
}
export {
  _page as default
};
