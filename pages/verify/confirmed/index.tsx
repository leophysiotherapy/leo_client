import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { VerifiedAccount } from '@/util/form/auth';
import { Router, useRouter } from 'next/router'
import styles from '@/styles/verify/confirmed.module.scss'
import { Poppins, Oxygen } from 'next/font/google';
import Head from 'next/head'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function Index() {

    const router = useRouter()


    const [ mutate ] = useMutation(VerifiedAccount)

    useEffect(() => {
        const items = window.localStorage.getItem("email");


        const replacItems = items?.replaceAll(`"`, '');

        console.log(replacItems)

        mutate({
            variables: {
                email: replacItems
            },
            errorPolicy: "all"
        })
    }, [ mutate ])



    return (
        <div className={styles.container}>
            <Head>
                <title>Verified Email</title>
            </Head>
            <div className={styles.confirmed}>
                <h2 className={poppins.className}>Email Confirmed</h2>
                <div>
                    <span className={oxygen.className}>Thank you for registering. </span>
                    <span className={oxygen.className}>You can now login your account.</span>
                </div>
                <button className={oxygen.className}
                    onClick={() => router.push("/auth/login")}
                >Login</button>
            </div>
        </div>
    )
}
