import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from '@/styles/auth/forgetpassword.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { FindEmailAddress } from '@/util/user/user.mutation'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { CreateOTP } from '@/util/otp/otp.mutation'
const poppins = Poppins({
    weight: '500',
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function ForgetPassword() {

    const router = useRouter();
    const [ emailAddress, setEmailAddress ] = useState("")


    const [ mutate, { data, error } ] = useMutation(FindEmailAddress)
    const [ codeMutation ] = useMutation(CreateOTP)


    const onHandleFindEmaill = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate({
            variables: {
                email: emailAddress
            },
            onCompleted: () => {
                alert("Email sent")
                window.localStorage.setItem("emailAddress", emailAddress)
            },
            errorPolicy: "all"
        })

    }


    useEffect(() => {
        if (data) {
            codeMutation({
                variables: {
                    email: emailAddress,
                },
                onCompleted: () => {
                    router.push("/auth/otpVerify/")
                },
            })
        }
    }, [ codeMutation, data, emailAddress, router ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Forgot Password</title>
            </Head>

            <div className={styles.forgotContainer}>
                <h2 className={poppins.className}>Reset Password</h2>
                <span>
                    {error?.message}</span>
                <span className={oxygen.className}>Enter your account Email Address </span>
                <form onSubmit={onHandleFindEmaill}>
                    <input type="email" placeholder='Email address' onChange={(e) => setEmailAddress(e.target.value)} />
                    <button disabled={!emailAddress} type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
