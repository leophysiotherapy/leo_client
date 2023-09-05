import React from 'react'
import Form from '@/components/Form/form'
import styles from '@/styles/auth/login.module.scss'
import Head from 'next/head'
export default function Index() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <Form />
        </div>
    )
}
