import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from '@/styles/auth/resetpassword.module.scss'
import Head from 'next/head'
import { Poppins, Oxygen } from 'next/font/google'
import { ResetPassword as PassReset } from '@/util/form/auth'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
const poppins = Poppins({
    weight: '500',
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function ResetPassword() {
    const router = useRouter()
    const [ email, setEmailAddress ] = useState("")
    const [ pass, setPass ] = useState({
        password: "",
        rpassword: ""
    })

    const [ mutate, { data } ] = useMutation(PassReset)

    useEffect(() => {
        const data = window.localStorage.getItem("emailAddress")
        if (data !== null) setEmailAddress(data)
    }, [])

    const onHandleResetPassword = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate({
            variables: {
                email,
                password: pass.password,
                retype: pass.rpassword
            },
            onCompleted: () => {
                alert("Congratulation you already reset your password")
                window.localStorage.removeItem("emailAddress")
            }
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Reset Password</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.forgotContainer}>
                <h2 className={poppins.className}>Reset Password</h2>
                <Image src="/logo.png" alt="" height={80} width={120} priority />
                <span className={oxygen.className}>
                    {data ? "You have successfully changed your password!" : "Enter your new Password"}
                </span>
                {data ? <button onClick={() => router.push("/auth/login")}>Login Here</button> : <form onSubmit={onHandleResetPassword}>
                    <input type="password" placeholder='Enter your new password' onChange={(e) => setPass({ ...pass, password: e.target.value })} />
                    <input type="password" placeholder='Re-type Password' onChange={(e) => setPass({ ...pass, rpassword: e.target.value })} />
                    <button disabled={!pass} type="submit">Submit</button>
                </form>}
            </div>
        </div>
    )
}
