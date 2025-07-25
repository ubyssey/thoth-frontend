import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
  		allowedHosts: ['localhost', 'thoth_frontend'],
		proxy: {
            '/api': 'http://api.thoth.ubyssey.ca',
        },
	}
});