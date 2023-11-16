import React, { FC } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'
import styles from '@/styles/admin/prescription/prediag.module.scss'
import { useRouter } from 'next/router'
import { Poppins } from 'next/font/google'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
const PreDiagnostic: FC = () => {

    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>Pre-Diagnostic</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Pre-Diagnotic Form</h2>
            <div className={styles.reports}>
                <button onClick={() => router.push("https://docs.google.com/forms/d/1QD8QaSX3alu2DqdvPYPb6SqAC6h6Nu2eA54pKEhPTCE/edit#responses")}>Reports</button>
            </div>
            <iframe className={styles.frame} src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRmCpfysITIdBQsz0GDIvnwlUc8K1U-4iuUTIWyPYrMaEKz3RLyp0TjZ9enuYlkdpckwpdyyq6cpCPX/pubhtml?widget=true&amp;headers=false"></iframe>
        </div>
    )
}

(PreDiagnostic as PageWithLayout).layout = DashboardLayout
export default PreDiagnostic