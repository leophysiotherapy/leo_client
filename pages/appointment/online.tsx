import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import styles from '@/styles/appointment/appointment.module.scss'
import Head from 'next/head'
import Onlines from '@/components/Book/Online/online'






const Online: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Online Appointment</title>
            </Head>
            <Onlines />
        </div>
    )
}


(Online as PageWithLayout).layout = MainLayout
export default Online