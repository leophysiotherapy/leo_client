import React, { FC, useState } from 'react'
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
import Link from 'next/link'
import { TbEye } from 'react-icons/tb'
import { utcToZonedTime } from 'date-fns-tz'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const upHeads = [ "Date", "Time", "Service", "Amount Paid", "Receipt" ]

const MyBooking: FC = ({ userID }: any) => {

    const [ plat, setPlaform ] = useState("f2f")
    const [ stats, setStatus ] = useState("upcoming")

    const { loading, data } = useQuery(GetPatientAppointment, {
        variables: {
            userId: userID,
            platform: plat,
            status: stats
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>My Booking</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.upcoming}>
                <h2 className={poppins.className}>Bookings</h2>
            </div>
            <div className={styles.filter}>
                <select onChange={(e) => setPlaform(e.target.value)}>
                    <option value="f2f">Face-to-Face</option>
                    <option value="online">Online</option>
                </select>
                <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="upcoming">Upcoming</option>
                    <option value="finished">Finished</option>
                    <option value="canceled">Canceled</option>
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
                    <tbody>
                        {loading ?
                            <tr>
                                <td>Loading...</td>
                            </tr> :
                            data.getAllPatientAppointment.map(({ appointmentID, date, time, services, amount }: any) => (
                                <tr key={appointmentID}>
                                    <td className={oxygen.className}>{format(utcToZonedTime(date, "America/Los_Angeles"), "MM/dd/yyyy")}</td>
                                    <td className={oxygen.className}>{time}</td>
                                    <td className={oxygen.className}>{services}</td>

                                    <td className={oxygen.className}>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</td>
                                    <td>
                                        <Link href={`/patient/mybooking/${appointmentID}`}>
                                            <TbEye size={23} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
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