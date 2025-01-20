<script>
    // @ts-nocheck
    import { goto } from '$app/navigation';


    import { DeleteItem } from '$lib/Utils/Delete';
    import Notification from '$lib/Utils/Notify';
    import { redirect } from '@sveltejs/kit';
    import axios from 'axios';
    import { onMount } from 'svelte';
    export let data;
    let message = {};

    // Go Back function
    function goBack() {
        window.history.back();
    }

    // Function to handle replying via email
    function replyToEmail() {
        // @ts-ignore
        if (message.email && message.email.includes('@')) {
            // @ts-ignore
            navigator.clipboard.writeText(message.email).then(() => {
                Notification('Email ID copied to clipboard', "success");
                window.location.href = `https://mail.google.com/mail/u/0/#inbox`;
            });
        } else {
            Notification('Invalid or missing email address', "error");
        }
    }

    // Function to handle deletion
    async function deleteMessage() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/contacts/${data.slug}`;
            DeleteItem(url, "/dashboard/messages", window.location.href)
        } catch (error) {
            Notification('Error deleting message', "error");
            console.error(error);
        }
    }

    try {
        onMount(async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts/${data.slug}`);
            const res = await response.data.data;
            message = res;
        });
    } catch (e) {
        Notification('Error fetching message', "error");
    }
</script>

<div class="p-6 max-w-2xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-400">
        Message Details
    </h1>
    {#if message.name}
        <div class="space-y-6">
            <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h2 class="text-lg font-semibold text-indigo-300">Name:</h2>
                <p class="text-gray-300">{message.name}</p>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h2 class="text-lg font-semibold text-indigo-300">Roll:</h2>
                <p class="text-gray-300">{message.roll}</p>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <h2 class="text-lg font-semibold text-indigo-300">Email:</h2>
                <p class="text-gray-300">{message.email}</p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h2 class="text-lg font-semibold text-indigo-300 mb-4">Message:</h2>
                <p class="text-gray-300 leading-relaxed text-lg sm:text-xl whitespace-pre-wrap">
                    {message.message}
                </p>
            </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
            <!-- Reply Button -->
            <button
                on:click={replyToEmail}
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Reply
            </button>
            <!-- Delete Button -->
            <button
                on:click={deleteMessage}
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Delete
            </button>
        </div>
        <!-- Go Back Button -->
        <div class="mt-8 flex justify-center">
            <button
                on:click={goBack}
                class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
            >
                Go Back
            </button>
        </div>
    {:else}
        <p class="text-center text-gray-400">Loading message details...</p>
    {/if}
</div>

<style>
    :global(body) {
        background-color: rgb(17, 24, 39);
        color: rgb(229, 231, 235);
        font-family: 'Inter', sans-serif;
    }

    .max-w-2xl {
        max-width: 42rem;
    }

    .whitespace-pre-wrap {
        white-space: pre-wrap;
    }
</style>
