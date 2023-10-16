import React, { FC } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'

const Administrator: FC = () => {
    return (
        <div>
            <Head>
                <title>Administrator</title>
            </Head>
        </div>
    )
}

(Administrator as PageWithLayout).layout = DashboardLayout
export default Administrator
