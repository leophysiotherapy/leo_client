import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'
import styles from '@/styles/admin/homepage.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { gql, useQuery, useMutation } from '@apollo/client'
import Link from 'next/link'

const tableList = [ "Time", "Name", "Services", "Platform" ]


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: '400',
    subsets: [ "latin" ]
})

const Administrator: FC = () => {


    const [ appointment, setAppointment ] = useState([ {
        date: "",
        time: "",
        phone: ""
    } ])


    const [ SMSMutation ] = useMutation(gql`mutation CreateSMSNotification($phoneNumber: PhoneNumber!) {
        createSMSNotification(phoneNumber: $phoneNumber)
      }`)

    const { loading, data } = useQuery(gql`query GetAllAppointmentToday {
        getAllAppointmentToday {
          appointmentID
          time
          date
          platform
          services
          link
          patients {
            profile {
              fullname
              phone
            }
          }
        }
      }`)


    useEffect(() => {

        loading ? "" : data.getAllAppointmentToday.map(({ time, date, patients }: { time: string, date: any, patients: [] }) => {
            patients.map(({ profile }: { profile: [] }) => {
                profile.map(({ phone }: { phone: string }) => {
                    setAppointment((times) => [ ...times, {
                        date: date, time, phone: phone
                    } ])
                })
            })
        })

    }, [ data, loading ])



    function isLessThan1Hour(currentDateTime: Date, targetDateTime: Date) {
        const differenceInMilleseconds = targetDateTime.getTime() - currentDateTime.getTime();
        return differenceInMilleseconds < 3600 && differenceInMilleseconds >= 0
    }


    function checkIfTimeIsGreaterThan(currentDateTime: Date, targetDateTime: Date) {
        if (currentDateTime.getTime() > targetDateTime.getTime()) {
            return
        }
    }


    useEffect(() => {


        appointment.map(({ date, phone, time }) => {
            const times = time.slice(0, 5);
            const currentDateTime = new Date();

            switch (times) {
                case "09:00":
                    const targetDateTimeNine = new Date(`${date}T08:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetDateTimeNine)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
                case "10:00":
                    const targetDateTimeTen = new Date(`${date}T09:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetDateTimeTen)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
                case "11:00":
                    const targetTimeEleven = new Date(`${date}T10:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeEleven)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
                case "12:00":
                    const targetTimeTwelve = new Date(`${date}T11:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeTwelve)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    }
                    break;
                case "01:00":
                    const targetTimeOne = new Date(`${date}T12:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeOne)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
                case "02:00":
                    const targetTimeTwo = new Date(`${date}T13:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeTwo)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
                case "03:00":
                    const targetTimeThree = new Date(`${date}T14:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeThree)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break
                case "04:00":
                    const targetTimeFour = new Date(`${date}T15:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetTimeFour)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }

                    break;
                case "05:00":
                    const targetDateTimeFive = new Date(`${date}T16:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetDateTimeFive)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }

                    break;
                case "06:00":
                    const targetDateTimeSix = new Date(`${date}T17:00:00`)
                    if (isLessThan1Hour(currentDateTime, targetDateTimeSix)) {
                        SMSMutation({
                            variables: {
                                phoneNumber: phone
                            }
                        })
                    } else {
                        checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                    }
                    break;
            }

        })

    }, [ SMSMutation, appointment ])
    return (
        <div className={styles.container}>
            <Head>
                <title>Administrator</title>
            </Head>
            <h2 className={poppins.className}>Appointment</h2>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {tableList.map((name) => (
                                <th className={oxygen.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? "" : data.getAllAppointmentToday.map(({ appointmentID, time, patients, services, platform, link }: { appointmentID: any, time: string, patients: [], platform: string, services: string, link: string }) => (
                            patients.map(({ profile }: { profile: [] }) => (
                                profile.map(({ fullname }: { fullname: string }) => (
                                    <tr key={appointmentID}>
                                        <td className={oxygen.className}>{time}</td>
                                        <td className={oxygen.className}>{fullname}</td>
                                        <td className={oxygen.className}>{services}</td>
                                        <td className={oxygen.className}>
                                            {platform === "f2f" ? "Face-to-Face" : null}
                                            {platform === "online" ? <Link target="_blank" href={link}>Link</Link> : null}
                                        </td>
                                    </tr>
                                ))
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

(Administrator as PageWithLayout).layout = DashboardLayout
export default Administrator
