import "clsx";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { N as pop, J as push } from "../../../chunks/index2.js";
/* empty css                       */
/* empty css                       */
function Contact($$payload, $$props) {
  push();
  let name = "";
  let email = "";
  let roll = "";
  let message = "";
  let isSubmitting = false;
  $$payload.out += `<section class="contact-section py-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black svelte-1dhlzs9"><div class="max-w-2xl mx-auto px-4"><h2 class="section-title svelte-1dhlzs9">Contact</h2> <div class="note-container mb-6 svelte-1dhlzs9"><p class="note-text text-sm sm:text-base svelte-1dhlzs9">This page is for feedback and contact with the captains of
                Group-14. Only students of Group-14 are permitted to send
                messages.</p></div> <h3 class="text-3xl align-middle mb-2">Message:</h3> <form><div class="grid grid-cols-1 gap-6"><input type="text" placeholder="Your Name" class="form-input svelte-1dhlzs9" id="name"${attr("value", name)} required> <input type="email" placeholder="Your Email" class="form-input svelte-1dhlzs9" id="email"${attr("value", email)} required> <input type="text" placeholder="Your College Roll" class="form-input svelte-1dhlzs9" id="roll"${attr("value", roll)} required> <textarea placeholder="Your Message" class="form-input svelte-1dhlzs9" rows="4" id="message" required>`;
  const $$body = escape_html(message);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button type="submit" class="button svelte-1dhlzs9"${attr("disabled", isSubmitting, true)}>${escape_html("Send Message")}</button></div></form></div></section>`;
  pop();
}
function CurrentAdmins($$payload, $$props) {
  push();
  $$payload.out += `<section class="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 py-16 px-6 w-full flex flex-col items-center svelte-1t7omc5"><h1 class="text-4xl font-extrabold text-center mb-6 text-white leading-tight svelte-1t7omc5">Captains of Batch ${escape_html("")}</h1> <p class="text-center text-gray-400 mb-8">For any help, please contact the captains of the group-14</p> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center py-10 svelte-1t7omc5"><div class="loader svelte-1t7omc5"></div></div>`;
  }
  $$payload.out += `<!--]--></section> <section class="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 py-16 px-6 w-full flex flex-col items-center svelte-1t7omc5"><h1 class="text-4xl font-extrabold text-center mb-6 text-white leading-tight svelte-1t7omc5">Captains of Batch ${escape_html("")}</h1> <p class="text-center text-gray-400 mb-8">For any help, please contact the captains of the group-14</p> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-center items-center py-10 svelte-1t7omc5"><div class="loader svelte-1t7omc5"></div></div>`;
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="container flex flex-col items-center justify-center md:mx-20 pb-5 bg-gradient-to-r from-gray-800 via-gray-900 to-black">`;
  Contact($$payload);
  $$payload.out += `<!----> <hr class="border-white w-5/6 border-3"> <hr class="border-white w-5/6 border-3 mt-2"> <hr class="border-white w-5/6 border-3 mt-2"> `;
  CurrentAdmins($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
