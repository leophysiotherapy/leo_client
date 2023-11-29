import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { TbChevronDown, TbMenu, TbMenu2 } from 'react-icons/tb'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const patientURL = [
    { name: "My Bookings", url: "/patient/mybooking" },
    { name: "Patient Record", url: "/patient/myrecord" },
    { name: "Feedback", url: "/patient/feedback" },
    { name: "Account Settings", url: "/patient/settings" }
]

const bookingURL = [
    { name: "Face-to-Face Sessions", url: "/patient/appointment/facetoface" },
    { name: "Online Consultations", url: "/patient/appointment/online" },
    { name: "Pre-diagnostic", url: "/patient/appointment/pre-diagnostic" }
]
export default function Header() {
    const [ cookies, setCookies ] = useState("")
    const [ width, setWidth ] = useState(0)
    const router = useRouter()
    const [ book, setBook ] = useState(false)
    const [ dashboard, setDashboard ] = useState(false)
    useEffect(() => {
        const cookied = Cookies.get("physio_token");
        setCookies(cookied as any)

    }, [ cookies ])


    const onHandleLogout = () => {

        router.push("/")
        Cookies.remove("physio_token")
        router.reload()
    }


    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        handleResize();

        return () => window.removeEventListener("resize", handleResize)

    }, [])

    const [ mob, setMob ] = useState(false)

    return (
        <div className={styles.container}>

            <div className={styles.link}>
                <div className={styles.title}>
                    <Image src="/logo.png" alt="" height={73} width={140} onClick={() => router.push("/")} />
                </div>
            </div>

            {width <= 900 ? <div className={styles.mobile} >
                {mob ?
                    <div className={styles.navbar}>
                        <div className={styles.header}>
                            <Image src="/logo.png" alt="" height={73} width={140} onClick={() => router.push("/")} />
                            <button onClick={() => setMob(() => !mob)}>
                                <TbMenu2 size={30} />
                            </button>
                        </div>
                        <div className={styles.headerNav}>
                            {cookies ?
                                <div className={styles.mobileToggle}>
                                    <button onClick={() => setBook(() => !book)} className={styles.booknow}>
                                        <span className={oxygen.className}>Book Now <TbChevronDown size={15} /></span>
                                    </button>
                                    {book ? <div className={styles.toggleContainer}>
                                        {bookingURL.map(({ name, url }) => (
                                            <button key={name} onClick={() => {
                                                router.push(url)
                                                setBook(false)
                                            }}>
                                                <span className={oxygen.className}>{name}</span>
                                            </button>
                                        ))}
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
                            {cookies ? <div className={styles.mobileToggle}>
                                <button onClick={() => setDashboard(() => !dashboard)} className={styles.booknow}>
                                    <span className={oxygen.className}>Dashboard <TbChevronDown size={15} /></span>
                                </button>
                                {dashboard ? <div className={styles.toggleContainer}>

                                    {
                                        patientURL.map(({ name, url }) => (
                                            <button key={name} onClick={() => {
                                                router.push(url)
                                                setDashboard(false)
                                            }}>
                                                <span className={oxygen.className}>{name}</span>
                                            </button>
                                        ))
                                    }

                                </div> : null}
                            </div> : null}
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
                    </div> : null}
                <button onClick={() => setMob(() => !mob)}>
                    <TbMenu2 size={30} />
                </button>
            </div > :
                <>
                    <div className={styles.wi}>
                        {cookies ?
                            <div className={styles.toggle}>
                                <button onClick={() => setBook(() => !book)} className={styles.booknow}>
                                    <span className={oxygen.className}>Book Now <TbChevronDown size={15} /></span>
                                </button>
                                {book ? <div className={styles.toggleContainer}>
                                    {bookingURL.map(({ name, url }) => (
                                        <button key={name} onClick={() => {
                                            router.push(url)
                                            setBook(false)
                                        }}>
                                            <span className={oxygen.className}>{name}</span>
                                        </button>
                                    ))}
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
                                <span className={oxygen.className}>Dashboard <TbChevronDown size={15} /></span>
                            </button>
                            {dashboard ? <div className={styles.toggleContainer}>

                                {
                                    patientURL.map(({ name, url }) => (
                                        <button key={name} onClick={() => {
                                            router.push(url)
                                            setDashboard(false)
                                        }}>
                                            <span className={oxygen.className}>{name}</span>
                                        </button>
                                    ))
                                }

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
                </>}
        </div>
    )
}
