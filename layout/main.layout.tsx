import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
import styles from '@/styles/layout/main.layout.module.scss'

const Header = dynamic(() => import("@/components/Header/header"))

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    )
}
