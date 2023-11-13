import React from 'react'
import styles from '@/styles/verify/verify.module.scss'
import VerificationMessage from '@/components/Form/verificationMessage'
import Head from 'next/head'

export default function Index() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Email Verification</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <VerificationMessage />
        </div>
    )
}
