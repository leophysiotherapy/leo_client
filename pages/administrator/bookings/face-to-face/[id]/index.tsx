import { client } from '@/lib/apolloWrapper'
import React, { FC, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import PageWithLayout from '@/layout/page.layout'
import styles from '@/styles/patient/bookingid.module.scss'
import Feedback from '@/components/Book/feedback'
import Link from 'next/link'
import { getAllAppointmentIDs, getAllPatientAppointment } from '@/util/appointment/appointment.query'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { Oxygen, Poppins } from 'next/font/google'
import { CanceledAppointment } from '@/util/appointment/appointment.mutation'
import { useMutation } from '@apollo/client'
import DashboardLayout from '@/layout/dashboard.layout'
import ReceiptBooking from '@/components/patient/receiptBooking'
import { useReactToPrint } from 'react-to-print'

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
        }
    }

}


const IdMyBooking: FC = ({ appointmentData }: any) => {

    const router = useRouter();
    const [ feedback, setFeedback ] = useState(false)
    const [ mutate ] = useMutation(CanceledAppointment)
    const [ isPrinting, setIsPrinting ] = useState(false)
    const promiseResolveRef = useRef<any>(null)
    const PrintComponent = useRef(null)


    const onHandleFeedbackToggle = () => {
        setFeedback(false)
    }


    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current
        }
    }, [ isPrinting ])

    const hanadlePrint = useReactToPrint({
        content: () => PrintComponent.current
    })



    if (router.isFallback) {
        return (<p>Loading...</p>)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Face-to-Face - Booking
                </title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.filter}>
                <button onClick={hanadlePrint}>Print/save</button>
                <button onClick={() => router.back()}>Home</button>
            </div>
            <div className={styles.booking}>
                <div className={styles.title}>
                    <h2 className={poppins.className}>Booking Summary</h2>
                </div>
                <div className={styles.print} ref={PrintComponent}>
                    <ReceiptBooking appointment={appointmentData} ref={PrintComponent} />
                </div>
                {appointmentData.map(({ appointmentID, time, date, amount, patients, services, status, link, platform }: any) => (
                    <div key={appointmentID} className={styles.bookContainer}>
                        {
                            feedback ? <div className={styles.overlay}>
                                <Feedback appointmentID={appointmentID} close={onHandleFeedbackToggle} />
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
                                    {link.length === 0 ? "N/A" : <Link style={{ textDecoration: "underline", cursor: "pointer" }} href={link}>google</Link>}
                                </span>
                            </div> : null}
                            <div className={styles.bokk}>
                                <h2 className={poppins.className}>Status:</h2>
                                <span className={oxygen.className}>{status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
(IdMyBooking as PageWithLayout).layout = DashboardLayout
export default IdMyBooking