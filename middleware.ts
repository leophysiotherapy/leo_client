import { NextRequest, NextResponse } from 'next/server'

export default function Middleware(req: NextRequest) {
    const cookies = req.cookies.get('physio_token')


    if (!cookies) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

}

export const config = {
    matcher: [ '/administrator/:path*', "/patient/:path*" ]
}