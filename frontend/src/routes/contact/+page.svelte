<script>
    import Contact from "$lib/Components/Contact/Contact.svelte";
    import CurrentAdmins from "$lib/Components/Contact/CurrentAdmins.svelte";
</script>

<div class="container flex flex-col items-center justify-center md:mx-20 pb-5 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
    <Contact />
    <hr class="border-white w-5/6 border-3" />
    <hr class="border-white w-5/6 border-3 mt-2" />
    <hr class="border-white w-5/6 border-3 mt-2" />
    <CurrentAdmins />
</div>
