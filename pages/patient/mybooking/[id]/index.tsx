import { client } from '@/lib/apolloWrapper'
import React, { FC, useState } from 'react'
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
        paths, fallback: false
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

    const [ paid, setPaid ] = useState(false)


    const onHandleFeedbackToggle = () => {
        setFeedback(false)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Booking
                </title>
            </Head>
            <div className={styles.filter}>
                <button onClick={() => window.print()}>Print/save</button>
                <button onClick={() => router.push("/patient/mybooking")}>Home</button>
            </div>
            <div className={styles.booking}>
                <div className={styles.title}>
                    <h2 className={poppins.className}>Booking Summary</h2>
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
                                    {link.length === 0 ? "N/A" : <Link target='_blank' style={{ textDecoration: "underline", cursor: "pointer" }} href={link}>google</Link>}
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
                                    <PayPalButtons

                                        style={{
                                            color: "gold",
                                            layout: "horizontal",
                                            shape: "rect"
                                        }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [ {
                                                    description: "Consultation",
                                                    amount: {
                                                        value: "175"
                                                    },
                                                } ],

                                            })
                                        }}
                                        onClick={(data, actions) => {

                                        }}
                                        onApprove={async (data, actions) => {
                                            setPaid(() => true)
                                            mutate({
                                                variables: {
                                                    appointmentId: appointmentID
                                                },
                                                onCompleted: () => {
                                                    router.reload()
                                                }
                                            })
                                            await actions.order?.capture()
                                        }}
                                        onCancel={() => {
                                            setPaid(false)
                                        }} // to fixed
                                    />
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