import React, { SyntheticEvent, useState } from 'react'
import styles from '@/styles/auth/otpverification.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { verifyOTP } from '@/util/otp/otp.mutation'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
const poppins = Poppins({
    weight: '500',
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function OTPVerify() {

    const [ mutate, { data, error } ] = useMutation(verifyOTP)
    const router = useRouter();
    const [ verify, setVerify ] = useState("")
    const onHandleVerifiedOTP = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate({
            variables: {
                otp: verify
            },
            errorPolicy: "all",
            onCompleted: () => {
                router.push("/auth/forgotpassword/resetpassword")
            }
        })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>OTP Verify</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.forgotContainer}>
                <h2 className={poppins.className}>Reset Password</h2>
                <Image src="/logo.png" alt="" height={80} width={120} priority />
                <span>
                    {error?.message}</span>
                <span className={oxygen.className}>A verification code has been sent to your email, Please check your email</span>
                <form onSubmit={onHandleVerifiedOTP}>
                    <input type="text" placeholder='Verification code' onChange={(e) => setVerify(e.target.value)} />
                    <button disabled={!verify} type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
