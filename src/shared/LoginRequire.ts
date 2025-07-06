import Cookies from 'js-cookie';

export function requireAuth(request: Request): Response | null {
    // return null;
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    if (!token) {
        const url = new URL(request.url);
        return Response.redirect(`/auth/login`, 302);
    }

    if (request.url.endsWith("/pages") || request.url.endsWith("/pages/")) {
        const url = new URL(request.url);
        switch (role) {
            case "admin":
                return Response.redirect("/pages/admin", 302);
            case "user":
                return Response.redirect("/pages/users", 302);
            default:
                return Response.redirect(`/auth/login`, 302);
        }
    }

    return null;
}

function parseTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [key, ...v] = c.trim().split('=');
            return [key, v.join('=')];
        })
    );
    return cookies["token"] || null;
}