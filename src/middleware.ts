import { NextRequest, NextResponse } from "next/server";
import { getLanguage } from "./app/actions/languageAction";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  /**
   * The getLanguage() function defined with the 'use server' directive
   * and other Cookies() functions can be used directly
   * in the middleware.
   */
  const lang = await getLanguage();
  /**
   * If there is no language prefix in the URL
   * and a language is returned from the cookie by the getLanguage function,
   * the middleware will add a language prefix to the URL.
   * Checking if there is already a language prefix
   * in the URL beforehand is a better approach.
   */

  // //////////////////////////////////////////////////////
  // if (lang && !url.pathname.startsWith(`/${lang}`)) {
  //   url.pathname = `/${lang}${url.pathname}`;
  //   return NextResponse.redirect(url);
  // }
  // /* I have commented out the URL redirection because there is no [lang] redirection currently.
  // *  If you want to test whether the middleware catches the cookie and performs the redirection,
  // * you can remove this comment.
  // //////////////////////////////////////////////////////

  /**
   * If there is no cookie, setting the default language preference
   * or detecting the language through Accept-Language.
   */

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
