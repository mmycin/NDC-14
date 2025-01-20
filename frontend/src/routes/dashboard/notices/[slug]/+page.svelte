<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { onMount } from "svelte";
    import Notification from "$lib/Utils/Notify";
    import { DeleteItem } from "$lib/Utils/Delete";

    let notice = {};
    let isLoading = true;
    let message = {};

    onMount(async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/notices/${data.slug}`
            );
            notice = await response.data.data;
            const userRes = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/id/${notice.added_by}`
            );
            const user = await userRes.data.data;
            notice.added_by_name = user.fullName;
            if (notice.updated_by) {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/id/${notice.updated_by}`
                );
                const user = await res.data.data;
                notice.updated_by_name = user.fullName;
            }
        } catch (error) {
            console.error("Error fetching notice:", error);
        } finally {
            isLoading = false;
        }
    });

    export let data;

    function goBack() {
        window.history.back();
    }
 const formatDate = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (date) => {
        date = formatDate(date)
        return new Date(formatDate(date)).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    function getFileType(file) {
        return file.filename.split('.').pop().toLowerCase();
    }
</script>

<div class="min-h-screen bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {#if isLoading}
            <div class="flex justify-center items-center h-64">
                <div class="flex flex-col items-center space-y-4">
                    <div
                        class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    ></div>
                    <span class="text-gray-400 font-medium"
                        >Loading notice...</span
                    >
                </div>
            </div>
        {:else}
            <div class="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <!-- Header Section -->
                <div
                    class="px-6 py-8 sm:px-8 bg-gradient-to-r from-gray-800 to-gray-700"
                >
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center space-x-2">
                            <span
                                class="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
                            >
                                {notice.year === 1 ? "1st Year" : "2nd Year"}
                            </span>
                        </div>
                    </div>
                    <h1
                        class="text-3xl font-bold text-white mb-4 leading-tight"
                    >
                        {notice.title}
                    </h1>
                    <div
                        class="flex items-center space-x-4 text-sm text-gray-400"
                    >
                        <span>Date: {formatDisplayDate(notice.date)}</span>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="px-6 py-8 sm:px-8">
                    <div class="prose prose-invert max-w-none">
                        <p class="text-gray-300 leading-relaxed">
                            {@html notice.content}
                        </p>
                    </div>
                </div>

                <!-- File Section -->
                {#if notice.files && notice.files.length > 0}
                    <div class="px-6 py-8 sm:px-8">
                        <div class="text-white text-lg font-semibold mb-4">Attachments</div>
                        {#each notice.files as file}
                            {#if getFileType(file) === "pdf"}
                                <div class="flex justify-center mt-4">
                                    <a
                                        href={`https://res.cloudinary.com/djqao3rbs/image/upload/fl_attachment/${file.filename.split("/image/upload/")[1]}`}
                                        download={file.filename}
                                        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            {:else if getFileType(file) === "jpg" || getFileType(file) === "jpeg" || getFileType(file) === "png" || getFileType(file) === "gif"}
                                <div class="flex justify-center mt-4">
                                    <!-- svelte-ignore a11y_img_redundant_alt -->
                                    <img
                                        src={file.filename}
                                        alt="Notice Image"
                                        class="w-full h-72 object-cover rounded-lg"
                                        style="margin-top: 10px;"
                                    />
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}

                <!-- Footer Section -->
                <div
                    class="px-6 py-6 sm:px-8 bg-gray-800/50 border-t border-gray-700"
                >
                    <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
                    >
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-400">Created by</span>
                            <a
                                href="/dashboard/users/{notice.added_by}"
                                class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                {notice.added_by_name}
                            </a>
                        </div>
                        {#if notice.updated_by}
                            <div class="flex items-center space-x-2">
                                <span class="text-sm text-gray-400">Updated by</span>
                                <a
                                    href="/dashboard/users/{notice.updated_by}"
                                    class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    {notice.updated_by_name}
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}

        <div class="flex justify-center mt-5 items-stretch">
            <button
                on:click={goBack}
                class="px-6 py-3 rounded-xl mr-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Go Back
            </button>

            <button
                on:click={goto(`/dashboard/notices/edit/${data.slug}`)}
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Edit
            </button>
        </div>
    </div>
</div>

<style>
    /* Only keeping essential custom styles that can't be handled by Tailwind */
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
