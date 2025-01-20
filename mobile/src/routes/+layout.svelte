<script>
  import { onMount } from "svelte";
  import Footer from "$lib/Components/Layouts/Footer.svelte";
  import "../app.css";
  import Navbar from "../lib/Components/Layouts/Navbar.svelte";
  import { IsTokenExpired } from "$lib/Utils/Token";
  import "../app.css";

  export async function load() {
    try {
      if(localStorage.length > 0) {
        const token = localStorage.getItem('jwtToken');
        if(token && IsTokenExpired(token)) {
          localStorage.removeItem('jwtToken');
        } 
      } 
    } catch (error) {
      console.error(error);
    }
  }
  onMount(() => { load() })
</script>

<head>
  <!-- <slot /> -->
  <title>NDC Group 14 Notice Board</title>
</head>

<main
  class="flex flex-col min-h-screen bg-cover bg-center"
>
  <Navbar />

  <!-- Main Content Section -->
  <main class="flex-grow flex justify-center items-center ">
    <slot />
  </main>

  <Footer />
</main>

<style>
    :global(html) {
        overflow-y: auto;
    }
</style>