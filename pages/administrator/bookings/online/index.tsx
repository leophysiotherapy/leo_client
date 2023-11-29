import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import styles from '@/styles/admin/booking/online.module.scss'
import Head from 'next/head'
import { Poppins } from 'next/font/google'
import { getAllAppointByPlatform, getFindSpecificDate } from '@/util/appointment/appointment.query'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/client'
import AppointmentQuery from '@/components/admin/appointment/online/appointmentQuery'
const OnlineHeader = [ "Date & Time", "Name", "Links", "Status", "Receipt", "Actions" ]



const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const Online: FC = () => {

    const router = useRouter()
    const [ toggleDate, setToggleDate ] = useState(false)
    const [ findDate, setFindDate ] = useState("")

    const onHandleSelectDate = () => {
        setToggleDate(() => !toggleDate)
    }

    const { loading, data } = useQuery(getAllAppointByPlatform, {
        variables: {
            platform: "online"
        }
    })

    const [ datetime, { data: dataSpeficDate } ] = useLazyQuery(getFindSpecificDate, {
        variables: {
            date: findDate,
            platform: "online"
        },
    })


    return (
        <div className={styles.container}>
            <Head>
                <title>Online Consultations</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Online Consultations</h2>
            <div className={styles.filtering}>
                <div className={styles.filterDate}>

                    <div>
                        <label className={poppins.className}>Select a Date</label>
                        <input type="radio" onChange={onHandleSelectDate} checked={toggleDate ? true : false} />
                    </div>
                    {toggleDate ? <input type='date' onChange={(e) => {

                        datetime()
                        setFindDate(e.target.value)
                    }

                    } /> : null}
                </div>
                <div className={styles.filterAll}>
                    <div>
                        <label className={poppins.className}>View All</label>
                        <input type="radio" onChange={onHandleSelectDate} checked={toggleDate === false ? true : false} />
                    </div>

                </div>
            </div>
            <div className={styles.reports}>
                <button onClick={() => router.push("/administrator/bookings/reports")}>Reports</button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {OnlineHeader.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {

                            toggleDate ? dataSpeficDate?.getAppointmentByDateTime.map(({ appointmentID, date, link, platform, services, status, time, patients }: any) => (
                                patients.map(({ profile }: any) => (
                                    profile.map(({ fullname }: any) => (
                                        <AppointmentQuery key={appointmentID} appointmentID={appointmentID} date={date} time={time} link={link} status={status} fullname={fullname} platform={platform} />
                                    ))
                                ))
                            )) :

                                loading ? <tr>
                                    <td></td>
                                </tr> : data.getAppointmentByplatform.map(({ appointmentID, date, link, platform, services, status, time, patients }: any) => (
                                    patients.map(({ profile }: any) => (
                                        profile.map(({ fullname }: any) => (
                                            <AppointmentQuery key={appointmentID} appointmentID={appointmentID} date={date} time={time} link={link} status={status} fullname={fullname} platform={platform} />
                                        ))
                                    ))
                                ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


(Online as PageWithLayout).layout = DashboardLayout
export default Online