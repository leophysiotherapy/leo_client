import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    const [ dashboard, setDashboard ] = useState(false)
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
                <div className={styles.title}>
                    <h2 className={poppins.className}>Leonardo Clinic</h2>
                </div>

            </div>
            <div className={styles.wi}>
                {cookies ?
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
                    :
                    null
                }
                <div className={styles.links}>
                    <Link href="/about" className={oxygen.className} >About Us</Link>
                    <Link href="/blogs" className={oxygen.className}>Blogs</Link>
                    <Link href="/faqs" className={oxygen.className}>FAQs</Link>
                </div>
                {cookies ? <div className={styles.toggle}>
                    <button onClick={() => setDashboard(() => !dashboard)} className={styles.booknow}>
                        <span className={oxygen.className}>Dashboard</span>
                    </button>
                    {dashboard ? <div className={styles.toggleContainer}>
                        <button onClick={() => router.push("/patient/mybooking")}>
                            <span className={oxygen.className}>My Booking</span>
                        </button>
                        <button onClick={() => router.push("/patient/myrecord")}>
                            <span className={oxygen.className}>Patient Record</span>
                        </button>
                        <button onClick={() => router.push("/patient/feedback")}>
                            <span className={oxygen.className}>Feedback</span>
                        </button>
                        <button onClick={() => router.push("/patient/settings")}>
                            <span className={oxygen.className}>Account Settings</span>
                        </button>
                    </div> : null}
                </div> : null}
            </div>
            <div className={styles.helllo}>
                {cookies ?
                    <button className={styles.btn} onClick={onHandleLogout}>
                        <span className={oxygen.className}>Logout</span>
                    </button> :
                    <button className={styles.btn} onClick={() => router.push("/auth/login")}>
                        <span className={oxygen.className}>Login</span>
                    </button>}
            </div>
        </div>
    )
}
