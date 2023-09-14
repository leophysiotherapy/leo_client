import React, { FC } from 'react'
import styles from '@/styles/patient/mybooking.module.scss'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'
import { Poppins, Oxygen } from 'next/font/google'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { GetPatientAppointment } from '@/util/appointment/appointment.query'
import jwtDecode from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const heads = [ "Date", "Time", "Service", "Platform", "Actions" ];
const upHeads = [ "Date", "Time", "Service", "Amount Paid", "Status", "Receipt" ]

type bookings = {
    appointmentID: string
    status: string
    link: string | null
    date: any
    platform: string
    time: string
    services: []
}

const MyBooking: FC = ({ userID }: any) => {

    const { loading, data } = useQuery(GetPatientAppointment, {
        variables: {
            userId: userID
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>My Booking</title>
            </Head>
            <div className={styles.upcoming}>
                <h2 className={poppins.className}>Upcoming Bookings</h2>
            </div>
            <div className={styles.filter}>
                <select name="" id="">
                    <option>---</option>
                    <option>Face-to-Face</option>
                    <option>Online</option>
                </select>
            </div>
            <div className={styles.upsHead}>
                <table>
                    <thead>
                        <tr>
                            {upHeads.map((name) => (
                                <th className={oxygen.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>

        </div>
    )
}

(MyBooking as PageWithLayout).layout = MainLayout
export default MyBooking



export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userID: userID
        }
    }
}