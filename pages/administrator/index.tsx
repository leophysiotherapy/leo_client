import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'
import styles from '@/styles/admin/homepage.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { gql, useQuery, useMutation } from '@apollo/client'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
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

    const [ EmailNotificationMutaiton, { data: emailData } ] = useMutation(gql`mutation CreateEmailNotification($email: EmailAddress!) {
        createEmailNotification(email: $email)
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


        function isTargetTimeBefore10Mins(currentDateTime: Date, targetDateTime: Date) {
            const differenceInMilliseconds = targetDateTime.getTime() - currentDateTime.getTime();
            const time = differenceInMilliseconds <= 600000 && differenceInMilliseconds >= 0; // 600000 milliseconds is equal to 10 minutes
            if (time) {

            } else {
                return
            }
        }


        appointment.map(({ date, phone, time }) => {
            const times = time.slice(0, 5);
            const currentDateTime = new Date();

            switch (times) {
                case "09:00":
                    const targetDateTimeNine = new Date(`${date}T08:00:00`)
                    const interval =
                        setInterval(() => {

                            if (isLessThan1Hour(currentDateTime, targetDateTimeNine)) {
                                SMSMutation({
                                    variables: {
                                        phoneNumber: phone
                                    }
                                })
                            } else {
                                checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                            }


                            isTargetTimeBefore10Mins(currentDateTime, targetDateTimeNine);
                        }, 60000)


                    return () => clearInterval(interval)
                case "10:00":
                    const intervalTen = setInterval(() => { }, 60000)
                    return () => clearInterval(intervalTen)
                case "11:00":
                    const intervalElevel = setInterval(() => {
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
                        isTargetTimeBefore10Mins(currentDateTime, targetTimeEleven)
                    }, 60000)

                    return () => clearInterval(intervalElevel)
                    break;
                case "12:00":
                    const intervalTwelve = setInterval(() => {
                        const targetTimeTwelve = new Date(`${date}T11:00:00`)
                        if (isLessThan1Hour(currentDateTime, targetTimeTwelve)) {
                            SMSMutation({
                                variables: {
                                    phoneNumber: phone
                                }
                            })
                        }
                        isTargetTimeBefore10Mins(currentDateTime, targetTimeTwelve)
                    }, 60000)

                    return () => clearInterval(intervalTwelve)
                case "01:00":
                    const intervalOne = setInterval(() => {
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

                        isTargetTimeBefore10Mins(currentDateTime, targetTimeOne)
                    }, 60000)
                    return () => clearInterval(intervalOne)
                case "02:00":
                    const intervalTwo = setInterval(() => {
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
                        isTargetTimeBefore10Mins(currentDateTime, targetTimeTwo)
                    }, 60000)
                    return () => clearInterval(intervalTwo)
                case "03:00":
                    const intervalThree = setInterval(() => {
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
                        isTargetTimeBefore10Mins(currentDateTime, targetTimeThree)
                    }, 60000)

                    return () => clearInterval(intervalThree)
                case "04:00":
                    const intervalFour = setInterval(() => {
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
                        isTargetTimeBefore10Mins(currentDateTime, targetTimeFour)
                    }, 60000)
                    return () => clearInterval(intervalFour)
                case "05:00":
                    const intervalFive = setInterval(() => {
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

                        isTargetTimeBefore10Mins(currentDateTime, targetDateTimeFive)
                    }, 60000)

                    return () => clearInterval(intervalFive)
                case "06:00":
                    const intervalSix = setInterval(() => {

                        const targetDateTimeSix = new Date(`${date}T17:20:00`)

                        isTargetTimeBefore10Mins(currentDateTime, targetDateTimeSix)
                        if (isLessThan1Hour(currentDateTime, targetDateTimeSix)) {
                            SMSMutation({
                                variables: {
                                    phoneNumber: phone
                                }
                            })
                        } else {
                            checkIfTimeIsGreaterThan(currentDateTime, new Date(`${date}T${times}:00`))
                        }



                    }, 60000)
                    return () => clearInterval(intervalSix)
            }

        })

    }, [ EmailNotificationMutaiton, SMSMutation, appointment, emailData ])
    return (
        <div className={styles.container}>
            <Head>
                <title>Administrator</title>
            </Head>
            <div className={styles.todayDate}>
                <h2 className={poppins.className}>Today{"'"}s Appointments</h2>
                <span className={poppins.className}>{format(new Date(), "cccc, MMMM dd, yyyy")}</span>
            </div>
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
