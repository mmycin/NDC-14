<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { IsValidToken, IsTokenExpired, getID } from "$lib/Utils/Token";
    import Notification from "$lib/Utils/Notify";

    let name = "";
    let title = "";
    let date = "";
    let content = "";
    let year = "";
    let ID = "";
    let uploadedUrls: string[] = []; // To store uploaded file URLs
    let files: File[] = []; // To store the selected files
    let loading = false; // State to track if files are uploading

    const cloudName = "djqao3rbs"; // Your Cloudinary cloud name
    const uploadPreset = "ndc14-web-project"; // Your Cloudinary upload preset

    // Fetch user data on component mount
    onMount(async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (
                token &&
                token.length > 0 &&
                IsValidToken(token) &&
                !IsTokenExpired(token)
            ) {
                ID = getID(token);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/id/${ID}`
                );
                name = response.data.data.fullName;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });

    // Handle file input change and convert FileList to File[]
    function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target && target.files) {
            files = Array.from(target.files); // Convert FileList to array of File
        }
    }

    // Asynchronously upload files to Cloudinary and update uploadedUrls array
    async function uploadFiles() {
        uploadedUrls = []; // Reset uploaded URLs before starting the upload
        loading = true; // Set loading state to true when upload starts

        // Loop over all the selected files
        const promises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            try {
                // Send the file to Cloudinary
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        params: { resource_type: "auto", chunk_size: 6000000 }, // Set chunk size to 6 MB
                    }
                );

                // Extract URL from response
                const data = await response.data;
                uploadedUrls.push(data.secure_url); // Add the URL to the list of uploaded URLs
                await Notification(`Uploaded file: ${file.name}`, "success");
            } catch (error) {
                console.error(`Error uploading file: ${file.name}`, error);
                Notification(`Error uploading file: ${file.name}`, "error");
            }
        });

        // Wait for all upload promises to complete
        await Promise.all(promises);

        loading = false; // Set loading state to false when upload is complete
    }

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (!title || !date || !content || !year) {
            Notification("All fields are required", "error");
            return;
        }

        const formattedDate = new Date(date)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "/");

        // Initialize the noticeData with basic information
        const noticeData = {
            title,
            date: formattedDate,
            content,
            year: year === "1st Year" ? 1 : 2,
            added_by: ID,
            files: [] as { filename: string; index: string; url: string }[], // Initialize the files array if files are provided
        };

        // Upload the files before submitting the form
        if (files.length > 0) {
            await uploadFiles(); // Wait for files to be uploaded before proceeding
        }

        // Add file metadata (filename, index, and URL) to the noticeData
        if (uploadedUrls.length > 0) {
            uploadedUrls.forEach((url) => {
                noticeData.files.push({
                    filename: url,
                });
            });
        }

        // Submit the notice data along with uploaded file URLs
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/notices/`,
                noticeData,
                { params: { page: 1 } }
            );
            Notification("Notice added successfully!", "success");
            goto("/dashboard/notices");
        } catch (error) {
            console.error("Error adding notice:", error);
            Notification("Error adding notice", "error");
        }
    }
</script>

<div
    class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center py-8"
>
    <div
        class="w-full max-w-lg bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700/50"
    >
        <h2 class="text-2xl font-bold text-white mb-6 text-center">
            Add New Notice
        </h2>
        <p class="text-gray-400 text-center mb-6">Added by {name}</p>
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Title -->
            <div>
                <label for="title" class="block text-gray-400 font-medium mb-2"
                    >Notice Title</label
                >
                <input
                    type="text"
                    placeholder="Enter notice title"
                    class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    bind:value={title}
                />
            </div>

            <!-- Date -->
            <div>
                <label for="date" class="block text-gray-400 font-medium mb-2"
                    >Date</label
                >
                <input
                    type="date"
                    class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    bind:value={date}
                />
            </div>

            <!-- Content -->
            <div>
                <label
                    for="content"
                    class="block text-gray-400 font-medium mb-2">Content</label
                >
                <textarea
                    rows="4"
                    placeholder="Enter notice content"
                    class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    bind:value={content}
                ></textarea>
            </div>

            <!-- Year -->
            <div>
                <label for="year" class="block text-gray-400 font-medium mb-2"
                    >Year</label
                >
                <select
                    class="w-full px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    bind:value={year}
                >
                    <option value="" disabled selected>Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                </select>
            </div>

            <!-- File Upload -->
            <div>
                <label for="file" class="block text-gray-400 font-medium mb-2"
                    >Upload Files</label
                >
                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    on:change={handleFileChange}
                    class="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:border file:border-gray-600 file:rounded-md file:bg-gray-700 file:text-white hover:file:bg-blue-600 mb-4"
                />
            </div>

            <!-- Loader -->
            {#if loading}
                <div class="flex justify-center items-center">
                    <div
                        class="border-t-4 border-blue-500 w-8 h-8 mx-auto animate-spin rounded-full"
                    ></div>
                    <span class="ml-2 text-white">Uploading...</span>
                </div>
            {/if}

            <!-- Submit Button -->
            <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            >
                {#if loading}Processing...{:else}Add Notice{/if}
            </button>
        </form>
    </div>
</div>
