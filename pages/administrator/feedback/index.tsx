import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import styles from '@/styles/admin/feedback/review.module.scss'
import { GetAllFeedbackQuery, GetSearchFeedback } from '@/util/feedback/feedback.query'
import { Poppins, Oxygen } from 'next/font/google'
import { useLazyQuery, useQuery } from '@apollo/client'
import Head from 'next/head'
import FeedbackQuery from '@/components/admin/feedback/feedbackQuery'

const headerTable = [ "DateTime", "Name", "Ratings", "Actions" ]


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const Reviews: FC = () => {
    const { loading, data } = useQuery(GetAllFeedbackQuery)

    const [ search, setSearch ] = useState("")

    const [ searchFeedback, { data: searchData } ] = useLazyQuery(GetSearchFeedback, {
        variables: {
            search
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Feedback</h2>
            <div className={styles.filter}>

                <div className={styles.filterEntries}>

                    <div className={styles.filterSearch}>
                        <span className={oxygen.className}>Search:</span>
                        <input type="search" onChange={(e) => {
                            searchFeedback()
                            setSearch(e.target.value)
                        }

                        } />
                    </div>

                </div>
            </div>
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
                        {search ? searchData?.getSearchFeedback.map(({ rating, feedbackID, feedback, creatdAt, users }: any) => (
                            users.map(({ profile }: any) => (
                                profile.map(({ fullname }: any) => (
                                    <FeedbackQuery key={feedbackID} feedbackID={feedbackID} feedback={feedback} rating={rating} date={creatdAt} fullname={fullname} />
                                ))
                            ))
                        )) : loading ? <tr>
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