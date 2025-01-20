import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const notices: Writable<any[]> = writable([]);
export const loading: Writable<boolean> = writable(true);
export const totalPages: Writable<number> = writable(1);
export const currentPage: Writable<number> = writable(1);
export const adminsStore: Writable<any[]> = writable([]);
export const isAuthenticated: Writable<boolean> = writable(false);
