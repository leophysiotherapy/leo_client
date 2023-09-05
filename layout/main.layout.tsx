import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'


const Header = dynamic(() => import("@/components/Header/header"))

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
