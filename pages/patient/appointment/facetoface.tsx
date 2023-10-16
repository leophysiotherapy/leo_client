import React, { FC } from 'react'
import Head from 'next/head'
import F2F from '@/components/Book/FaceToface/facetoface'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'

import styles from '@/styles/appointment/appointment.module.scss'

const FaceToface: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Face-to-Face Appointment</title>
            </Head>
            <F2F />
        </div>
    )
}

(FaceToface as PageWithLayout).layout = MainLayout
export default FaceToface