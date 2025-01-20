<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Typed from "typed.js";
    
    let typedInstance;
    
    onMount(() => {
        const options = {
            strings: [
                `This website is brought to you by <a class="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 underline decoration-dotted" href="https://www.facebook.com/TahcinKarimMycin/" target="_blank" rel="noopener noreferrer">Tahcin Ul Karim (Mycin)</a>, Roll - 12514013, a proud member of Notre Dame College, Dhaka.`,
                `If you've made it here, it means you are now a Captain of Science Group-14—an achievement worth celebrating! 🎉`,
                `Let's go through some important guidelines for you:`,
                `<span class="text-amber-400 font-semibold">📱 The Users Tab:</span> Connect with past Captains, share experiences, and build lasting connections.`,
                `<span class="text-emerald-400 font-semibold">👥 Adding New Captains:</span> Help maintain our legacy by adding verified Group-14 Captains.`,
                `Remember: You're not just a captain—you're a guardian of Group-14's legacy. Lead with pride and honor! ✨`
            ],
            typeSpeed: 25,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 700,
            showCursor: true,
            cursorChar: '▋',
            loop: false,
            autoInsertCss: true,
        };

        typedInstance = new Typed("#typed-text", options);

        return () => {
            if (typedInstance) {
                typedInstance.destroy();
            }
        };
    });
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
        <div class="space-y-8">
            <!-- Header Section -->
            <div class="text-center animate-fade-in">
                <h1 class="text-4xl sm:text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-2 font-display">
                    Welcome to Group-14
                </h1>
                <p class="text-gray-400 text-lg sm:text-xl md:text-2xl font-light">
                    Your Journey Begins Here
                </p>
            </div>

            <!-- Main Content -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-gray-700/50">
                <div id="typed-text" class="text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed font-light space-y-4"></div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Cal+Sans:wght@400;600&display=swap');

    :global(body) {
        font-family: 'Outfit', sans-serif;
    }

    .font-display {
        font-family: 'Cal Sans', sans-serif;
    }

    /* Custom Animations */
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
    }

    /* Typed.js cursor customization */
    :global(.typed-cursor) {
        font-size: 1.2em;
        opacity: 1;
        animation: typedjsBlink 0.7s infinite;
        color: theme('colors.indigo.400');
    }

    @keyframes typedjsBlink {
        50% { opacity: 0; }
    }
</style>