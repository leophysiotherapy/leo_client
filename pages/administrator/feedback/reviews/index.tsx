import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import styles from '@/styles/admin/feedback/review.module.scss'
import { GetAllFeedbackQuery } from '@/util/feedback/feedback.query'
import { Poppins } from 'next/font/google'
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import FeedbackQuery from '@/components/admin/feedback/feedbackQuery'


const headerTable = [ "DateTime", "Name", "Ratings", "Actions" ]


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const Reviews: FC = () => {
    const { loading, data } = useQuery(GetAllFeedbackQuery)
    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Reviews</h2>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {headerTable.map((name) => (

                                <th className={poppins.className} key={name}>{name}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> :
                            data.getAllFeedback.map(({ rating, feedbackID, feedback, creatdAt, users }: any) => (
                                users.map(({ profile }: any) => (
                                    profile.map(({ fullname }: any) => (
                                        <FeedbackQuery key={feedbackID} feedbackID={feedbackID} feedback={feedback} rating={rating} date={creatdAt} fullname={fullname} />
                                    ))
                                ))
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


(Reviews as PageWithLayout).layout = DashboardLayout
export default Reviews