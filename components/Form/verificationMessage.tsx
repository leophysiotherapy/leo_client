import React from 'react'
import styles from './verification.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import Head from 'next/head'

const poppins = Poppins({
    weight: "500",
    display: "auto",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function VerificationMessage() {


    return (
        <div className={styles.container}>
            <Head>
                <title>Email Verification</title>
            </Head>
            <div className={styles.verificationContainer}>
                <h2 className={poppins.className}>Email Verification</h2>
                <span className={oxygen.className}>Please check your email and click the confimation link to complemte your registration. </span>
                <span className={oxygen.className}>Thank you!</span>
            </div>
        </div >
    )
}
