import React, { useState, useEffect } from 'react'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { TbChevronRight, TbChevronDown, TbMenu2 } from 'react-icons/tb'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { client } from '@/lib/apolloWrapper'
import { GetNumberofExpiration } from '@/util/inventory/equipment.query'
import { useQuery } from '@apollo/client'

const oxygen = Poppins({
    weight: "400",
    display: "auto",
    subsets: [ "latin" ]
})
export default function Sidebar({ close }: any) {

    const router = useRouter();
    const [ records, setRecords ] = useState<boolean>(false);
    const [ bookings, setBooking ] = useState<boolean>(false);
    const [ diagnostics, setDiagnostic ] = useState<boolean>(false);
    const [ content, setContent ] = useState<boolean>(false);
    const [ feedback, setFeedback ] = useState<boolean>(false);
    const [ width, setWidth ] = useState<number>(0)

    const onHandleLogout = () => {
        Cookies.remove("physio_token");
        client.resetStore();
        router.push("/")
    }



    const { loading, data } = useQuery(GetNumberofExpiration)


    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        handleResize();

        return () => window.removeEventListener("resize", handleResize)

    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src='/logo.png' height={110} width={180} alt="" onClick={() => router.push("/administrator")} />
                {width < 600 ? <button onClick={close}>
                    <TbMenu2 size={25} />
                </button> : null}
            </div>
            <ul>
                <button onClick={() => {
                    setRecords(() => !records)
                }}>
                    <span>Records</span>
                    {records ? <TbChevronDown size={20} /> : <TbChevronRight size={20} />}
                </button>
                {
                    records ?
                        <div className={styles.subNav}>
                            <button onClick={() => {
                                router.push("/administrator/records/staff")
                                width < 600 ? close() : null
                            }}>
                                <span>Staff</span>
                            </button>
                            <button onClick={() => {
                                router.push("/administrator/records/patient")
                                width < 600 ? close() : null
                            }}>
                                <span>Patient</span>
                            </button>
                        </div> : null
                }
                <button onClick={() => setBooking(() => !bookings)}>
                    <span>Bookings</span>
                    {bookings ? <TbChevronDown size={20} /> : <TbChevronRight size={20} />}
                </button>
                {
                    bookings ?
                        <div className={styles.subNav}>
                            <button onClick={() => {
                                router.push("/administrator/bookings/online")
                                width < 600 ? close() : null
                            }}>
                                <span>Online Consultation</span>
                            </button>
                            <button onClick={() => {
                                router.push("/administrator/bookings/face-to-face")
                                width < 600 ? close() : null
                            }}>
                                <span>Face-to-Face Sessions</span>
                            </button>
                        </div> : null
                }
                <button onClick={() => setDiagnostic(() => !diagnostics)}>
                    <span>Diagnostics</span>
                    {diagnostics ? <TbChevronDown size={20} /> : <TbChevronRight size={20} />}
                </button>
                {
                    diagnostics ?
                        <div className={styles.subNav}>
                            <button onClick={() => {
                                router.push("/administrator/diagnostic/pre-diagnostic")
                                width < 600 ? close() : null
                            }}>
                                <span>Pre-Diagnostic Form</span>
                            </button>
                            <button onClick={() => {
                                router.push("/administrator/diagnostic/prescriptions")
                                width < 600 ? close() : null
                            }}>
                                <span>Prescriptions</span>
                            </button>
                        </div> : null
                }

                <div className={styles.normalBtn}>
                    <button onClick={() => {
                        router.push("/administrator/inventory/equipment")
                        width < 600 ? close() : null
                    }}>
                        <span>Inventory</span>
                        {loading ? "" : <span>{data.getInventoryExpiration}</span>}
                    </button>
                </div>
                <button onClick={() => setContent(() => !content)}>
                    <span>Content</span>
                    {content ? <TbChevronDown size={20} /> : <TbChevronRight size={20} />}
                </button>
                {
                    content ?
                        <div className={styles.subNav}>
                            <button onClick={() => {
                                router.push("/administrator/content/blogs")
                                width < 600 ? close() : null
                            }}>
                                <span>Blogs</span>
                            </button>
                            <button onClick={() => {
                                router.push("/administrator/content/faqs")
                                width < 600 ? close() : null
                            }}>
                                <span>FAQs</span>
                            </button>
                        </div> : null
                }
                <button onClick={() => setFeedback(() => !feedback)}>
                    <span>Feedback</span>
                    {feedback ? <TbChevronDown size={20} /> : <TbChevronRight size={20} />}
                </button>
                {
                    feedback ?
                        <div className={styles.subNav}>
                            <button onClick={() => {
                                router.push("/administrator/feedback/evaluation-form")
                                width < 600 ? close() : null
                            }}>
                                <span>Evaluation Form</span>
                            </button>
                            <button onClick={() => {
                                router.push("/administrator/feedback/reviews")
                                width < 600 ? close() : null
                            }}>
                                <span>Reviews</span>
                            </button>
                        </div> : null
                }
            </ul>
            <div className={styles.btnLogout}>
                <button onClick={onHandleLogout}>
                    <span className={oxygen.className}>Logout</span>
                </button>
            </div>
        </div>
    )
}
