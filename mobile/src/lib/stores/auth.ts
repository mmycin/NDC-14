// $lib/stores/auth.ts
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

// Update the authentication state
export const setAuthState = (state: boolean) => {
    isAuthenticated.set(state);
};
