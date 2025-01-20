<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { getID } from "$lib/Utils/Token";
    import { onMount } from "svelte";
    import Notification from "$lib/Utils/Notify";

    let ID = 0;
    let data = {};
    let isLoading = true;
    let formData = { ...data };
    let password = '';
    let confirmPassword = '';
    let isChanged = false;
    let passwordMatch = true;
    let batchRollMatch = true;

    onMount(async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                goto("/login");
            } else {
                const userID = getID(token);
                ID = userID;

                // Fetch user data
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/id/${ID}`);
                data = response.data.data;
                formData = { ...data };
                isLoading = false;
            }
        } catch (error) {
            console.error(error);
            isLoading = false;
        }
    });

    // Real-time checking for form changes
    function handleInputChange() {
        isChanged = JSON.stringify(formData) !== JSON.stringify(data) || password !== '' || confirmPassword !== '';
        validateBatchRoll();  // Check batch and roll match on input change
    }

    // Password matching check
    function handlePasswordChange() {
        passwordMatch = password === confirmPassword;
    }

    // Batch and Roll Number Validation
    function validateBatchRoll() {
        const batchLastTwo = formData.batch.slice(-2);
        const rollMiddleTwo = formData.roll.slice(1, 3);
        batchRollMatch = batchLastTwo === rollMiddleTwo;
    }

    // Save function
    async function saveProfile() {
        try {
            if (passwordMatch && batchRollMatch) {
                // Convert the batch to a number before sending
                const updatedData = { ...formData, password, batch: Number(formData.batch) };
                // Send updated data to the backend
                await axios.put(`${import.meta.env.VITE_API_URL}/users/update/${ID}`, updatedData);
                Notification('Profile updated successfully', "success");
                goto("/dashboard/account");
                isChanged = false; // reset after saving
            }
        } catch (error) {
            console.error(error);
            Notification('Error updating profile', "error");
        }
    }

    // Discard changes and go back
    function discardChanges() {
        formData = { ...data };
        password = '';
        confirmPassword = '';
        isChanged = false;
        passwordMatch = true;
        batchRollMatch = true;
        goBack();
    }

    // Reset fields
    function resetFields() {
        formData = { ...data };
        password = '';
        confirmPassword = '';
        passwordMatch = true;
        batchRollMatch = true;
    }

    // Go back function
    function goBack() {
        window.history.back();
    }
</script>

<div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <!-- Profile Header -->
        <div class="bg-gray-800 rounded-t-2xl p-6 shadow-xl text-center">
            <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-2">
                Edit Profile
            </h1>
            <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Update your account details
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
            <!-- Profile Edit Form -->
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

                <!-- Action Buttons -->
                <div class="flex flex-col justify-center sm:flex-row sm:gap-4 mt-8 sm:mt-6 gap-4">
                    <!-- Save Button -->
                    <button
                        type="submit"
                        class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        disabled={!isChanged || !passwordMatch || !batchRollMatch}
                    >
                        Save Changes
                    </button>

                    <!-- Discard Button -->
                    <button
                        type="button"
                        class="bg-red-500 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        on:click={discardChanges}
                    >
                        Discard Changes
                    </button>

                    <!-- Reset Button -->
                    <button
                        type="button"
                        class="bg-gray-600 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out w-full sm:w-auto"
                        on:click={resetFields}
                    >
                        Reset Fields
                    </button>
                </div>
            </form>
        {/if}

    </div>
</div>
