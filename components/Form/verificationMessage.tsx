import React, { useEffect, useState } from 'react'
import styles from './verification.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'
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


    const router = useRouter()
    const [ timer, setTimer ] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(() => timer - 1)
            if (timer === 0) {
                setTimer(0)
                router.push("/auth/login")
            }

        }, 1000)

        return () => clearInterval(interval)
    }, [ router, timer ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Email Verification</title>
            </Head>
            <div className={styles.verificationContainer}>
                <h2 className={poppins.className}>Email Verification</h2>
                <span className={oxygen.className}>Please check your email and click the confimation link to complete your registration. </span>
                <span className={oxygen.className}>Thank you!</span>
                <span className={oxygen.className}>Redirecting to login in {timer} second</span>
            </div>
        </div >
    )
}
