import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from '@/styles/auth/resetpassword.module.scss'
import Head from 'next/head'
import { Poppins, Oxygen } from 'next/font/google'
import { ResetPassword as PassReset } from '@/util/form/auth'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
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
            </Head>
            <div className={styles.forgotContainer}>
                <h2 className={poppins.className}>Reset Password</h2>

                <span className={oxygen.className}>
                    {data ? "You have successfully changed your password!" : "A verification code has been sent to your email, Please check your email"}
                </span>
                {data ? <button onClick={() => router.push("/auth/login")}>Login Here</button> : <form onSubmit={onHandleResetPassword}>
                    <input type="password" placeholder='Password' onChange={(e) => setPass({ ...pass, password: e.target.value })} />
                    <input type="password" placeholder='Re-type Password' onChange={(e) => setPass({ ...pass, rpassword: e.target.value })} />
                    <button disabled={!pass} type="submit">Submit</button>
                </form>}
            </div>
        </div>
    )
}
