import type { Cookies } from '@sveltejs/kit';

export type FlashMessage = {
	type: 'success' | 'error';
	message: string;
};

export function setFlash(cookies: Cookies, flash: FlashMessage) {
	cookies.set('flash', JSON.stringify(flash), {
		path: '/',
		maxAge: 10,
		httpOnly: true,
		sameSite: 'lax'
	});
}
