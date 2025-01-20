import { N as pop, R as stringify, J as push } from "../../../../../chunks/index2.js";
/* empty css                       */
/* empty css                             */
import "../../../../../chunks/client.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  let fullName = "";
  let username = "";
  let email = "";
  let roll = "";
  let batch = "";
  let fbLink = "";
  let password = "";
  let phone = "";
  let confirmPassword = "";
  let passwordMatch = true;
  let rollValid = true;
  let batchValid = true;
  let fbLinkValid = true;
  let validationErrors = { roll: "", batch: "", fbLink: "" };
  passwordMatch = password === confirmPassword;
  {
    const rollPattern = /^1[23][0-9]14([0-9]{3})$/;
    rollValid = rollPattern.test(roll);
    {
      validationErrors.roll = "";
    }
  }
  {
    const batchNum = parseInt(batch);
    batchValid = batchNum >= 2023 && batchNum <= 2040;
    validationErrors.batch = "";
  }
  {
    const fbPattern = /^https:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/;
    fbLinkValid = fbPattern.test(fbLink);
    validationErrors.fbLink = "";
  }
  $$payload.out += `<div class="container mx-auto px-4 py-12 svelte-1acp57a"><h1 class="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">Add a New Captain</h1> <form class="bg-slate-800 p-8 rounded-3xl shadow-xl max-w-4xl mx-auto transform transition duration-300 hover:scale-105 svelte-1acp57a"><div class="mb-6"><label for="fullName" class="block text-white text-lg font-medium mb-2">Full Name</label> <input id="fullName" type="text"${attr("value", fullName)} class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent svelte-1acp57a" placeholder="Enter Full Name" required></div> <div class="mb-6"><label for="username" class="block text-white text-lg font-medium mb-2">Username</label> <input id="username" type="text"${attr("value", username)} class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent svelte-1acp57a" placeholder="Enter Username" required></div> <div class="mb-6"><label for="email" class="block text-white text-lg font-medium mb-2">Email</label> <input id="email" type="email"${attr("value", email)} class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent svelte-1acp57a" placeholder="Enter Email" required></div> <div class="mb-6"><label for="roll" class="block text-white text-lg font-medium mb-2">Roll Number</label> <input id="roll" type="text"${attr("value", roll)}${attr("class", `w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${stringify("")} svelte-1acp57a`)} placeholder="Enter Roll Number (e.g., 12014xxx)" required> `;
  if (validationErrors.roll) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-red-500 text-sm mt-2">${escape_html(validationErrors.roll)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mb-6"><label for="roll" class="block text-white text-lg font-medium mb-2">Phone Number</label> <input id="roll" type="text"${attr("value", phone)}${attr("class", `w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${stringify("")} svelte-1acp57a`)} placeholder="Enter Phone Number (e.g., +8801xxxxxxxxx)" required> `;
  if (validationErrors.roll) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-red-500 text-sm mt-2">${escape_html(validationErrors.roll)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mb-6"><label for="batch" class="block text-white text-lg font-medium mb-2">Batch</label> <input id="batch" type="number" min="2025" max="2040"${attr("value", batch)}${attr("class", `w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${stringify("")} svelte-1acp57a`)} placeholder="Enter Batch eg. 20xx" required> `;
  if (validationErrors.batch) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-red-500 text-sm mt-2">${escape_html(validationErrors.batch)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mb-6"><label for="fbLink" class="block text-white text-lg font-medium mb-2">Facebook Profile Link</label> <input id="fbLink" type="url"${attr("value", fbLink)}${attr("class", `w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${stringify("")} svelte-1acp57a`)} placeholder="https://facebook.com/profile" required> `;
  if (validationErrors.fbLink) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-red-500 text-sm mt-2">${escape_html(validationErrors.fbLink)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mb-6"><label for="password" class="block text-white text-lg font-medium mb-2">Password</label> <input id="password" type="password"${attr("value", password)} class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent svelte-1acp57a" placeholder="Enter Password" required></div> <div class="mb-6"><label for="confirmPassword" class="block text-white text-lg font-medium mb-2">Confirm Password</label> <input id="confirmPassword" type="password"${attr("value", confirmPassword)} class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent svelte-1acp57a" placeholder="Confirm Password" required> `;
  if (!passwordMatch) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-red-500 text-sm mt-2">Passwords do not match</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="text-center"><button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300 svelte-1acp57a"${attr("disabled", !passwordMatch || !rollValid || !batchValid || !fbLinkValid, true)}>Submit</button></div></form></div>`;
  pop();
}
export {
  _page as default
};
