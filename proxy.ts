import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

function middleware(){
    return NextResponse.next()
}, 

{
  callbacks: {
   authorized({ req , token }) {

    const {pathname} = req.nextUrl
     if(
        pathname.startsWith("/api/auth") ||
        pathname === "/login" ||
        pathname === "/register"
     ){
            return true
     }else if(pathname.startsWith("/api/videos") || pathname === "/" ){
         return true
     }
   //   else{
   //      return false
   //   }

      return !!token
   }
  }

})