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
import MainLayout from '@/layout/main.layout'


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
                {feed.map(({ feedback, rating, feedbackID, users, creatdAt, question1, question2, question3, question4, question5, question6, question7, question8, therapistName, date, time }: any) => (
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
                                <div className={styles.qqq}>
                                    <h2 className={poppins.className}>Therapist Name: {therapistName}</h2>
                                </div>
                                <div className={styles.qqq}>
                                    <span className={oxygen.className}>Date: {format(new Date(date), "MMMM dd, yyyy")}</span>
                                    <span className={oxygen.className}>Time: {time}</span>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>Booking an appointment was easy and convenient.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question1}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>My therapist was punctual for my appointments</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question2}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>My therapist explained my condition and treatment plan clearly.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question3}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>The treatment sessions were practical in addressing my concerns.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question4}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>I noticed an improvement in my physical abilities after the session.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question5}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>The session contributed to my overall rehabilitation.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question6}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>My therapist helped me set achievable goals for my rehabilitation.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question7}</span>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <h2 className={oxygen.className}>My privacy was maintained during treatment.</h2>
                                    <div className={styles.onRadio}>
                                        <span className={oxygen.className}>Answer: {question8}</span>
                                    </div>
                                </div>
                                <span className={`${styles.comment} ${poppins.className}`}>Comment</span>
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
            <button onClick={() => router.push("/patient/feedback/")}>
                <span className={poppins.className}>Back to Reviews Page</span>
            </button>
        </div >
    )
}

(FeedbackID as PageWithLayout).layout = MainLayout
export default FeedbackID