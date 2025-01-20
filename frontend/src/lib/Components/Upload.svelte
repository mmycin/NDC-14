<script lang="ts">
  import axios from 'axios';
  import Notification from "$lib/Utils/Notify";

  let files: File[] = []; // This will store the selected files
  const cloudName = 'djqao3rbs'; // Your Cloudinary cloud name
  const uploadPreset = 'ndc14-web-project'; // Your Cloudinary upload preset

  let uploadedUrls: string[] = []; // To store uploaded file URLs

  // Handle file input change and convert FileList to File[]
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      files = Array.from(target.files); // Convert FileList to array of File
    }
  }

  // Asynchronously upload files to Cloudinary and update uploadedUrls array
  async function uploadFiles() {
    // Reset uploaded URLs before starting the upload
    uploadedUrls = []; 

    // Loop over all the selected files
    const promises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        // Send the file to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );

        // Extract URL from response
        const data = await response.data;
        await uploadedUrls.push(data.secure_url); 
        await Notification(`Uploaded file: ${file.name}`, "success");
      } catch (error) {
        Notification(`Error uploading file: ${file.name}`);
      }
    });

    // Wait for all upload promises to complete
    await Promise.all(promises);
  }
</script>

<div class="text-white flex justify-center items-center">
  <!-- File input and upload button container -->
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
    <h2 class="text-2xl font-semibold mb-4">Upload Files</h2>

    <!-- File input -->
    <input
      type="file"
      multiple
      accept=".jpg,.jpeg,.png,.pdf"
      on:change={handleFileChange} 
      class="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:border file:border-gray-600 file:rounded-md file:bg-gray-700 file:text-white hover:file:bg-blue-600 mb-4"
    />

    <!-- Upload button -->
    <button
      on:click={uploadFiles}
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Upload Files
    </button>

    <!-- Display uploaded URLs -->
    {#if uploadedUrls.length > 0}
      <div class="mt-6 space-y-2">
        {#each uploadedUrls as url}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:underline"
          >
            {url}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
