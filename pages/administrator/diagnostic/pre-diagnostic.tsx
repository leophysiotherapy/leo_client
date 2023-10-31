import React, { FC } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'

const PreDiagnostic: FC = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Head>
                <title>Pre-Diagnostic</title>
            </Head>
            <iframe width="1005" height="600px" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCpfysITIdBQsz0GDIvnwlUc8K1U-4iuUTIWyPYrMaEKz3RLyp0TjZ9enuYlkdpckwpdyyq6cpCPX/pubhtml?widget=true&amp;headers=false"></iframe>
        </div>
    )
}

(PreDiagnostic as PageWithLayout).layout = DashboardLayout
export default PreDiagnostic