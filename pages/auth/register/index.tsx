import React from 'react'
import styles from '@/styles/auth/register.module.scss'
import RegisterForm from '@/components/Form/register'
import Head from 'next/head'

export default function Register() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Register</title>
            </Head>
            <RegisterForm />
        </div>
    )
}
