import React, { useState, SyntheticEvent } from 'react'
import Cookies from 'js-cookie'
import styles from './form.module.scss'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { LoginUser } from '@/util/form/auth'
import Link from 'next/link'
import { Oxygen, Poppins } from 'next/font/google'
import jwtDecode from 'jwt-decode'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function Form() {
    const router = useRouter()
    const [ users, setUsers ] = useState({
        email: "",
        password: ""
    })



    const [ mutate ] = useMutation(LoginUser)

    const onHandleFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate({
            variables: {
                email: users.email,
                password: users.password
            },
            onCompleted: (data) => {
                Cookies.set("physio_token", data.login.token, {
                    sameSite: "none",
                    secure: true,
                    path: "/",
                    expires: 60 * 60 * 24 * 7
                })

                const { role }: any = jwtDecode(data.login.token)

                if (role === "patient") {
                    router.push("/")
                } else if (role === "admin") {
                    router.push("/administrator")
                }
            },
            errorPolicy: "all"
        })
    }

    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Login</h2>
            <form onSubmit={onHandleFormSubmit}>
                <input className={oxygen.className} type='emai' placeholder='Email Addres'
                    onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                <input className={oxygen.className} type="password" placeholder='Password'
                    onChange={(e) => setUsers({ ...users, password: e.target.value })} />
                <div className={styles.forgetPassword}>
                    <Link className={oxygen.className} href="/auth/forgetpassword">Forget password</Link>
                </div>
                <button>
                    <span className={oxygen.className}>Login</span>
                </button>
                <div className={styles.register}>
                    <span className={oxygen.className}>Don{"'"}t have an account yet? <Link href="/auth/register">Sign up</Link></span>
                </div>
            </form>
        </div>
    )
}
