import { a as attr } from "../../../chunks/attributes.js";
import { N as pop, J as push } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
/* empty css                       */
/* empty css                       */
import { a as IsValidToken, I as IsTokenExpired } from "../../../chunks/Token.js";
function _page($$payload, $$props) {
  push();
  let username = "";
  let roll = "";
  let password = "";
  let isSubmitting = false;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwtToken");
    if (token && IsValidToken(token) && token.length > 0 && !IsTokenExpired(token)) {
      goto();
    }
  } else {
    console.error("localStorage is not available");
  }
  username = username.trim();
  roll = roll.trim();
  $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-4 sm:p-6 lg:p-8 svelte-1ilx4fi"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl svelte-1ilx4fi"><div class="relative max-w-md mx-auto w-full svelte-1ilx4fi"><div class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl svelte-1ilx4fi"></div> <div class="relative bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 svelte-1ilx4fi"><div class="flex justify-center mb-8 svelte-1ilx4fi"><div class="relative svelte-1ilx4fi"><div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 svelte-1ilx4fi"></div> <h2 class="relative px-4 py-2 bg-gray-800 ring-1 ring-gray-700/50 rounded-lg text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 svelte-1ilx4fi">Login</h2></div></div> <form class="space-y-6 svelte-1ilx4fi"><div class="space-y-4 svelte-1ilx4fi"><div class="relative group svelte-1ilx4fi"><input type="text"${attr("value", username)} class="w-full px-5 py-4 rounded-xl bg-gray-700/50 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-400 transition-all duration-200 group-hover:border-gray-500 svelte-1ilx4fi" placeholder="Username" required> <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors svelte-1ilx4fi" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" class="svelte-1ilx4fi"></path></svg></div> <div class="relative group svelte-1ilx4fi"><input type="text"${attr("value", roll)} autocomplete="on" class="w-full px-5 py-4 rounded-xl bg-gray-700/50 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-400 transition-all duration-200 group-hover:border-gray-500 svelte-1ilx4fi" placeholder="College Roll Number" required> <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors svelte-1ilx4fi" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" class="svelte-1ilx4fi"></path></svg></div> <div class="relative group svelte-1ilx4fi"><input${attr("type", "password")}${attr("value", password)} class="w-full px-5 py-4 rounded-xl bg-gray-700/50 text-gray-100 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-400 transition-all duration-200 group-hover:border-gray-500 svelte-1ilx4fi" placeholder="Password" required> <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none svelte-1ilx4fi">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 svelte-1ilx4fi" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" class="svelte-1ilx4fi"></path></svg>`;
  }
  $$payload.out += `<!--]--></button></div></div> <button type="submit" class="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus:ring-indigo-500/20 transform transition-all duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 svelte-1ilx4fi"${attr("disabled", isSubmitting, true)}>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `Sign In`;
  }
  $$payload.out += `<!--]--></button> <div class="lg:hidden svelte-1ilx4fi"><div class="relative mt-6 pt-6 border-t border-gray-700 svelte-1ilx4fi"><p class="text-sm text-gray-400 leading-relaxed svelte-1ilx4fi">This page is exclusively for the captains of NDC Group-14. If you don't have an account yet, please reach out to the current captains through our <a href="/contact" class="text-indigo-400 hover:text-indigo-300 underline decoration-dotted underline-offset-4 transition-colors svelte-1ilx4fi">contact page</a>.</p></div></div></form></div></div> <div class="hidden lg:flex flex-col justify-center space-y-8 svelte-1ilx4fi"><div class="relative max-w-lg mx-auto w-full svelte-1ilx4fi"><div class="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl svelte-1ilx4fi"></div> <div class="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 svelte-1ilx4fi"><img src="/ndc.png" alt="NDC Logo" class="w-full h-auto rounded-lg shadow-lg svelte-1ilx4fi"> <div class="mt-6 space-y-4 svelte-1ilx4fi"><h3 class="text-xl font-semibold text-gray-100 svelte-1ilx4fi">Welcome to NDC Group-14</h3> <p class="text-gray-400 leading-relaxed svelte-1ilx4fi">This login page is exclusively for the captains of NDC Group-14. If you don't have an account yet, 
                            please reach out to the current captains through our <a href="/contact" class="text-indigo-400 hover:text-indigo-300 underline decoration-dotted underline-offset-4 transition-colors svelte-1ilx4fi">contact page</a>.</p></div></div></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
