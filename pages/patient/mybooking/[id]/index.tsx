import { client } from '@/lib/apolloWrapper'
import React, { FC, useState, useRef, useEffect, SyntheticEvent } from 'react'
import Head from 'next/head'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'
import styles from '@/styles/patient/bookingid.module.scss'
import Feedback from '@/components/Book/feedback'
import Link from 'next/link'
import { getAllAppointmentIDs, getAllPatientAppointment } from '@/util/appointment/appointment.query'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { Oxygen, Poppins } from 'next/font/google'
import { CanceledAppointment } from '@/util/appointment/appointment.mutation'
import { useMutation } from '@apollo/client'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useReactToPrint } from 'react-to-print'
import ReceiptBooking from '@/components/patient/receiptBooking'
import DisclaimerFeedback from '@/components/patient/feedback/disclamier'
import { count } from 'console'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})



export const getStaticPaths: GetStaticPaths = async () => {
    const { data: { getAllAppointment } } = await client.query({
        query: getAllPatientAppointment
    })


    const paths = getAllAppointment.map(({ appointmentID }: any) => {
        return { params: { id: appointmentID } }
    })

    return {
        paths, fallback: true
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const appointmentID = context.params?.id

    const { data: { getAllAppointmentID } } = await client.query({
        query: getAllAppointmentIDs,
        variables: {
            appointmentId: appointmentID
        }
    })

    return {
        props: {
            appointmentData: getAllAppointmentID
        },
        revalidate: 60
    }
}


const IdMyBooking: FC = ({ appointmentData }: any) => {

    const router = useRouter();
    const [ feedback, setFeedback ] = useState(false)
    const [ mutate ] = useMutation(CanceledAppointment)

    const [ isPrinting, setIsPrinting ] = useState(false)
    const promiseResolveRef = useRef<any>(null)
    const PrintComponent = useRef(null)

    const [ paid, setPaid ] = useState(false)

    const onHandleFeedbackToggle = () => {
        setFeedback(false)
        setContinue(false)
    }

    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current
        }
    }, [ isPrinting ])

    const hanadlePrint = useReactToPrint({
        content: () => PrintComponent.current
    })

    const [ cont, setContinue ] = useState(false)


    const onHandleDisclaimer = () => {
        setContinue(() => !cont)
    }


    if (router.isFallback) {
        return (<p>Loading...</p>)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Booking
                </title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.filter}>
                <button onClick={hanadlePrint}>Print/save</button>
                <button onClick={() => router.push("/patient/mybooking")}>Back</button>
            </div>
            <div className={styles.print} ref={PrintComponent}>
                <ReceiptBooking appointment={appointmentData} ref={PrintComponent} />
            </div>
            <div className={styles.booking}>
                <div className={styles.title}>
                    <h2 className={poppins.className}>Booking Summary</h2>
                </div>

                {appointmentData?.map(({ appointmentID, time, date, amount, patients, services, status, link, platform }: any) => (
                    <div key={appointmentID} className={styles.bookContainer}>
                        {
                            feedback ? <div className={styles.overlay}>
                                {cont ?
                                    <Feedback appointmentID={appointmentID} close={onHandleFeedbackToggle} /> : <DisclaimerFeedback continueHandler={onHandleDisclaimer} />}
                            </div> : null
                        }
                        <div className={styles.book}>
                            {patients.map(({ profile, email }: any) => (
                                profile.map(({ firstname, lastname }: any) => (
                                    <div className={styles.profile} key={firstname}>
                                        <h2 className={poppins.className}>Email: {email}</h2>
                                        <h2 className={poppins.className}>Name: {firstname} {lastname}</h2>
                                    </div>
                                ))
                            ))}
                            <div className={styles.bokk}>
                                <h2 className={poppins.className}>Date:</h2>
                                <span className={oxygen.className}>{date}</span>
                            </div>
                            <div className={styles.bokk}>
                                <h2 className={poppins.className}>Time:</h2>
                                <span className={oxygen.className}>{time}</span>
                            </div>
                            <div className={styles.bokk}>
                                <h2 className={poppins.className}>Service:</h2>
                                <span className={oxygen.className}>{services}</span>
                            </div>
                            {platform === "online" ? <div className={styles.bokk}>
                                <h2 className={poppins.className}>Link:</h2>
                                <span className={oxygen.className}>
                                    {link === null || link === "" ? "N/A" : <Link target='_blank' style={{ textDecoration: "underline", cursor: "pointer" }} href={link}>google</Link>}
                                </span>
                            </div> : null}
                            <div className={styles.bokk}>
                                <h2 className={poppins.className}>Status:</h2>
                                <span className={oxygen.className}>{status}</span>
                            </div>
                        </div>
                        <div className={styles.books}>
                            <h2 className={poppins.className}>Total amount: <span className={oxygen.className}>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</span></h2>
                            {status === "canceled" || status === "done" || status === "finished" ? null :
                                <div className={styles.cancelBtn}>
                                    <button onClick={(e: SyntheticEvent) => {
                                        e.preventDefault();
                                        mutate({
                                            variables: {
                                                appointmentId: appointmentID
                                            },
                                            onCompleted: () => {
                                                router.push("/patient/mybooking")
                                            }
                                        })
                                    }}>
                                        <h2 className={oxygen.className}>Cancel Booking</h2>
                                    </button>
                                </div>
                            }
                            {
                                status === "finished" ?
                                    <div className={styles.feedbackBtn}>
                                        <button onClick={() => setFeedback(() => !feedback)}>Create Feedback</button>
                                    </div> : null
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
(IdMyBooking as PageWithLayout).layout = MainLayout
export default IdMyBooking