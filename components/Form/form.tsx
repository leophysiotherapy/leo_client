import React, { useState, SyntheticEvent } from 'react'
import Cookies from 'js-cookie'
import styles from './form.module.scss'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { LoginUser } from '@/util/form/auth'
import Link from 'next/link'
import { Oxygen, Poppins } from 'next/font/google'
import jwtDecode from 'jwt-decode'
import ReCAPTCHA from "react-google-recaptcha"


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

    const [ isVerified, setVerified ] = useState(false)
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
                    router.push("/patient/mybooking")
                } else if (role === "admin") {
                    router.push("/administrator")
                }
            },
            onError: (error) => {
                alert(error.message)
            },
            errorPolicy: "all"
        })
    }


    const onCaptchaChange = () => {
        setVerified(() => !isVerified)
    }

    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Login</h2>
            <form>
                <input className={oxygen.className} type='emai' placeholder='Email Address'
                    onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                <input className={oxygen.className} type="password" placeholder='Password'
                    onChange={(e) => setUsers({ ...users, password: e.target.value })} />
                <div className={styles.forgetPassword}>
                    <Link className={oxygen.className} href="/auth/forgotpassword">Forgot password</Link>
                </div>
                <div>
                    <ReCAPTCHA sitekey='6LdztLsoAAAAALLYRJGJHXmCv3F7v84ZrnZnTq0w' onChange={onCaptchaChange} />
                </div>
                <button disabled={isVerified === false} type="submit" onClick={onHandleFormSubmit}>
                    <span className={oxygen.className}>Login</span>
                </button>
                <div className={styles.register}>
                    <span className={oxygen.className}>Don{"'"}t have an account yet? <Link href="/auth/register">Sign up</Link></span>
                </div>
            </form>
        </div>
    )
}
