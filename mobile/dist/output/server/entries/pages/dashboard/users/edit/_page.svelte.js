import { O as store_get, P as ensure_array_like, Q as unsubscribe_stores, N as pop, J as push } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import axios from "axios";
import { a as IsValidToken, I as IsTokenExpired, g as getID } from "../../../../../chunks/Token.js";
/* empty css                       */
/* empty css                             */
import "../../../../../chunks/client.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let id;
  let data = {};
  async function CheckApplicable() {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token && IsValidToken(token) && !IsTokenExpired(token)) {
        const ID2 = getID(token);
        const response = await axios.get(`${"https://ndc14backend.onrender.com/api/v2"}/users/id/${ID2}`);
        accountInfo = await response.data.data;
        if (!accountInfo.isAdmin || !id) {
          window.history.back();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  let accountInfo = {};
  id = store_get($$store_subs ??= {}, "$page", page).state?.id;
  CheckApplicable();
  $$payload.out += `<div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="bg-gray-800 rounded-t-2xl p-6 shadow-xl text-center"><h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-2">Edit Information</h1> <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Update account of ID: ${escape_html(data.ID)}</p></div> `;
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
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
