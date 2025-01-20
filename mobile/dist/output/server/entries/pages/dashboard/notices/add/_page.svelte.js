import { a as attr } from "../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { N as pop, J as push } from "../../../../../chunks/index2.js";
import "../../../../../chunks/client.js";
/* empty css                       */
/* empty css                             */
function _page($$payload, $$props) {
  push();
  let name = "";
  let title = "";
  let date = "";
  let content = "";
  let loading = false;
  $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center py-8"><div class="w-full max-w-lg bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700/50"><h2 class="text-2xl font-bold text-white mb-6 text-center">Add New Notice</h2> <p class="text-gray-400 text-center mb-6">Added by ${escape_html(name)}</p> <form class="space-y-6"><div><label for="title" class="block text-gray-400 font-medium mb-2">Notice Title</label> <input type="text" placeholder="Enter notice title" class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"${attr("value", title)}></div> <div><label for="date" class="block text-gray-400 font-medium mb-2">Date</label> <input type="date" class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"${attr("value", date)}></div> <div><label for="content" class="block text-gray-400 font-medium mb-2">Content</label> <textarea rows="4" placeholder="Enter notice content" class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">`;
  const $$body = escape_html(content);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea></div> <div><label for="year" class="block text-gray-400 font-medium mb-2">Year</label> <select class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="" disabled selected>Select year</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option></select></div> <div><label for="file" class="block text-gray-400 font-medium mb-2">Upload Files</label> <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf" class="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:border file:border-gray-600 file:rounded-md file:bg-gray-700 file:text-white hover:file:bg-blue-600 mb-4"></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${attr("disabled", loading, true)}>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `Add Notice`;
  }
  $$payload.out += `<!--]--></button></form></div></div>`;
  pop();
}
export {
  _page as default
};
