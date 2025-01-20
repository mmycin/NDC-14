import { O as store_get, P as ensure_array_like, Q as unsubscribe_stores, N as pop, R as stringify, J as push, S as slot, T as bind_props } from "../../chunks/index2.js";
import "clsx";
import "../../chunks/client.js";
import { p as page } from "../../chunks/stores.js";
import { a as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
import { I as IsTokenExpired } from "../../chunks/Token.js";
function Footer($$payload) {
  $$payload.out += `<footer class="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 shadow-sm py-3 mt-auto"><div class="container mx-auto text-center px-6"><p class="text-xs font-medium mb-1">© 2024 Created by <a href="https://github.com/mmycin/" target="_blank">Tahcin Ul Karim (Mycin) - 12514013</a></p> <p class="text-xs font-light opacity-70 hover:opacity-100 transition-opacity duration-300">All rights reserved | <a href="https://ndc.edu.bd/" target="_blank">Notre Dame College, Dhaka</a></p></div></footer>`;
}
function Navbar($$payload, $$props) {
  push();
  var $$store_subs;
  let currentPath;
  currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  const each_array = ensure_array_like([
    { path: "/contact", label: "Contact" },
    ...[]
  ]);
  $$payload.out += `<nav${attr("class", `${stringify(`fixed w-full top-0 z-50 transition-all duration-300 ${"bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm"}`)} svelte-bra7wn`)}><div class="container mx-auto px-2 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16 md:h-20"><a href="/" class="flex items-center space-x-3 group"><img src="/ndc.png" alt="NDC Logo" class="h-8 w-8 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110"></a> <div class="absolute inset-0 flex justify-center items-center"><a href="/" class="group pointer-events-auto"><h1 class="text-base md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500 whitespace-nowrap" style="font-family: 'Dancing Script', cursive;">Notre Dame College, Dhaka</h1></a></div> <div class="hidden lg:flex items-center space-x-8"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { path, label } = each_array[$$index];
    $$payload.out += `<a${attr("href", path)} class="relative group"><span${attr("class", `${stringify(`text-lg font-medium transition-colors duration-200 ${currentPath === path ? "text-blue-400" : "text-gray-300 group-hover:text-blue-400"}`)} svelte-bra7wn`)}>${escape_html(label)}</span> <span${attr("class", `${stringify(`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform origin-left transition-transform duration-300 ${currentPath === path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`)} svelte-bra7wn`)}></span></a>`;
  }
  $$payload.out += `<!--]--> <button class="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">${escape_html("Login")}</button></div> <button class="lg:hidden p-2 rounded-lg text-gray-300 hover:text-blue-400 focus:outline-none z-60" style="position: relative; z-index: 60;"><svg xmlns="http://www.w3.org/2000/svg"${attr("class", `h-6 w-6 transition-transform duration-300 ${stringify([""].filter(Boolean).join(" "))}`)} viewBox="0 0 24 24" stroke="currentColor" fill="none">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
  }
  $$payload.out += `<!--]--></svg></button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></nav> <div class="h-16 md:h-20"></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  push();
  async function load() {
    try {
      if (localStorage.length > 0) {
        const token = localStorage.getItem("jwtToken");
        if (token && IsTokenExpired(token)) {
          localStorage.removeItem("jwtToken");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  $$payload.out += `<head><title>NDC Group 14 Notice Board</title></head> <main class="flex flex-col min-h-screen bg-cover bg-center">`;
  Navbar($$payload);
  $$payload.out += `<!----> <main class="flex-grow flex justify-center items-center"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main> `;
  Footer($$payload);
  $$payload.out += `<!----></main>`;
  bind_props($$props, { load });
  pop();
}
export {
  _layout as default
};
