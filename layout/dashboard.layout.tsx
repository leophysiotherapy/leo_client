import React, { ReactNode, useState } from 'react'
import Sidebar from '@/components/admin/sidebar/sidebar'
import Header from '@/components/admin/header/header'
import styles from './dashboard.layout.module.scss'
export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [ sidebar, setSidebar ] = useState(true)


    const handleSidebar = () => {
        setSidebar(() => !sidebar)
    }

    return (
        <div className={styles.container}>
            {sidebar ?
                <div className={sidebar ? `${styles.open}` : `${styles.close}`}>
                    <Sidebar close={handleSidebar} />
                </div> : null}
            <div className={styles.bodyLayout}>
                <Header close={handleSidebar} />
                {children}
            </div>
        </div>
    )
}
