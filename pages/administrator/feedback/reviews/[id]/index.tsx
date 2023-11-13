import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import { GetAllFeedbackById, GetAllFeedbackQuery } from '@/util/feedback/feedback.query'
import { useRouter } from 'next/router'
import { client } from '@/lib/apolloWrapper'
import { GetStaticPropsContext } from 'next'
import styles from '@/styles/admin/feedback/feedbackid.module.scss'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import { format } from 'date-fns'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export const getStaticPaths = async () => {

    const { data: { getAllFeedback } } = await client.query({
        query: GetAllFeedbackQuery
    })



    const paths = getAllFeedback.map(({ feedbackID }: any) => {
        return { params: { id: feedbackID } }
    })

    return {
        paths, fallback: true
    }
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    const feedId = context.params?.id
    const { data: { getFeedbackById } } = await client.query({
        query: GetAllFeedbackById,
        variables: {
            feedbackId: feedId
        }
    })
    return {
        props: {
            feed: getFeedbackById
        }
    }
}

const FeedbackID: FC = ({ feed }: any) => {

    const router = useRouter()

    if (router.isFallback) {
        return (<p>Loading...</p>)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.feedbackContainer}>
                {feed.map(({ feedback, rating, feedbackID, users, creatdAt }: any) => (
                    users.map(({ profile }: any) => (
                        profile.map(({ fullname }: any) => (
                            <div className={styles.card} key={feedbackID}>
                                <div className={styles.header}>
                                    <h2 className={poppins.className}>{fullname}</h2>
                                    <span>
                                        {rating === 1 ? "⭐" : null}
                                        {rating === 2 ? "⭐⭐" : null}
                                        {rating === 3 ? "⭐⭐⭐" : null}
                                        {rating === 4 ? "⭐⭐⭐⭐" : null}
                                        {rating === 5 ? "⭐⭐⭐⭐⭐" : null}
                                    </span>
                                </div>
                                <div className={styles.body}>
                                    <p className={oxygen.className}>{feedback}</p>
                                    <div className={styles.date}>
                                        <span className={oxygen.className}>{format(new Date(creatdAt), "MMMM dd,yyyy hh:mm:ss")}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                ))}
            </div>
            <button onClick={() => router.push("/administrator/feedback/reviews")}>
                <span className={poppins.className}>Back to Reviews</span>
            </button>
        </div>
    )
}

(FeedbackID as PageWithLayout).layout = DashboardLayout
export default FeedbackID