import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import Head from 'next/head'
import { BarElement, Chart as ChartJS, Legend, CategoryScale, LinearScale, Tooltip, PointElement, Title, ArcElement, LineElement, } from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, ArcElement, CategoryScale,
    BarElement,
    Legend)

import styles from '@/styles/admin/booking/reports/reports.module.scss'
import { gql, useQuery } from '@apollo/client'

const OnlineReports: FC = () => {

    const [ datValue, setDateValue ] = useState("Monthly")
    const { loading: loadingOnline, data: dataOnline } = useQuery(gql`query Query($dateFilter: String!, $platform: platform!) {
        getReportsByPlatform(dateFilter: $dateFilter, platform: $platform) {
          createdAt
          _all
        }
      }`, {
        variables: {
            dateFilter: datValue,
            platform: "online"
        }
    })

    const { loading: loadingF2F, data: dataF2f } = useQuery(gql`query Query($dateFilter: String!, $platform: platform!) {
        getReportsByPlatform(dateFilter: $dateFilter, platform: $platform) {
          createdAt
          _all
        }
      }`, {
        variables: {
            dateFilter: datValue,
            platform: "f2f"
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Online Reports</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <select onChange={(e) => setDateValue(e.target.value)}>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="SemiAnnually">Semi-Annually</option>
                <option value="Annually">Annually</option>
            </select>
            <div className={styles.chartsJS} >
                <Bar
                    data={{
                        datasets: [
                            {
                                label: "Online",
                                backgroundColor: "red",

                                data: loadingOnline ? "" : dataOnline.getReportsByPlatform.map(({ createdAt, _all }: { createdAt: any, _all: number }) => {
                                    return { x: createdAt, y: _all }
                                })
                            }, {
                                label: "Face-to-Face",
                                backgroundColor: "Blue",
                                data: loadingF2F ? "" : dataF2f.getReportsByPlatform.map(({ createdAt, _all }: { createdAt: any, _all: number }) => {
                                    return { x: createdAt, y: _all }
                                })
                            }
                        ]
                    }} />
            </div>
        </div>
    )
}


(OnlineReports as PageWithLayout).layout = DashboardLayout
export default OnlineReports