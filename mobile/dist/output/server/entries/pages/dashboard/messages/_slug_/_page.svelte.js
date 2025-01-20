import { T as bind_props, N as pop, J as push } from "../../../../../chunks/index2.js";
import "../../../../../chunks/client.js";
import axios from "axios";
import Toastify from "toastify-js/src/toastify.js";
/* empty css                             */
import "../../../../../chunks/index.js";
import { n as noop } from "../../../../../chunks/utils.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function Notification(message, type = "success") {
  const backgroundColor = type === "success" ? "#28a745" : "#dc3545";
  const options = {
    text: message,
    duration: 3e3,
    gravity: "bottom",
    position: "right",
    backgroundColor,
    stopOnFocus: true,
    onClick: function() {
    },
    style: {
      borderRadius: "8px",
      padding: "12px 24px"
    }
  };
  Toastify(options).showToast();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let message = {};
  try {
    noop(async () => {
      const response = await axios.get(`${"https://ndc14backend.onrender.com/api/v2"}/contacts/${data.slug}`);
      const res = await response.data.data;
      message = res;
    });
  } catch (e) {
    Notification("Error fetching message", "error");
  }
  $$payload.out += `<div class="p-6 max-w-2xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg svelte-2bl4np"><h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-400">Message Details</h1> `;
  if (message.name) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="space-y-6"><div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"><h2 class="text-lg font-semibold text-indigo-300">Name:</h2> <p class="text-gray-300">${escape_html(message.name)}</p></div> <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"><h2 class="text-lg font-semibold text-indigo-300">Roll:</h2> <p class="text-gray-300">${escape_html(message.roll)}</p></div> <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"><h2 class="text-lg font-semibold text-indigo-300">Email:</h2> <p class="text-gray-300">${escape_html(message.email)}</p></div> <div class="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"><h2 class="text-lg font-semibold text-indigo-300 mb-4">Message:</h2> <p class="text-gray-300 leading-relaxed text-lg sm:text-xl whitespace-pre-wrap svelte-2bl4np">${escape_html(message.message)}</p></div></div> <div class="mt-8 flex flex-wrap justify-center gap-4"><button class="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">Reply</button> <button class="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800">Delete</button></div> <div class="mt-8 flex justify-center"><button class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto">Go Back</button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-center text-gray-400">Loading message details...</p>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
