import Cookies from 'js-cookie';

export function getCookie(name: string) {
    return Cookies.get(name) || '';
}

export function setCookie(name: string, value: string) {
    Cookies.set(name, value);
}
