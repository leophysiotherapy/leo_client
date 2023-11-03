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
import { TbPlus } from 'react-icons/tb'
import CreateAddFeedback from '@/components/patient/feedback/addFeedback'
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
    const [ open, setOpen ] = useState(false)


    const onHandleCloseCreateFeedback = () => {
        setOpen(() => !open)
    }

    const [ selection, setSelections ] = useState("feedback")
    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
            </Head>
            {
                open ? < div className={styles.overlay}>
                    <CreateAddFeedback userID={userID} close={onHandleCloseCreateFeedback} />
                </div> : null
            }
            <div className={styles.forms}>
                <select onChange={(e) => setSelections(e.target.value)}>
                    <option value="feedback">Reviews</option>
                    <option value="form">Evaluation form</option>
                </select>
            </div>

            <div>
                <div className={styles.titleContainer}>
                    <h2 className={poppins.className}>Feedback</h2>
                </div>
                <div className={styles.addBtn}>
                    <button onClick={onHandleCloseCreateFeedback}> <TbPlus size={20} /> Create </button>
                </div>
                {selection === "feedback" ? <table>
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
                </table> : <div style={{ display: "flex", justifyContent: "center", alignContent: "center", border: "0" }}>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfZMcDctfaw0MQr08Bx8A53JedEa4vTvFmD8aRbzTWYhaSzEQ/viewform?embedded=true" width="640" height="1800" >Loading…</iframe>
                </div>}
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