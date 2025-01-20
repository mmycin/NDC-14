<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import axios from "axios";

    let allNotices = [];
    let filteredNotices = [];
    let loading = true;
    let currentPage = 1;
    let totalPages = 1;
    let searchQuery = "";
    let filterDate = "";
    let filterYear = "";

    const CACHE_KEY = "cachedNotices";
    const CACHE_TIMESTAMP_KEY = "cachedNoticesTimestamp";
    const CACHE_EXPIRY_TIME = 60 * 60 * 1000;

    const isCacheValid = () => {
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        return (
            cachedTimestamp &&
            Date.now() - parseInt(cachedTimestamp) < CACHE_EXPIRY_TIME
        );
    };

    const loadFromCache = () => {
        const cachedNotices = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (cachedNotices) {
            allNotices = cachedNotices;
            totalPages = Math.ceil(allNotices.length / 5);
            applyFilters();
            loading = false;
        }
    };

    const saveToCache = (notices) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(notices));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    };

    const fetchNotices = async (page = 1) => {
        loading = true;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/notices/`,
                { params: { page } }
            );
            allNotices = [...allNotices, ...response.data.data];
            allNotices.sort((a, b) => b.ID - a.ID);
            totalPages = Math.ceil(response.data.count / 5);
            saveToCache(allNotices);
            applyFilters();
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
        loading = false;
    };

    const formatDate = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (date) => {
        return new Date(formatDate(date)).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const applyFilters = () => {
        filteredNotices = allNotices.filter((notice) => {
            const matchesSearch = notice.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesDate = filterDate
                ? formatDate(notice.date) === filterDate
                : true;

            const matchesYear = filterYear
                ? (filterYear === "1st Year" && notice.year === 1) ||
                  (filterYear === "2nd Year" && notice.year === 2)
                : true;

            return matchesSearch && matchesDate && matchesYear;
        });
    };

    const handleInputChange = () => {
        applyFilters();
    };

    const getFileType = (file) => {
        if (file) {
            const ext = file.filename.split(".").pop();
            return ext.toLowerCase();
        }
        return null;
    };

    onMount(() => {
        const isPageReload = window.performance.navigation.type === 1;
        if (isPageReload || !isCacheValid()) {
            fetchNotices(currentPage);
        } else {
            loadFromCache();
        }
    });
</script>

<div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 py-8"
>
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <header class="text-center mb-12">
            <div class="relative inline-block">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <div
                    class="relative px-7 py-6 bg-gray-800 ring-1 ring-gray-700/50 rounded-lg leading-none flex items-top justify-start space-x-6"
                >
                    <h1
                        class="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
                    >
                        NDC Group 14 Notice Board
                    </h1>
                </div>
            </div>
            <p class="mt-4 text-gray-400 text-lg">
                Stay informed with the latest updates and announcements
            </p>
        </header>

        <!-- Filters -->
        <div class="max-w-[1600px] mx-auto mb-10">
            <div
                class="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/50"
            >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="relative">
                        <input
                            type="text"
                            placeholder="Search notices..."
                            class="w-full pl-10 pr-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all duration-200"
                            bind:value={searchQuery}
                            on:input={handleInputChange}
                            autocomplete="on"
                        />
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="date"
                        class="px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        bind:value={filterDate}
                        on:input={handleInputChange}
                        placeholder="Filter by Date"
                    />
                    <select
                        class="px-4 py-3 bg-gray-700/50 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        bind:value={filterYear}
                        on:change={handleInputChange}
                    >
                        <option value="">All Years</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Notice List -->
        <div class="max-w-[1600px] mx-auto">
            {#if loading && currentPage === 1}
                <div class="flex justify-center items-center h-64">
                    <div class="flex flex-col items-center space-y-4">
                        <div
                            class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                        ></div>
                        <p class="text-gray-400 font-medium animate-pulse">
                            Loading notices...
                        </p>
                    </div>
                </div>
            {:else if filteredNotices.length === 0}
                <div class="flex justify-center items-center h-64">
                    <div
                        class="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8"
                    >
                        <svg
                            class="w-16 h-16 text-gray-600 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p class="text-gray-400 text-lg mb-2">
                            No notices found
                        </p>
                        <p class="text-gray-500">
                            Try adjusting your filters or search terms
                        </p>
                    </div>
                </div>
            {:else}
                <div class="space-y-6">
                    {#each filteredNotices as notice (notice.ID)}
                        <div class="group">
                            <div class="relative">
                                <div
                                    class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-300"
                                ></div>
                                <div
                                    class="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1"
                                >
                                    <div
                                        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4"
                                    >
                                        <h2
                                            class="text-2xl font-extrabold text-indigo-300 bg-clip-text text-transparent
           bg-gradient-to-r from-blue-400 to-purple-600
           group-hover:from-purple-600 group-hover:to-blue-400
           transition-all duration-300 ease-in-out"
                                        >
                                            {notice.title}
                                        </h2>

                                        <div class="flex items-center gap-3">
                                            <span
                                                class="px-3 py-1 text-sm font-medium bg-blue-500/10 text-blue-400 rounded-full"
                                            >
                                                {notice.year === 1
                                                    ? "1st Year"
                                                    : "2nd Year"}
                                            </span>
                                            <span class="text-sm text-gray-400">
                                                {formatDisplayDate(notice.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="prose prose-invert max-w-none">
                                        <div
                                            class="text-gray-300 leading-relaxed"
                                        >
                                            {@html notice.content}
                                        </div>
                                    </div>
                                    {#if notice.files && notice.files.length > 0}
                                        {#each notice.files as file}
                                            {#if getFileType(file) === "pdf"}
                                                <div
                                                    class="flex justify-center mt-4"
                                                >
                                                    <a
                                                        href={`https://res.cloudinary.com/djqao3rbs/image/upload/fl_attachment/${file.filename.split("/image/upload/")[1]}`}
                                                        download={file.filename}
                                                        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg"
                                                    >
                                                        Download PDF
                                                    </a>
                                                </div>
                                            {:else if getFileType(file) === "jpg" || getFileType(file) === "jpeg" || getFileType(file) === "png" || getFileType(file) === "gif"}
                                                <div
                                                    class="flex justify-center mt-4"
                                                >
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
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- Loading Indicator -->
            {#if loading}
                <div
                    class="flex justify-center items-center py-4 px-6 bg-gray-700 rounded-xl text-white"
                >
                    Loading more...
                </div>
            {/if}

            <!-- Pagination -->
            {#if !loading && totalPages > 1}
                <div class="flex justify-center items-center py-8 space-x-4">
                    <button
                        class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold"
                        on:click={() => {
                            currentPage = Math.max(1, currentPage - 1);
                            fetchNotices(currentPage);
                        }}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold"
                        on:click={() => {
                            currentPage = Math.min(totalPages, currentPage + 1);
                            fetchNotices(currentPage);
                        }}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    img {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 8px;
        margin-top: 10px;
        max-height: 400px;
    }
</style>
