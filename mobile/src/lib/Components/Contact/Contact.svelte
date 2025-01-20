<script>
    // @ts-nocheck

    import axios from "axios";
    // @ts-ignore
    import { onMount } from "svelte";
    // @ts-ignore
    import Notification from "$lib/Utils/Notify";
 

    let name = "";
    let email = "";
    let roll = "";
    let message = "";
    let isSubmitting = false;

    // Show toast notification
    // @ts-ignore
    

    const resetForm = () => {
        name = "";
        email = "";
        roll = "";
        message = "";
    };

    const submitForm = async () => {
        if (isSubmitting) return;

        isSubmitting = true;

        try {
            // @ts-ignore
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/contacts/`,
                {
                    name,
                    email,
                    roll,
                    message,
                }
            );

            Notification(
                "Your message is sent! We will contact you via your email shortly.",
                "success"
            );
            resetForm();
        } catch (error) {
            if (error.status === 400) {
                // @ts-ignore
                const errorMessage =
                    error.response?.data?.message ||
                    "Invalid Roll. Only for For Group-14 students.";
                Notification(errorMessage, "error");
            } else {
                const errorMessage =
                    error.response?.data?.message ||
                    "Failed to send message. Please try again";
                Notification(errorMessage, "error");
            }
        } finally {
            isSubmitting = false;
        }
    };
</script>

<section class="contact-section py-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
    <div class="max-w-2xl mx-auto px-4">
        <h2 class="section-title">Contact</h2>

        <!-- Note about group-14 -->
        <div class="note-container mb-6">
            <p class="note-text text-sm sm:text-base">
                This page is for feedback and contact with the captains of
                Group-14. Only students of Group-14 are permitted to send
                messages.
            </p>
        </div>

        <h3 class="text-3xl align-middle mb-2">Message:</h3>
        <form on:submit|preventDefault={submitForm}>
            <div class="grid grid-cols-1 gap-6">
                <input
                    type="text"
                    placeholder="Your Name"
                    class="form-input"
                    id="name"
                    bind:value={name}
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    class="form-input"
                    id="email"
                    bind:value={email}
                    required
                />
                <input
                    type="text"
                    placeholder="Your College Roll"
                    class="form-input"
                    id="roll"
                    bind:value={roll}
                    required
                />
                <textarea
                    placeholder="Your Message"
                    class="form-input"
                    rows="4"
                    bind:value={message}
                    id="message"
                    required
                ></textarea>
                <button type="submit" class="button" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </div>
        </form>
    </div>
</section>

<style>
    .contact-section {
        background-color: #121212;
        color: #f8f9fa;
        padding: 40px 20px;
        animation: fadeIn 0.8s ease-in-out;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #ffffff;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    }

    .form-input {
        padding: 1rem;
        border-radius: 0.75rem;
        background-color: #333;
        color: #ccc;
        outline: none;
        transition:
            border 0.3s ease,
            box-shadow 0.3s ease;
        border: 1px solid transparent;
        width: 100%;
        font-size: 1rem;
    }

    .form-input::placeholder {
        color: #999;
    }

    .form-input:focus {
        border: 2px solid #007bff;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    }

    .button {
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 50px;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        width: 100%;
        font-size: 1.1rem;
        margin-top: 20px;
        border: none;
    }

    .button:hover:not(:disabled) {
        background-color: #0056b3;
        transform: translateY(-1px);
    }

    .button:disabled {
        background-color: #666;
        cursor: not-allowed;
    }

    .note-container {
        margin-bottom: 30px;
    }

    .note-text {
        background-color: #f8f5e1;
        color: #333;
        padding: 12px 20px;
        border-radius: 8px;
        font-style: italic;
        font-size: 1rem;
        text-align: center;
        line-height: 1.6;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border: 2px solid #f0d383;
        transition: all 0.3s ease;
    }

    .note-text:hover {
        background-color: #f1e8c4;
        border-color: #e0c36d;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Responsive design for small screens */
    @media (max-width: 640px) {
        .note-text {
            font-size: 0.9rem;
            padding: 10px;
        }
    }
</style>
