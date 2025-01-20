<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import axios from "axios";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";
    import { IsTokenExpired, IsValidToken } from "$lib/Utils/Token";

    let currentPath;
    $: currentPath = $page.url.pathname;

    let isMenuOpen = false;
    let isAuthenticated = false;
    let isScrolled = false;

    // Handle scroll effects
    const handleScroll = () => {
        isScrolled = window.scrollY > 20;
    };

    const updateAuthState = () => {
        const token = localStorage.getItem("jwtToken");
        isAuthenticated =
            !!token && IsValidToken(token) && !IsTokenExpired(token);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("jwtToken");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/logout`
            );
            if (response.status === 200) {
                isAuthenticated = false;
                goto("/login");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    onMount(() => {
        updateAuthState();
        window.addEventListener("storage", updateAuthState);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("storage", updateAuthState);
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const navigateTo = (path) => {
        goto(path);
        isMenuOpen = false;
    };
</script>

<nav
    class={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
    }`}
>
    <div class="container mx-auto px-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
            <!-- Logo Section -->
            <a href="/" class="flex items-center space-x-3 group">
                <img
                    src="/ndc.png"
                    alt="NDC Logo"
                    class="h-8 w-8 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110"
                />
            </a>

            <!-- Title Section -->
            <div class="absolute inset-0 flex justify-center items-center">
                <a href="/" class="group pointer-events-auto">
                    <h1
                        class="text-base md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500 whitespace-nowrap"
                        style="font-family: 'Dancing Script', cursive;"
                    >
                        Notre Dame College, Dhaka
                    </h1>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-8">
                {#each [{ path: "/contact", label: "Contact" }, ...(isAuthenticated ? [{ path: "/dashboard", label: "Dashboard" }] : [])] as { path, label }}
                    <a href={path} class="relative group">
                        <span
                            class={`text-lg font-medium transition-colors duration-200 ${
                                currentPath === path
                                    ? "text-blue-400"
                                    : "text-gray-300 group-hover:text-blue-400"
                            }`}
                        >
                            {label}
                        </span>
                        <span
                            class={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform origin-left transition-transform duration-300 ${
                                currentPath === path
                                    ? "scale-x-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                            }`}></span
                        >
                    </a>
                {/each}

                <button
                    on:click={() =>
                        isAuthenticated ? handleLogout() : navigateTo("/login")}
                    class="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                           hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    {isAuthenticated ? "Logout" : "Login"}
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button
                class="lg:hidden p-2 rounded-lg text-gray-300 hover:text-blue-400 focus:outline-none z-60"
                on:click={() => (isMenuOpen = !isMenuOpen)}
                style="position: relative; z-index: 60;"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 transition-transform duration-300"
                    class:rotate-180={isMenuOpen}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                >
                    {#if isMenuOpen}
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    {:else}
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    {/if}
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
        <div
            transition:slide={{ duration: 300 }}
            class="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
        >
            <!-- Add Title Text for Mobile -->
            <div class="px-4 py-2 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 transition-opacity duration-300"
                class:opacity-100={isMenuOpen}
                style="font-family: 'Dancing Script', cursive;"
            >
                Notre Dame College, Dhaka
            </div>
            
            <div class="px-4 pt-2 pb-4 space-y-3">
                {#each [{ path: "/contact", label: "Contact" }, ...(isAuthenticated ? [{ path: "/dashboard", label: "Dashboard" }] : [])] as { path, label }}
                    <a
                        href={path}
                        class={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                            currentPath === path
                                ? "bg-blue-500/10 text-blue-400"
                                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
                        }`}
                        on:click={() => navigateTo(path)}
                    >
                        {label}
                    </a>
                {/each}

                <button
                    on:click={() =>
                        isAuthenticated ? handleLogout() : navigateTo("/login")}
                    class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                           transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
                >
                    {isAuthenticated ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    {/if}
</nav>

<!-- Spacer to prevent content from hiding under fixed navbar -->
<div class="h-16 md:h-20"></div>

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Cal+Sans:wght@400;600&display=swap");

    nav {
        transform-style: preserve-3d;
    }

    :global(body) {
        overflow-x: hidden;
    }

    /* Custom scroll behavior for the mobile menu */
    .mobile-menu {
        scrollbar-width: thin;
        scrollbar-color: theme("colors.gray.600") theme("colors.gray.800");
    }

    .mobile-menu::-webkit-scrollbar {
        width: 8px;
    }

    .mobile-menu::-webkit-scrollbar-track {
        background: theme("colors.gray.800");
    }

    .mobile-menu::-webkit-scrollbar-thumb {
        background-color: theme("colors.gray.600");
        border-radius: 20px;
    }
</style>
