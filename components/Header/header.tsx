import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const poppins = Poppins({
    weight: "400",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function Header() {
    const [ cookies, setCookies ] = useState("")
    const router = useRouter()
    const [ book, setBook ] = useState(false)
    useEffect(() => {
        const cookied = Cookies.get("physio_token");
        setCookies(cookied as any)

    }, [ cookies ])



    const onHandleLogout = () => {
        Cookies.remove("physio_token")
        router.push("/")
    }

    return (
        <div className={styles.container}>

            <div className={styles.link}>
                <h2 className={poppins.className}>Leonardo Clinic</h2>
                {cookies ? null :
                    <div className={styles.toggle}>
                        <button onClick={() => setBook(() => !book)} className={styles.booknow}>
                            <span className={oxygen.className}>Book Now</span>
                        </button>
                        {book ? <div className={styles.toggleContainer}>
                            <button onClick={() => router.push("/appointment/facetoface")}>
                                <span className={oxygen.className}>Face-to-Face</span>
                            </button>
                            <button onClick={() => router.push("/appointment/online")}>
                                <span className={oxygen.className}>Online</span>
                            </button>
                            <button>
                                <span className={oxygen.className}>Pre-Diagnostic</span>
                            </button>
                        </div> : null}
                    </div>
                }
            </div>
            {cookies ?
                <button className={styles.btn} onClick={onHandleLogout}>
                    <span>Logout</span>
                </button> :
                <button className={styles.btn} onClick={() => router.push("/auth/login")}>
                    <span>Login</span>
                </button>}
        </div>
    )
}
