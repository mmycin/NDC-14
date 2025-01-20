<script>
    // @ts-nocheck
    import axios from "axios";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { DeleteItem } from "$lib/Utils/Delete";
    import Notification from "$lib/Utils/Notify";

    let messages = [];
    let isLoading = true;

    async function fetchMessages() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts/`);
            messages = response.data.data;
            messages.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            isLoading = false;
        }
    }

    onMount(fetchMessages);

    const handleView = (id) => goto(`/dashboard/messages/${id}`);
    
    const handleDelete = async (id) => {
        const url = `${import.meta.env.VITE_API_URL}/contacts/${id}`;
        try {
            const success = await DeleteItem(url);
            if (success) {
                fetchMessages();
            } else {
                Notification("Error deleting message", "error");
            }
        } catch (e) {
            Notification("Error deleting message", "error");
            console.error(e);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
</script>

<div class="min-h-screen text-gray-100 p-4 md:p-6">
    <h1 class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Message Board
    </h1>

    {#if isLoading}
        <div class="flex justify-center items-center min-h-[200px]">
            <div class="animate-pulse text-blue-400">Loading...</div>
        </div>
    {:else if messages.length === 0}
        <div class="flex justify-center items-center min-h-[200px]">
            <p class="text-gray-400 text-lg">No messages available.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each messages as message (message.ID)}
                <div class="group h-full">
                    <div class="relative h-full bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-950/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30">
                        <!-- Hover Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div class="relative p-6">
                            <div class="flex justify-between items-start mb-4">
                                <h2 class="text-lg font-semibold text-white line-clamp-1 flex-1 mr-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-blue-100 group-hover:to-white transition-all duration-300">
                                    {message.name}
                                </h2>
                                <span class="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/20 whitespace-nowrap backdrop-blur-sm">
                                    {message.roll}
                                </span>
                            </div>

                            <div class="flex items-center text-xs text-gray-400 mb-4 group-hover:text-blue-300/80 transition-colors duration-300">
                                <svg class="w-4 h-4 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(message.CreatedAt)}
                            </div>

                            <p class="text-gray-400 text-sm mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                                {message.message}
                            </p>

                            <div class="flex flex-wrap gap-3 justify-start items-center">
                                <button
                                    class="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105"
                                    on:click={() => handleView(message.ID)}
                                >
                                    <svg class="w-4 h-4 mr-2 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    View Details
                                </button>
                                <button
                                    class="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-gray-900/20 hover:shadow-red-500/30 hover:scale-105"
                                    on:click={() => handleDelete(message.ID)}
                                >
                                    <svg class="w-4 h-4 mr-2 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .line-clamp-1 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>