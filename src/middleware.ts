import { auth } from "./auth"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth: middleware } = NextAuth(authConfig)


export default auth(req => {
  console.log(req.auth)
})



// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], from auth
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // from clerk
  }