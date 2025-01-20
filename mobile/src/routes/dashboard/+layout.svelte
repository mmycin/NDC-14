

<script>
    import { goto } from "$app/navigation";
    import { IsTokenExpired, IsValidToken } from "$lib/Utils/Token";
    import { onMount } from "svelte";

    let darkMode = false;
    let isAuthenticated = false; // To control rendering

    if (typeof window !== "undefined") {
        darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    const navItems = [
        { href: "/dashboard", label: "Dashboard", path: "M3 10h18M3 6h18M3 14h18M3 18h18" },
        { href: "/dashboard/users", label: "Users", path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        { href: "/dashboard/notices", label: "Notice", path: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
        { href: "/dashboard/messages", label: "Messages", path: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
        { href: "/dashboard/account", label: "Account", path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    ];

    onMount(async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                goto("/login");
            } else {
                if (IsValidToken(token)) {
                    if (IsTokenExpired(token)) {
                        localStorage.removeItem("jwtToken");
                        goto("/login");
                    }
                    isAuthenticated = true; // Allow rendering once validated
                } else {
                    goto("/login");
                }
            }
        } catch (error) {
            console.error(error);
            goto("/login");
        }
    });
</script>

{#if isAuthenticated}
    <div class="flex h-screen w-full dark:bg-gray-900 " id="main">
        <!-- Sidebar for desktop -->
        <aside class="hidden md:block fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 shadow-lg border-r border-gray-700">
            <nav class="h-full pt-20 pb-16 px-4">
                <ul class="space-y-2">
                    {#each navItems as item}
                        <li>
                            <a href={item.href} class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-800">
                                <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.path} />
                                </svg>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>

        <!-- Mobile bottom navigation -->
        <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-800">
            <ul class="flex justify-around p-2">
                {#each navItems as item}
                    <li>
                        <a href={item.href} class="flex flex-col items-center p-2 text-gray-300 hover:text-white">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.path} />
                            </svg>
                            <span class="text-xs mt-1">{item.label}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <!-- Main Content Area -->
        <main  class="flex-1 mt-0 -mx-5 md:pb-16 px-4 md:pl-72 md:-mr-20 md:pr-32 overflow-y-auto dark:bg-gray-900 border-l border-gray-700">
            <slot  />
        </main>
    </div>
{:else}
    <div class="flex items-center justify-center h-screen w-full">
        <p>Loading...</p>
    </div>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
