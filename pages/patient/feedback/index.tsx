import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import { Oxygen, Poppins } from 'next/font/google'
import Head from 'next/head'
import styles from '@/styles/patient/feedback/feedback.module.scss'
import { GetServerSidePropsContext } from 'next'
import jwtDecode from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { FeedbackQueryByUser } from '@/util/feedback/feedback.query'
import FeedbackQuery from '@/components/patient/feedbackQuery'
const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const feedHead = [ "Date & Time", "Ratings", "Actions" ]
const Feedback: FC = ({ userID }: any) => {


    const { loading, data } = useQuery(FeedbackQueryByUser, {
        variables: {
            userId: userID
        }
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>

            <div>
                <div className={styles.titleContainer}>
                    <h2 className={poppins.className}>Feedback</h2>
                </div>

                <table>
                    <thead>
                        <tr>
                            {feedHead.map((name) => (

                                <th className={poppins.className} key={name}>{name}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>Loading...</td>
                        </tr> : data.getAllFeedbackByUserId.map(({ feedbackID, rating, creatdAt }: any) => (
                            <FeedbackQuery key={feedbackID} feedbackID={feedbackID} rating={rating} createdAt={creatdAt} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
(Feedback as PageWithLayout).layout = MainLayout
export default Feedback

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userID: userID
        }
    }
}