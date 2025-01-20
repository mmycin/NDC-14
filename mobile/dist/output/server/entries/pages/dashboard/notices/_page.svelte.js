import { a as attr } from "../../../../chunks/attributes.js";
import { N as pop, J as push } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
/* empty css                       */
/* empty css                          */
function _page($$payload, $$props) {
  push();
  let searchTitle = "";
  $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">Notice Board</h1> <p class="text-gray-400 max-w-2xl mx-auto">Manage all the notices for the NDC Group 14 Notice Board</p> <button class="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300">Add New Notice</button></div> <div class="max-w-3xl mx-auto mb-8"><div class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50"><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1"><input type="text" placeholder="Search notices..." class="w-full pl-10 pr-4 py-2 bg-gray-700/30 text-white rounded-lg border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all duration-200"${attr("value", searchTitle)}> <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <div class="sm:w-48"><select class="w-full px-4 py-2 bg-gray-700/30 text-white rounded-lg border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"><option value="">All Years</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option></select></div></div></div></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center h-64"><div class="flex flex-col items-center space-y-3"><div class="w-10 h-10 border-3 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div> <p class="text-gray-400 text-sm animate-pulse">Loading notices...</p></div></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
export {
  _page as default
};
