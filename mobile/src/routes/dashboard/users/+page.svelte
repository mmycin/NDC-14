<script>
    // @ts-nocheck
    import axios from "axios";
    import { onMount } from "svelte";

    let users = [];
    let isLoading = true;
    let selectedBatch = "";
    let batches = [];
    let searchQuery = "";
    let showAdminsOnly = false;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/`
            );
            users = response.data.data.sort((a, b) => b.batch - a.batch);
            batches = [...new Set(users.map((user) => user.batch))].sort(
                (a, b) => b - a
            );
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            isLoading = false;
        }
    };

    onMount(() => {
        fetchUsers();
    });

    $: filteredUsers = users.filter((user) => {
        const matchesBatch = selectedBatch
            ? user.batch === selectedBatch
            : true;
        const matchesSearchQuery = searchQuery
            ? user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesAdminFilter = showAdminsOnly ? user.isAdmin : true;
        return matchesBatch && matchesSearchQuery && matchesAdminFilter;
    });
</script>

<div
    class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
>
    <div class="container mx-auto px-3 py-4">
        <!-- Animated Header with Gradient Underline -->
        <div class="text-center mb-6 relative">
            <h1
                class="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient pb-1"
            >
                Captains of Group-14
            </h1>
            <div
                class="h-0.5 w-32 mx-auto mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            ></div>
        </div>

        <!-- Glassmorphic Add New User Button -->
        <div class="text-center mb-8">
            <a
                href="/dashboard/users/add"
                class="group relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-500 ease-in-out bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-lg overflow-hidden hover:scale-105 shadow-lg shadow-blue-500/20"
            >
                <span
                    class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"
                ></span>
                <span class="relative flex items-center space-x-2">
                    <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    <span class="text-sm">Add New User</span>
                </span>
            </a>
        </div>

        <!-- Enhanced Filters Container -->
        <div class="max-w-3xl mx-auto mb-6 space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <!-- Modern Search Input with Animation -->
                <div class="relative group">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur transition-all duration-300 group-hover:opacity-30 group-focus-within:opacity-30"
                    ></div>
                    <div
                        class="absolute inset-0.5 bg-gray-800 rounded-xl"
                    ></div>
                    <div class="relative flex items-center">
                        <svg
                            class="absolute left-3 w-4 h-4 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-400"
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
                        <input
                            type="text"
                            bind:value={searchQuery}
                            class="w-full pl-10 pr-4 py-2 bg-transparent text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm"
                            placeholder="Search users..."
                        />
                    </div>
                </div>

                <!-- Enhanced Batch Select -->
                <div class="relative group">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur transition-all duration-300 group-hover:opacity-30 group-focus-within:opacity-30"
                    ></div>
                    <div
                        class="absolute inset-0.5 bg-gray-800 rounded-xl"
                    ></div>
                    <select
                        bind:value={selectedBatch}
                        class="relative w-full px-4 py-2 bg-transparent text-white rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm cursor-pointer"
                    >
                        <option value="" class="text-gray-800"
                            >All Batches</option
                        >
                        {#each batches as batch}
                            <option value={batch} class="text-gray-800"
                                >Batch {batch}</option
                            >
                        {/each}
                    </select>
                    <svg
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors duration-300 group-hover:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            <!-- Modern Admin Filter Toggle -->
            <div class="flex justify-center">
                <label
                    class="relative inline-flex items-center cursor-pointer group"
                >
                    <input
                        type="checkbox"
                        bind:checked={showAdminsOnly}
                        class="sr-only peer"
                    />
                    <div
                        class="w-12 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-500/25 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                    <span
                        class="ml-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors"
                        >Show Admins Only</span
                    >
                </label>
            </div>
        </div>

        {#if isLoading}
            <div class="flex justify-center items-center py-10">
                <div class="relative w-12 h-12">
                    <div
                        class="absolute inset-0 rounded-full border-3 border-blue-500/20"
                    ></div>
                    <div
                        class="absolute inset-0 rounded-full border-3 border-blue-500 border-t-transparent animate-spin-slow"
                    ></div>
                </div>
            </div>
        {:else}
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto"
            >
                {#each filteredUsers as user}
                    <div class="group relative">
                        <!-- Gradient Border Effect -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur transition-all duration-300 group-hover:opacity-50"
                        ></div>

                        <!-- Card Content -->
                        <div
                            class="relative bg-gray-800/90 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 transition-all duration-300 group-hover:border-blue-500/50"
                        >
                            <!-- Admin Badge -->
                            {#if user.isAdmin}
                                <div
                                    class="absolute top-3 right-3 px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center space-x-1"
                                >
                                    <span class="text-yellow-300 text-xs"
                                        >★</span
                                    >
                                    <span
                                        class="text-xs font-semibold text-blue-100"
                                        >Admin</span
                                    >
                                </div>
                            {/if}

                            <div class="flex flex-col items-center">
                                <!-- Enhanced Avatar -->
                                <div
                                    class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 mb-3 transform transition-all duration-300 group-hover:scale-110"
                                >
                                    <div
                                        class="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-lg font-bold text-white"
                                    >
                                        {user.fullName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                </div>

                                <h4 class="text-lg font-bold text-white mb-2">
                                    {user.fullName}
                                </h4>

                                <div class="space-y-2 w-full mb-4">
                                    <div
                                        class="flex justify-between items-center py-1 border-b border-gray-700/50"
                                    >
                                        <span class="text-gray-400 text-sm"
                                            >Roll</span
                                        >
                                        <span class="text-gray-200 text-sm"
                                            >{user.roll}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between items-center py-1 border-b border-gray-700/50"
                                    >
                                        <span class="text-gray-400 text-sm"
                                            >Batch</span
                                        >
                                        <span class="text-gray-200 text-sm"
                                            >{user.batch}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between items-center py-1 border-b border-gray-700/50"
                                    >
                                        <span class="text-gray-400 text-sm"
                                            >Phone Number</span
                                        >
                                        <span class="text-gray-200 text-sm"
                                            ><a
                                                href={`tel:${user.phone}`}
                                                target="_blank"
                                                class="text-blue-400 hover:underline"
                                                >{user.phone.startsWith("+88")
                                                    ? user.phone
                                                    : "+88" + user.phone}</a
                                            ></span
                                        >
                                    </div>
                                    <div class="py-1">
                                        <span
                                            class="text-gray-400 block mb-1 text-sm"
                                            >Email</span
                                        >
                                        <a
                                            href="mailto:{user.email}"
                                            class="text-blue-400 hover:text-blue-300 break-all transition-colors text-sm"
                                        >
                                            {user.email}
                                        </a>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="space-y-2 w-full">
                                    <a
                                        href={`/dashboard/users/${user.ID}`}
                                        class="block w-full py-2 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg shadow-blue-500/20 text-sm"
                                    >
                                        View Details
                                    </a>
                                    <a
                                        href={user.fbLink}
                                        target="_blank"
                                        class="block w-full py-2 text-center text-gray-300 bg-gray-700/50 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-white transform hover:scale-105 text-sm"
                                    >
                                        Facebook Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 6s ease infinite;
    }

    .animate-spin-slow {
        animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
