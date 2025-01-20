export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22')
];

export const server_loads = [];

export const dictionary = {
		"/": [5],
		"/contact": [6],
		"/dashboard": [7,[2]],
		"/dashboard/account": [8,[2]],
		"/dashboard/account/edit": [9,[2]],
		"/dashboard/messages": [10,[2]],
		"/dashboard/messages/[slug]": [11,[2]],
		"/dashboard/notices": [12,[2]],
		"/dashboard/notices/add": [13,[2]],
		"/dashboard/notices/edit": [14,[2]],
		"/dashboard/notices/edit/[slug]": [15,[2]],
		"/dashboard/notices/[slug]": [16,[2]],
		"/dashboard/users": [17,[2]],
		"/dashboard/users/add": [18,[2]],
		"/dashboard/users/edit": [19,[2,3]],
		"/dashboard/users/[slug]": [20,[2]],
		"/login": [21,[],[4]],
		"/logout": [22]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';