<script>
    // @ts-nocheck
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import axios from "axios";
    import { getID, IsTokenExpired, IsValidToken } from "$lib/Utils/Token";
    import Notification from "$lib/Utils/Notify";
    import { goto } from "$app/navigation";

    let ID = 0;
    let data = {};
    let isLoading = true;
    let formData = { ...data };
    let password = "";
    let confirmPassword = "";
    let isChanged = false;
    let passwordMatch = true;
    let batchRollMatch = true;
    let isAdmin = false;

    async function CheckApplicable() {
        try {
            const token = localStorage.getItem("jwtToken");
            if (token && IsValidToken(token) && !IsTokenExpired(token)) {
                const ID = getID(token);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/id/${ID}`
                );
                accountInfo = await response.data.data;
                if (!accountInfo.isAdmin || !id) {
                    window.history.back();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    $: id = $page.state?.id;
    let accountInfo = {};
    $: CheckApplicable();

    onMount(async () => {
        if (window.location.href.includes("/users/edit")) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "auto";
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/id/${id}`
            );
            data = await response.data.data;
            formData = { ...data };
            isAdmin = formData.isAdmin || false;
            isLoading = false;
        } catch (error) {
            console.error(error);
            isLoading = false;
        }
    });

    function handleInputChange(event) {
        if (event?.target?.id === 'isAdmin') {
            event.preventDefault();
            formData.isAdmin = event.target.checked;
            isAdmin = event.target.checked;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        isChanged = JSON.stringify(formData) !== JSON.stringify(data) || 
                    password !== "" || 
                    confirmPassword !== "";
        
        if (formData.batch && formData.roll) {
            validateBatchRoll();
        }
    }

    function handlePasswordChange() {
        passwordMatch = password === confirmPassword;
    }

    function validateBatchRoll() {
        if (!formData?.batch || !formData?.roll) {
            batchRollMatch = true;
            return;
        }

        const batchStr = String(formData.batch);
        const rollStr = String(formData.roll);

        if (batchStr.length >= 2 && rollStr.length >= 3) {
            const batchLastTwo = batchStr.slice(-2);
            const rollMiddleTwo = rollStr.slice(1, 3);
            batchRollMatch = batchLastTwo === rollMiddleTwo;
        } else {
            batchRollMatch = false;
        }
    }

    async function saveProfile() {
        try {
            if (passwordMatch && batchRollMatch) {
                isAdmin = formData.isAdmin;
                const updatedData = {
                    ...formData,
                    password,
                    batch: Number(formData.batch),
                    isAdmin: isAdmin,
                };
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/users/update/${data.ID}`,
                    updatedData
                );
                Notification("Profile updated successfully", "success");
                goBack();
                isChanged = false;
            }
        } catch (error) {
            console.error(error);
            Notification("Error updating profile", "error");
        }
    }

    function discardChanges() {
        formData = { ...data };
        password = "";
        confirmPassword = "";
        isChanged = false;
        passwordMatch = true;
        batchRollMatch = true;
        isAdmin = data.isAdmin || false;
        goBack();
    }

    function resetFields() {
        formData = { ...data };
        password = "";
        confirmPassword = "";
        passwordMatch = true;
        batchRollMatch = true;
        isAdmin = data.isAdmin || false;
    }

    function goBack() {
        window.history.back();
    }
</script>

<div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <div class="bg-gray-800 rounded-t-2xl p-6 shadow-xl text-center">
            <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-2">
                Edit Information
            </h1>
            <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Update account of ID: {data.ID}
            </p>
        </div>

        {#if isLoading}
            <div class="bg-gray-800 p-8 rounded-b-2xl shadow-xl">
                <div class="animate-pulse space-y-4">
                    {#each Array(6) as _}
                        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
                    {/each}
                </div>
            </div>
        {:else}
            <form class="bg-gray-800 p-6 rounded-b-2xl shadow-xl space-y-6" on:submit|preventDefault={saveProfile}>
                <!-- Full Name -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="fullName" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Name</label>
                    <input
                        id="fullName"
                        type="text"
                        bind:value={formData.fullName}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Username -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="username" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Username</label>
                    <input
                        id="username"
                        type="text"
                        bind:value={formData.username}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Email -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="email" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Email</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={formData.email}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Roll Number -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="roll" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Roll Number</label>
                    <input
                        id="roll"
                        type="text"
                        bind:value={formData.roll}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Phone Number -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="roll" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Phone Number</label>
                    <input
                        id="roll"
                        type="text"
                        bind:value={formData.phone}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Batch -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="batch" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Batch</label>
                    <input
                        id="batch"
                        type="text"
                        bind:value={formData.batch}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                    {#if !batchRollMatch}
                        <p class="text-red-500 text-sm mt-1">Invalid Roll or Batch</p>
                    {/if}
                </div>

                <!-- Facebook Profile -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="facebookProfile" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Facebook Profile</label>
                    <input
                        id="facebookProfile"
                        type="url"
                        bind:value={formData.fbLink}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                    />
                </div>

                <!-- Password -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="password" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">New Password</label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter New Password"
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                        on:blur={handlePasswordChange}
                    />
                </div>

                <!-- Confirm Password -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="confirmPassword" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        bind:value={confirmPassword}
                        class="bg-gray-700 text-white rounded p-2 w-full sm:w-2/3"
                        on:input={handleInputChange}
                        on:blur={handlePasswordChange}
                    />
                    {#if !passwordMatch}
                        <p class="text-red-500 text-sm mt-1">Passwords do not match</p>
                    {/if}
                </div>

                <!-- Admin Checkbox -->
                <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-700">
                    <label for="isAdmin" class="text-gray-400 w-full sm:w-1/3 mb-2 sm:mb-0">Administrator Access</label>
                    <div class="w-full sm:w-2/3 flex items-center">
                        <label class="inline-flex items-center cursor-pointer">
                            <input
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                on:change={handleInputChange}
                                class="sr-only peer"
                            />
                            <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            <span class="ms-3 text-sm font-medium text-gray-300">
                                {isAdmin ? "Enabled" : "Disabled"}
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col justify-center sm:flex-row sm:gap-4 mt-8 sm:mt-6 gap-4">
                    <button
                        type="submit"
                        class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        disabled={!isChanged || !passwordMatch || !batchRollMatch}
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        class="bg-red-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        on:click={discardChanges}
                    >
                        Discard Changes
                    </button>

                    <button
                        type="button"
                        class="bg-gray-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        on:click={resetFields}
                    >
                        Reset Fields
                    </button>
                </div>
            </form>
        {/if}
    </div>
</div>

