<script>
    // @ts-nocheck
    import { getID, IsTokenExpired, IsValidToken } from "$lib/Utils/Token";
    import { DeleteItem } from "$lib/Utils/Delete";
    import Notification from "$lib/Utils/Notify";
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import axios from "axios";
    import { onMount } from "svelte";

    export let data;

    let info = {};
    let accountInfo = {};
    let isLoading = true;

    async function deleteAccount() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/users/delete/${info.ID}`;
            DeleteItem(url, "/dashboard/users", window.location.href);
        } catch (error) {
            Notification("Error deleting message", "error");
            console.error(error);
        }
    }

    onMount(async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (token && IsValidToken(token) && !IsTokenExpired(token)) {
                const ID = getID(token);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/id/${ID}`
                );
                accountInfo = await response.data.data;
            }
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/id/${data.slug}`
            );
            info = response.data.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            isLoading = false;
        }
    });

    const goBack = () => window.history.back();
    const handleEdit = () =>
        goto("/dashboard/users/edit", { state: { id: info.ID } });
</script>

<div
    class="min-h-screen bg-gradient-to-br  py-8 px-4 sm:px-6 lg:px-8"
>
    <div
        class="max-w-4xl mx-auto space-y-8"
        in:fade={{ duration: 300, delay: 150 }}
    >
        <!-- Header Card -->
        <div
            class="relative overflow-hidden bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/30"
        >
            <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
            ></div>
            <div class="relative">
                <h1
                    class="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center"
                >
                    User Profile
                </h1>
                <p class="text-gray-400 text-center mt-4 text-sm sm:text-base">
                    Complete profile details for the user
                </p>
            </div>
        </div>

        {#if isLoading}
            <!-- Enhanced Loading Skeleton -->
            <div
                class="bg-gray-800/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/30 space-y-6"
            >
                <div class="flex justify-center">
                    <div
                        class="w-36 h-36 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse"
                    ></div>
                </div>
                {#each Array(6) as _}
                    <div class="space-y-3">
                        <div
                            class="h-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full w-1/4 animate-pulse"
                        ></div>
                        <div
                            class="h-8 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg w-3/4 animate-pulse"
                        ></div>
                    </div>
                {/each}
            </div>
        {:else}
            <!-- User Information Card -->
            <div
                class="relative bg-gray-800/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/30 space-y-8"
                in:fly={{ y: 20, duration: 300, delay: 300 }}
            >
                <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"
                ></div>

                <!-- Admin Badge -->
                {#if info.isAdmin}
                    <div class="mb-4 flex justify-center">
                        <span
                            class="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-gray-900 text-sm font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <span class="mr-2">★</span> Administrator
                        </span>
                    </div>
                {/if}

                <!-- User Avatar -->
                <div class="flex justify-center mb-8">
                    <div class="relative group">
                        <div
                            class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300"
                        ></div>
                        <div
                            class="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            {info.fullName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                    </div>
                </div>

                <!-- Information Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {#each [{ label: "Name", value: info.fullName, icon: "👤" }, { label: "Username", value: info.username, icon: "🔖" }, { label: "Email Address", value: info.email, isEmail: true, icon: "📧" }, { label: "Roll Number", value: info.roll, icon: "🔢" }, { label: "Batch", value: info.batch, icon: "👥" }, { label: "Phone Number", value: info.phone.startsWith("+88") ? info.phone : "+88" + info.phone, icon: "📱" }, { label: "Facebook Profile", value: info.fbLink, isLink: true, icon: "💬" }] as field}
                        <div class="group relative">
                            <div
                                class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-300"
                            ></div>
                            <div
                                class="relative p-6 bg-gray-900/90 rounded-xl hover:bg-gray-900/70 transition-all duration-300 backdrop-blur-xl border border-gray-700/50"
                            >
                                <div
                                    class="flex items-center gap-3 text-sm font-medium text-gray-400 mb-3"
                                >
                                    <span class="text-xl">{field.icon}</span>
                                    {field.label}
                                </div>
                                {#if field.isEmail}
                                    <a
                                        href="mailto:{field.value}"
                                        class="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200 break-all hover:underline"
                                    >
                                        {field.value}
                                    </a>
                                {:else if field.isLink}
                                    <a
                                        href={field.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200 break-all hover:underline"
                                    >
                                        {field.value}
                                    </a>
                                {:else}
                                    <div
                                        class="text-lg text-white group-hover:text-blue-100 transition-colors duration-300"
                                    >
                                        {field.value}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap justify-center gap-4">
                {#if accountInfo.isAdmin && !info.isAdmin}
                    <button
                        on:click={handleEdit}
                        class="relative px-8 py-3 rounded-xl overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                        <span
                            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                        ></span>
                        Edit
                    </button>
                    <button
                        on:click={deleteAccount}
                        class="relative px-8 py-3 rounded-xl overflow-hidden group bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                        <span
                            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                        ></span>
                        Delete
                    </button>
                {/if}

                <div class="flex flex-wrap justify-center gap-4">
                    <button
                        on:click={goBack}
                        class="relative px-8 py-3 rounded-xl overflow-hidden group bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                        <span
                            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                        ></span>
                        Go Back
                    </button>
                    </div>
                    {#if accountInfo.ID === info.ID}
                        <button
                            on:click={() => goto("/dashboard/account/edit")}
                            class="relative px-8 py-3 rounded-xl overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
                        >
                            <span
                                class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                            ></span>
                            Edit
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        background-color: rgb(3, 7, 18);
    }
</style>
