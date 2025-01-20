<script>
    // Previous script content remains the same
    // @ts-nocheck
    import axios from "axios";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { DeleteItem } from "$lib/Utils/Delete";
    import Notification from "$lib/Utils/Notify";

    let notices = [];
    let filteredNotices = [];
    let isLoading = true;

    // Filters
    let searchTitle = "";
    let selectedYear = "";

    async function fetchNotices() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/notices/`
            );
            notices = response.data.data;
            notices.sort(
                (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
            );
            filteredNotices = notices;
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            isLoading = false;
        }
    }

    const formatDate = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("/");
        return `${day}/${month}/${year}`;
    };

    function applyFilters() {
        filteredNotices = notices.filter((notice) => {
            const matchesTitle = notice.title
                .toLowerCase()
                .includes(searchTitle.toLowerCase());
            
            const matchesYear =
                selectedYear === "1st Year"
                    ? notice.year === 1
                    : selectedYear === "2nd Year"
                      ? notice.year === 2
                      : true;

            return matchesTitle && matchesYear;
        });
    }

    onMount(fetchNotices);

    const handleView = (id) => {
        goto(`/dashboard/notices/${id}`);
    };

    const handleEdit = (id) => {
        goto(`/dashboard/notices/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const url = `${import.meta.env.VITE_API_URL}/notices/${id}`;
        try {
            const success = await DeleteItem(url);
            if (success) {
                fetchNotices();
            } 
        } catch (e) {
            Notification("Error deleting notice", "error");
            console.error(e);
        }
    };

    const goToAddNotice = () => {
        goto('/dashboard/notices/add');
    };
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                Notice Board
            </h1>
            <p class="text-gray-400 max-w-2xl mx-auto">
                Manage all the notices for the NDC Group 14 Notice Board
            </p>
            <button 
                class="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                on:click={goToAddNotice}>
                Add New Notice
            </button>
        </div>

        <!-- Filters -->
        <div class="max-w-3xl mx-auto mb-8">
            <div class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search notices..."
                            class="w-full pl-10 pr-4 py-2 bg-gray-700/30 text-white rounded-lg border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all duration-200"
                            bind:value={searchTitle}
                            on:input={applyFilters}
                        />
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div class="sm:w-48">
                        <select
                            class="w-full px-4 py-2 bg-gray-700/30 text-white rounded-lg border border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            bind:value={selectedYear}
                            on:change={applyFilters}
                        >
                            <option value="">All Years</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex justify-center items-center h-64">
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-10 h-10 border-3 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div>
                    <p class="text-gray-400 text-sm animate-pulse">Loading notices...</p>
                </div>
            </div>
        {:else if filteredNotices.length === 0}
            <div class="flex justify-center items-center h-64">
                <div class="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-gray-700/50">
                    <svg class="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-400 text-base mb-1">No notices found</p>
                    <p class="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
                </div>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each filteredNotices as notice (notice.ID)}
                    <div class="h-full">
                        <div class="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 h-full hover:shadow-lg transition-all duration-300">
                            <div class="p-5">
                                <div class="flex justify-between items-start mb-4">
                                    <h2 class="text-lg font-medium text-white line-clamp-2 flex-1 mr-2">
                                        {notice.title}
                                    </h2>
                                    <span class="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md whitespace-nowrap border border-blue-500/20">
                                        {notice.year === 1 ? "1st Year" : "2nd Year"}
                                    </span>
                                </div>
                                
                                <div class="flex items-center text-xs text-gray-400 mb-4">
                                    <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(notice.date)}
                                </div>

                                <div class="flex flex-wrap gap-2 justify-center items-center">
                                    <button
                                        class="flex items-center justify-center px-3 py-1.5 bg-blue-500/80 hover:bg-blue-500 text-white text-xs font-medium rounded-md transition-colors duration-200"
                                        on:click={() => handleView(notice.ID)}
                                    >
                                        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                        View
                                    </button>
                                    <button
                                        class="flex items-center justify-center px-3 py-1.5 bg-emerald-500/80 hover:bg-emerald-500 text-white text-xs font-medium rounded-md transition-colors duration-200"
                                        on:click={() => handleEdit(notice.ID)}
                                    >
                                        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        class="flex items-center justify-center px-3 py-1.5 bg-gray-700 hover:bg-red-500/80 text-gray-300 hover:text-white text-xs font-medium rounded-md transition-colors duration-200"
                                        on:click={() => handleDelete(notice.ID)}
                                    >
                                        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</div>