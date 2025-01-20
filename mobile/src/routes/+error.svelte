<script>
  export let status;
  export let message;
</script>

<div class="flex items-center justify-center bg-gray-800 text-white">
  <div class="max-w-sm w-full bg-gray-900 rounded-lg shadow-lg p-6 space-y-4">
    <!-- Error Icon -->
    <div class="flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
        <path d="M12 6v6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 18v.01" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </div>

    <!-- Error Title and Message -->
    <h2 class="text-3xl font-semibold text-center">Something Went Wrong</h2>
    <p class="text-center text-lg">{message || "An unexpected error occurred. Please try again later."}</p>

    <!-- Status Code (if available) -->
    {#if status}
      <p class="text-center text-sm text-gray-400">Error Code: {status}</p>
    {/if}

    <!-- Button to go back -->
    <div class="flex justify-center">
      <a href="/" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">
        Go to Homepage
      </a>
    </div>
  </div>
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }
</style>
