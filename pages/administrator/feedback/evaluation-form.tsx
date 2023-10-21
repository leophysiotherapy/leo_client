import React, { FC } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'


const Eval: FC = () => {
    return (
        <div>
            <Head>
                <title>Evaluation Form</title>
            </Head>
        </div>
    )
}

(Eval as PageWithLayout).layout = DashboardLayout
export default Eval