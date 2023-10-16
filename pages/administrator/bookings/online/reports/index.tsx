import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import Head from 'next/head'

import styles from '@/styles/admin/booking/reports/reports.module.scss'

const OnlineReports: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Online Reports</title>
            </Head>
            <select>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="semiAnnually">Semi-Annually</option>
                <option value="annually">Anually</option>
            </select>
        </div>
    )
}


(OnlineReports as PageWithLayout).layout = DashboardLayout
export default OnlineReports