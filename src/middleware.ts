
import { NextRequest, NextResponse } from 'next/server'

import { i18n } from '../i18n-config'
import { AuthSession } from './services/AuthSession.service';
import { getLang } from './utils/langCookie'
import { Url } from './utils/Url'

// all he sub paths of the protected paths will be protected

export const protectedPaths = ["/profile","/dashboard"];

export const NotAuthenticatedPath = ["/auth","/auth/login","/auth/signup" , "/auth/forgot-password"];

export default async function middleware(req:NextRequest) {
    const { pathname } = req.nextUrl
    const segments = pathname.split('/').filter(Boolean)
    const lang =await getLang();

    // we have written getLang such that it will return the default language if the cookie is not set
    // so we can safely assume that lang.data will always be a valid language
  
    if (segments.length === 0 || !i18n.locales.includes(segments[0])) {
      // Redirect to default locale if it's not in the locales array
    //   `/${i18n.defaultLocale}${pathname}`
    console.log("Redirecting to locale :",lang)
    // add search params to the url

      const newURL = await Url.extendURL(lang.data!, pathname, req.nextUrl.search);

      console.log("newURL", newURL);

      return NextResponse.redirect(newURL)
    }


    // remove the lang parameter from the pathname for protected route check
    // since first segment is always the language so just remove it
    const pathWithoutLang = `/${segments.slice(1).join("/")}`;

    console.log("pathWithoutLang", pathWithoutLang);










    const isAuthenticated = await AuthSession.isAuthenticated();
  
    console.log(isAuthenticated,"authenticated")
  
    // //console.log("isAuthenticated", isAuthenticated);
  
    if (protectedPaths.includes(pathWithoutLang) && !isAuthenticated) {
      // //console.log("redirecting to login");
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
  
    if (NotAuthenticatedPath.includes(pathWithoutLang) && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  
    // now the below code will even force it if the pathname starts with any of the protected paths
  
    const protectedPath = protectedPaths.find((path) =>
      pathWithoutLang.startsWith(path)
    );
    if (protectedPath && !isAuthenticated) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }







  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}