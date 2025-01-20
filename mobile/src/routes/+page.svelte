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
    let isMenuOpen = false;
    let fetchText = "";

    const fetchNotices = async (page = 1) => {
        loading = true;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/notices/`,
                { params: { page } }
            );
            allNotices = [...response.data.data];
            allNotices.sort((a, b) => b.ID - a.ID);
            totalPages = Math.ceil(response.data.count / 5);
            applyFilters();
        } catch (error) {
            fetchText =
                "Unable to fetch notices. Please make sure you are connected to the internet.";
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
        fetchNotices();

        if (fetchNotices.length == 0) {
            fetchText = "No notices found.";
        }
    });
</script>

<div
    class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <header class="text-center mb-8 sm:mb-12">
            <div class="relative inline-block">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl blur-md opacity-25 group-hover:opacity-75 transition duration-500"
                ></div>
                <div
                    class="relative px-6 py-4 sm:px-8 sm:py-6 bg-slate-900/90 backdrop-blur-sm ring-1 ring-white/10 rounded-xl"
                >
                    <div class="flex justify-between items-center">
                        <h1
                            class="text-xl sm:text-4xl font-bold pr-2 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap"
                        >
                            NDC Group 14 Notice Board
                        </h1>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button
                            on:click={() => fetchNotices(currentPage)}
                            class="inline-flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors duration-200"
                        >
                            <svg
                                class="w-4 h-4 sm:w-6 sm:h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="100"
                                height="100"
                                viewBox="0,0,255.99536,255.99536"
                                style="fill:#1A1A1A;"
                            >
                                <g
                                    fill="#f3f0f0"
                                    fill-rule="nonzero"
                                    stroke="none"
                                    stroke-width="1"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-miterlimit="10"
                                    stroke-dasharray=""
                                    stroke-dashoffset="0"
                                    font-family="none"
                                    font-weight="none"
                                    font-size="none"
                                    text-anchor="none"
                                    style="mix-blend-mode: normal"
                                    ><g transform="scale(8.53333,8.53333)"
                                        ><path
                                            d="M15,3c-2.9686,0 -5.69718,1.08344 -7.79297,2.875c-0.28605,0.22772 -0.42503,0.59339 -0.36245,0.95363c0.06258,0.36023 0.31676,0.6576 0.66286,0.77549c0.3461,0.1179 0.72895,0.03753 0.99842,-0.20959c1.74821,-1.49444 4.01074,-2.39453 6.49414,-2.39453c5.19656,0 9.45099,3.93793 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.51129,-6.14834 -5.67138,-11 -11.94922,-11zM4,10l-4,6h3.05078c0.51129,6.14834 5.67138,11 11.94922,11c2.9686,0 5.69718,-1.08344 7.79297,-2.875c0.28605,-0.22772 0.42504,-0.59339 0.36245,-0.95363c-0.06258,-0.36023 -0.31676,-0.6576 -0.66286,-0.7755c-0.3461,-0.1179 -0.72895,-0.03753 -0.99842,0.20959c-1.74821,1.49444 -4.01074,2.39453 -6.49414,2.39453c-5.19656,0 -9.45099,-3.93793 -9.95117,-9h2.95117z"
                                        ></path></g
                                    ></g
                                >
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <p class="mt-4 text-slate-400 text-base sm:text-lg">
                Stay informed with the latest updates and announcements
            </p>
        </header>

        <!-- Filters -->
        <div class="mb-8">
            <div
                class="bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl border border-slate-800"
            >
                <div
                    class="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4"
                >
                    <!-- Search Input -->
                    <div class="relative">
                        <input
                            type="text"
                            placeholder="Search notices..."
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 text-white rounded-lg border border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 placeholder-slate-400 transition-all duration-200"
                            bind:value={searchQuery}
                            on:input={handleInputChange}
                        />
                        <svg
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <!-- Date Filter -->
                    <input
                        type="text"
                        class="w-full px-4 py-2.5 bg-slate-800/50 text-white rounded-lg border border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 placeholder-slate-400 transition-all duration-200"
                        bind:value={filterDate}
                        on:input={handleInputChange}
                        placeholder="Filter by Date"
                        on:blur={(e) =>
                            !e.target.value && (e.target.type = "text")}
                        on:focus={(e) => (e.target.type = "date")}
                    />

                    <!-- Year Filter -->
                    <select
                        class="w-full px-4 py-2.5 bg-slate-800/50 text-white rounded-lg border border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
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
        <div class="space-y-6">
            {#if loading && currentPage === 1}
                <div class="flex justify-center items-center h-64">
                    <div class="flex flex-col items-center space-y-4">
                        <div
                            class="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"
                        ></div>
                        <p class="text-slate-400 font-medium animate-pulse">
                            Loading notices...
                        </p>
                    </div>
                </div>
            {:else if filteredNotices.length === 0}
                <div class="flex justify-center items-center h-64">
                    <div
                        class="text-center bg-slate-900/50 backdrop-blur-sm rounded-xl p-8"
                    >
                        <svg
                            class="w-16 h-16 text-slate-600 mx-auto mb-4"
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
                        <p class="text-slate-400 text-lg mb-2">
                            No notices found
                        </p>
                        <p class="text-slate-500">
                            Try adjusting your filters or search terms or check
                            your internet.
                        </p>
                    </div>
                </div>
            {:else}
                {#each filteredNotices as notice, index (notice.ID + "-" + index)}
                    <div
                        class="group transform transition-all duration-300 hover:-translate-y-1"
                    >
                        <div class="relative">
                            <div
                                class="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"
                            ></div>
                            <div
                                class="relative bg-slate-900/90 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6"
                            >
                                <div
                                    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4"
                                >
                                    <h2
                                        class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
                                    >
                                        {notice.title}
                                    </h2>
                                    <div
                                        class="flex flex-wrap items-center gap-3"
                                    >
                                        <span
                                            class="px-3 py-1 text-sm font-medium bg-violet-500/10 text-violet-400 rounded-full"
                                        >
                                            {notice.year === 1
                                                ? "1st Year"
                                                : "2nd Year"}
                                        </span>
                                        <span class="text-sm text-slate-400">
                                            {formatDisplayDate(notice.date)}
                                        </span>
                                    </div>
                                </div>

                                <div class="prose prose-invert max-w-none">
                                    <div
                                        class="text-slate-300 leading-relaxed [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300"
                                    >
                                        {@html notice.content}
                                    </div>
                                </div>

                                {#if notice.files && notice.files.length > 0}
                                    <div class="mt-6 space-y-4">
                                        {#each notice.files as file}
                                            {#if getFileType(file) === "pdf"}
                                                <div
                                                    class="flex justify-center"
                                                >
                                                    <a
                                                        href={`https://res.cloudinary.com/djqao3rbs/image/upload/fl_attachment/${file.filename.split("/image/upload/")[1]}`}
                                                        download={file.filename}
                                                        class="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-base transition-colors duration-200"
                                                    >
                                                        <svg
                                                            class="w-5 h-5 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                            />
                                                        </svg>
                                                        Download PDF
                                                    </a>
                                                </div>
                                            {:else if ["jpg", "jpeg", "png", "gif"].includes(getFileType(file))}
                                                <div
                                                    class="flex justify-center"
                                                >
                                                    <!-- svelte-ignore a11y_img_redundant_alt -->
                                                    <img
                                                        src={file.filename}
                                                        alt="Notice Image"
                                                        class="w-full max-w-2xl h-auto rounded-lg shadow-lg"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <!-- Pagination -->
        {#if !loading && totalPages > 1}
            <div class="flex justify-center items-center py-8 space-x-4">
                <button
                    class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    on:click={() => {
                        currentPage = Math.max(1, currentPage - 1);
                        fetchNotices(currentPage);
                    }}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

<style>
    :global(html) {
        scroll-behavior: smooth;
    }

    :global(body) {
        @apply bg-slate-950;
    }

    img {
        max-height: 600px;
        object-fit: contain;
    }
</style>
