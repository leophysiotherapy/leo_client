import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'
import styles from '@/styles/admin/homepage.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { gql, useQuery, useMutation } from '@apollo/client'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { differenceInMinutes, parse, isBefore } from 'date-fns'
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


        const currentTime = new Date()
        appointment.map(({ date, phone, time }: any) => {

            const newTime = time.slice(0, 5);


            switch (newTime) {
                case "09:00":
                    
                    break;
                case "10:00":
                    console.log(new Date(`${date}T09:00:00`))
                    break;
                case "11:00":
                    const targetTimeString = `${date}T00:00:00`;
                    const targetTime = parseISO(targetTimeString)
                    console.log(format(utcToZonedTime(targetTime, "America/Los_Angeles"), "yyyy-MM-dd hh:mm:ss aa"))
                    break;
                case "01:00":
                    console.log(new Date(`${date}T12:00:00`))
                    break;
                case "02:00":
                    console.log(new Date(`${date}T01:00:00`))
                    break;
                case "03:00":
                    console.log(new Date(`${date}T$02:00:00`))
                    break;
                case "04:00":
                    console.log(format(utcToZonedTime(new Date(`${date}T03:00`), "Amerirca/Timezone"), "MMM dd, yyyy"))
                    break;
                case "05:00":
                    console.log(format(utcToZonedTime(new Date(`${date}T04:00`), "Amerirca/Timezone"), "MMM dd, yyyy"))
                    break;
                case "06:00":
                    console.log(format(utcToZonedTime(new Date(`${date}T05:00`), "Amerirca/Timezone"), "MMM dd, yyyy"))
                    break;
            }


        })

    }, [ EmailNotificationMutaiton, SMSMutation, appointment, emailData ])


    const zonedTime = utcToZonedTime(new Date(Date.now()), "America/Los_Angeles")
    return (
        <div className={styles.container}>
            <Head>
                <title>Administrator</title>
            </Head>
            <div className={styles.todayDate}>
                <h2 className={poppins.className}>Today{"'"}s Appointments</h2>
                <span className={poppins.className}>{format(zonedTime, "cccc MMMM dd, yyyy")}</span>
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
