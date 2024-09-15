/**
 * This is a sample client-side cookie management hook.
 * It does not provide HTTP-only or enhanced security features.
 * It is not recommended for handling sensitive information or session manangement.
 * Use only if you're not storing personal or confidential data.
 */

type SetCookieOptions = {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "Lax" | "Strict" | "None";
};

export function useCookie() {
  const calculateExpires = (days?: number): string => {
    if (!days) return "";

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    return `; expires=${date.toUTCString()}`;
  };

  const setCookie = (
    name: string,
    value: string | string[],
    options: SetCookieOptions = {}
  ) => {
    const { days, path = "/", secure = false, sameSite = "Lax" } = options;
    const expires = calculateExpires(days);

    const cookieValue = encodeURIComponent(JSON.stringify(value));
    let cookie = `${name}=${cookieValue}${expires}; path=${path}; SameSite=${sameSite}`;

    if (secure) {
      cookie += "; Secure";
    }

    document.cookie = cookie;
  };

  const getCookie = (name: string): string | string[] | null => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch (e) {
        console.warn("Cookie error:", e);
        return null;
      }
    }
    return null;
  };

  return { setCookie, getCookie };
}
