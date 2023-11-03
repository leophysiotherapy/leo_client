import React, { FC } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'
import styles from '@/styles/admin/feedback/evaluationform.module.scss'
import { useRouter } from 'next/router'
const Eval: FC = () => {

    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>Evaluation Form</title>
            </Head>
            <div className={styles.reports}>
                <button onClick={() => router.push("https://docs.google.com/forms/d/1vN5LzfPZp00q1l6ds2uCaIHlvH0EzIqfU7gpfOQ3Ayg/edit")}>Reports</button>
            </div>
            <iframe width="1005" height="600px" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR71C2gAf9uWT6mRY0J8GeL0-bN73-9iuhHxDls_f73-GWr0N5FtyQCDuG4fEZnoQ2dWxBVEWNVmW8B/pubhtml?widget=true&amp;headers=false"></iframe>
        </div>
    )
}

(Eval as PageWithLayout).layout = DashboardLayout
export default Eval