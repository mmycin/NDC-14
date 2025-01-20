<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Notification from '$lib/Utils/Notify';
    import { goto } from '$app/navigation';

    let fullName = '';
    let username = '';
    let email = '';
    let roll = '';
    let batch = '';
    let fbLink = '';
    let password = '';
    let phone = '';
    let confirmPassword = '';
    
    // Validation states
    let passwordMatch = true;
    let rollValid = true;
    let batchValid = true;
    let fbLinkValid = true;
    let validationErrors = {
        roll: '',
        batch: '',
        fbLink: ''
    };

    // Real-time validation for password
    $: passwordMatch = password === confirmPassword;

    // Enhanced roll number validation: 1(2 or 3)(0-9)14(000-150)
    $: {
        const rollPattern = /^1[23][0-9]14([0-9]{3})$/;
        rollValid = rollPattern.test(roll);
        if (roll) {
            if (!rollPattern.test(roll)) {
                validationErrors.roll = 'Invalid roll number format. Should be like 12014xxx or 13914xxx';
            } else {
                const lastThreeDigits = parseInt(roll.slice(-3));
                if (lastThreeDigits > 150) {
                    rollValid = false;
                    validationErrors.roll = 'Last three digits should be between 000 and 150';
                } else {
                    validationErrors.roll = '';
                }
            }
        } else {
            validationErrors.roll = '';
        }
    }

    // Enhanced batch validation: 2023-2040
    $: {
        const batchNum = parseInt(batch);
        batchValid = batchNum >= 2023 && batchNum <= 2040;
        validationErrors.batch = batch ? (batchValid ? '' : 'Batch must be between 2023 and 2040') : '';
    }

    // Facebook link validation
    $: {
        const fbPattern = /^https:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/;
        fbLinkValid = fbPattern.test(fbLink);
        validationErrors.fbLink = fbLink ? (fbLinkValid ? '' : 'Must be a valid Facebook profile URL (https://facebook.com/...)') : '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordMatch && rollValid && batchValid && fbLinkValid) {
            const userData = {
                fullName,
                username,
                email,
                roll,
                batch: parseInt(batch),
                fbLink,
                isAdmin: false,
                phone,
                password
            };

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, userData);
                Notification('User added successfully', "success");
                // Reset form
                fullName = '';
                username = '';
                email = '';
                roll = '';
                batch = '';
                fbLink = '';
                phone = '';
                password = '';
                confirmPassword = '';
                goto('/dashboard/users');
            } catch (error) {
                Notification('Error adding user', "error");
                console.error(error);
            }
        } else {
            Notification('Please correct the validation errors', "error");
        }
    };
</script>

<div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">Add a New Captain</h1>

    <form on:submit={handleSubmit} class="bg-slate-800 p-8 rounded-3xl shadow-xl max-w-4xl mx-auto transform transition duration-300 hover:scale-105">
        <!-- Full Name -->
        <div class="mb-6">
            <label for="fullName" class="block text-white text-lg font-medium mb-2">Full Name</label>
            <input id="fullName" type="text" bind:value={fullName} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Full Name" required>
        </div>

        <!-- Username -->
        <div class="mb-6">
            <label for="username" class="block text-white text-lg font-medium mb-2">Username</label>
            <input id="username" type="text" bind:value={username} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Username" required>
        </div>

        <!-- Email -->
        <div class="mb-6">
            <label for="email" class="block text-white text-lg font-medium mb-2">Email</label>
            <input id="email" type="email" bind:value={email} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Email" required>
        </div>

        <!-- Roll Number -->
        <div class="mb-6">
            <label for="roll" class="block text-white text-lg font-medium mb-2">Roll Number</label>
            <input id="roll" type="text" bind:value={roll} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent {!rollValid && roll ? 'border-2 border-red-500' : ''}"
                placeholder="Enter Roll Number (e.g., 12014xxx)" required>
            {#if validationErrors.roll}
                <p class="text-red-500 text-sm mt-2">{validationErrors.roll}</p>
            {/if}
        </div>

        <!-- Phone Number -->
        <div class="mb-6">
            <label for="roll" class="block text-white text-lg font-medium mb-2">Phone Number</label>
            <input id="roll" type="text" bind:value={phone} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent {!rollValid && roll ? 'border-2 border-red-500' : ''}"
                placeholder="Enter Phone Number (e.g., +8801xxxxxxxxx)" required>
            {#if validationErrors.roll}
                <p class="text-red-500 text-sm mt-2">{validationErrors.roll}</p>
            {/if}
        </div>

        <!-- Batch -->
        <div class="mb-6">
            <label for="batch" class="block text-white text-lg font-medium mb-2">Batch</label>
            <input id="batch" type="number" min="2025" max="2040" bind:value={batch} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent {!batchValid && batch ? 'border-2 border-red-500' : ''}"
                placeholder="Enter Batch eg. 20xx" required>
            {#if validationErrors.batch}
                <p class="text-red-500 text-sm mt-2">{validationErrors.batch}</p>
            {/if}
        </div>

        <!-- Facebook Link -->
        <div class="mb-6">
            <label for="fbLink" class="block text-white text-lg font-medium mb-2">Facebook Profile Link</label>
            <input id="fbLink" type="url" bind:value={fbLink} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent {!fbLinkValid && fbLink ? 'border-2 border-red-500' : ''}"
                placeholder="https://facebook.com/profile" required>
            {#if validationErrors.fbLink}
                <p class="text-red-500 text-sm mt-2">{validationErrors.fbLink}</p>
            {/if}
        </div>

        <!-- Password -->
        <div class="mb-6">
            <label for="password" class="block text-white text-lg font-medium mb-2">Password</label>
            <input id="password" type="password" bind:value={password} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Password" required>
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
            <label for="confirmPassword" class="block text-white text-lg font-medium mb-2">Confirm Password</label>
            <input id="confirmPassword" type="password" bind:value={confirmPassword} 
                class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Password" required>
            {#if !passwordMatch}
                <p class="text-red-500 text-sm mt-2">Passwords do not match</p>
            {/if}
        </div>

        <!-- Submit Button -->
        <div class="text-center">
            <button type="submit" 
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                disabled={!passwordMatch || !rollValid || !batchValid || !fbLinkValid}>
                Submit
            </button>
        </div>
    </form>
</div>

<style>
    .container {
        max-width: 100%;
        width: 100%;
    }

    form {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
    }

    input,
    button {
        transition: all 0.3s ease-in-out;
    }

    input:focus,
    button:hover {
        transform: scale(1.05);
    }

    button:disabled {
        opacity: 0.7;
    }
</style>