import React, { FC } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'
import styles from '@/styles/admin/homepage.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { gql, useQuery } from '@apollo/client'
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

    const { loading, data } = useQuery(gql`query GetAllAppointmentToday {
        getAllAppointmentToday {
          appointmentID
          time
          platform
          services
          link
          patients {
            profile {
              fullname
            }
          }
        }
      }`)
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
                                            {platform === "online" ? <Link href={link}>Link</Link> : null}
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
