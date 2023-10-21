import React, { FC } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'

const PreDiagnostic: FC = () => {
    return (
        <div>
            <Head>
                <title>Pre-Diagnostic</title>
            </Head>
        </div>
    )
}

(PreDiagnostic as PageWithLayout).layout = DashboardLayout
export default PreDiagnostic