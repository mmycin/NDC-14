import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: process.env.HOST || 'localhost', // Default to 'localhost' if undefined
		port: Number(process.env.PORT) || 3000, // Convert PORT to a number and default to 3000 if undefined
	},
});
