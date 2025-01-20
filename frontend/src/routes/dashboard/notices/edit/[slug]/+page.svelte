<script lang="ts">
    // @ts-nocheck
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { IsValidToken, IsTokenExpired, getID } from "$lib/Utils/Token";
    import Notification from "$lib/Utils/Notify";

    export let data;
    const noticeId = data.slug;

    let name = "";
    let title = "";
    let date = "";
    let content = "";
    let year = "";
    let ID = "";
    let uploadedUrls: string[] = [];
    let existingFiles: string[] = []; // To store existing file URLs
    let files: File[] = [];
    let loading = false;
    let isLoading = true; // For initial data fetch

    const cloudName = "djqao3rbs";
    const uploadPreset = "ndc14-web-project";

    function getUserID() {
        const token = localStorage.getItem("jwtToken");
        if (
            token &&
            token.length > 0 &&
            IsValidToken(token) &&
            !IsTokenExpired(token)
        ) {
            const id = getID(token);
            ID = id;
            return id;
        } else {
            goto("/login");
        }
    }

    // Fetch notice and user data on mount
    onMount(async () => {
        try {
            getUserID();
            // Fetch user data
            const userResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/id/${ID}`
            );
            name = userResponse.data.data.fullName;

            // Fetch notice data
            const noticeResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/notices/${noticeId}`
            );
            const noticeData = noticeResponse.data.data;

            // Populate form fields
            title = noticeData.title;
            content = noticeData.content;
            year = noticeData.year === 1 ? "1st Year" : "2nd Year";

            // Convert date from DD/MM/YYYY to YYYY-MM-DD for input type="date"
            const [day, month, years] = noticeData.date.split("/");
            date = `${years}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

            // Store existing files
            existingFiles =
                noticeData.files?.map((file) => file.filename) || [];
        } catch (error) {
            console.error("Error fetching data:", error);
            Notification("Error loading notice data", "error");
        } finally {
            isLoading = false;
        }
    });

    function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target && target.files) {
            files = Array.from(target.files);
        }
    }

    async function uploadFiles() {
        uploadedUrls = [];
        loading = true;

        const promises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            try {
                 const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        params: { resource_type: "auto", chunk_size: 6000000 }, // Set chunk size to 6 MB
                    });

                const data = await response.data;
                uploadedUrls.push(data.secure_url);
                // Collect uploaded file URLs
                await Notification(`Updated file: ${file.name}`, "success");
            } catch (error) {
                console.error(`Error uploading file: ${file.name}`, error);
            }
        });

        await Promise.all(promises);
        loading = false;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title || !date || !content || !year) {
            Notification("All fields are required", "error");
            return;
        }

        const formattedDate = new Date(date)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "/");

        // Initialize update data with existing files by default
        let updateData = {
            title,
            date: formattedDate,
            updated_by: getUserID(),
            content,
            year: year === "1st Year" ? 1 : 2,
            files: existingFiles.map((url) => ({ filename: url })), // Include existing files by default
        };

        try {
            // If new files are uploaded, upload them and replace the existing files
            if (files.length > 0) {
                await uploadFiles(); // Upload new files
                updateData.files = uploadedUrls.map((url) => ({
                    filename: url,
                })); // Use new files only
            }

            // Update the notice with the updated file list
            await axios.put(
                `${import.meta.env.VITE_API_URL}/notices/${noticeId}`,
                updateData
            );

            Notification("Notice updated successfully!", "success");
            goto(`/dashboard/notices/${noticeId}`);
        } catch (error) {
            console.error("Error updating notice:", error);
            Notification("Error updating notice", "error");
        }
    }

    async function handleDeleteFile(fileUrl: string) {
        try {
            // Remove file from existingFiles array
            existingFiles = existingFiles.filter((file) => file !== fileUrl);

            // If no new files were added, use the remaining files in the existingFiles array
            const updateData = {
                title,
                updated_by: getUserID(),
                date: new Date(date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "/"),
                content,
                year: year === "1st Year" ? 1 : 2,
                files: existingFiles.map((url) => ({ filename: url })), // Send the updated list of files
            };
            // Update the notice with the new file list (after deletion)
            await axios.put(
                `${import.meta.env.VITE_API_URL}/notices/${noticeId}`,
                updateData
            );

            Notification("File removed", "success");
        } catch (error) {
            console.error("Error removing file:", error);
            Notification("Error removing file", "error");
        }
    }
</script>

<div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4"
>
    <div class="max-w-2xl mx-auto">
        <div
            class="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden"
        >
            <!-- Header -->
            <div class="bg-gray-800/60 border-b border-gray-700/50 px-6 py-4">
                <h2
                    class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                >
                    Update Notice
                </h2>
                <p class="text-gray-400 mt-1">Editor: {name}</p>
            </div>

            {#if isLoading}
                <div class="flex justify-center items-center h-64">
                    <div class="flex flex-col items-center space-y-3">
                        <div
                            class="w-10 h-10 border-3 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"
                        ></div>
                        <p class="text-gray-400 text-sm">
                            Loading notice data...
                        </p>
                    </div>
                </div>
            {:else}
                <form
                    on:submit|preventDefault={handleSubmit}
                    class="p-6 space-y-6"
                >
                    <!-- Title -->
                    <div class="space-y-2">
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-300"
                            >Notice Title</label
                        >
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter notice title"
                            class="w-full px-4 py-2.5 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                            bind:value={title}
                        />
                    </div>

                    <!-- Date -->
                    <div class="space-y-2">
                        <label
                            for="date"
                            class="block text-sm font-medium text-gray-300"
                            >Date</label
                        >
                        <input
                            type="date"
                            id="date"
                            class="w-full px-4 py-2.5 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                            bind:value={date}
                        />
                    </div>

                    <!-- Content -->
                    <div class="space-y-2">
                        <label
                            for="content"
                            class="block text-sm font-medium text-gray-300"
                            >Content</label
                        >
                        <textarea
                            id="content"
                            rows="6"
                            placeholder="Enter notice content"
                            class="w-full px-4 py-2.5 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
                            bind:value={content}
                        ></textarea>
                    </div>

                    <!-- Year -->
                    <div class="space-y-2">
                        <label
                            for="year"
                            class="block text-sm font-medium text-gray-300"
                            >Year</label
                        >
                        <select
                            id="year"
                            class="w-full px-4 py-2.5 bg-gray-700/50 text-white rounded-xl border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                            bind:value={year}
                        >
                            <option value="" disabled>Select year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                        </select>
                    </div>

                    <!-- Existing Files -->
                    {#if existingFiles.length > 0}
                        <div class="space-y-2">
                            <label
                                for="existingFiles"
                                class="block text-sm font-medium text-gray-300"
                                >Existing Files</label
                            >
                            <div class="space-y-2">
                                {#each existingFiles as fileUrl}
                                    <div
                                        class="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                                        id="existingFiles"
                                    >
                                        <span
                                            class="text-sm text-gray-300 truncate flex-1"
                                        >
                                            {fileUrl.split("/").pop()}
                                        </span>
                                        <!-- svelte-ignore a11y_consider_explicit_label -->
                                        <button
                                            type="button"
                                            class="ml-2 p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors"
                                            on:click={() =>
                                                handleDeleteFile(fileUrl)}
                                        >
                                            <svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- New File Upload -->
                    <div class="space-y-2">
                        <label
                            for="file"
                            class="block text-sm font-medium text-gray-300"
                            >Upload New Files</label
                        >
                        <input
                            type="file"
                            id="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.pdf"
                            on:change={handleFileChange}
                            class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 cursor-pointer"
                        />
                    </div>

                    <!-- Loading State -->
                    {#if loading}
                        <div class="flex justify-center items-center py-2">
                            <div
                                class="w-8 h-8 border-3 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"
                            ></div>
                            <span class="ml-2 text-gray-300"
                                >Uploading files...</span
                            >
                        </div>
                    {/if}

                    <!-- Action Buttons -->
                    <div class="flex gap-4 pt-4">
                        <button
                            type="button"
                            class="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-xl transition-colors duration-200"
                            on:click={() => goto("/dashboard/notices")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Notice"}
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
