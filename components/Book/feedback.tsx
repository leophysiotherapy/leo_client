import React, { useState, useEffect, SyntheticEvent } from 'react'
import styles from '@/styles/patient/feedback.module.scss'
import Head from 'next/head'
import { Poppins, Oxygen } from 'next/font/google'
import { TbStar } from 'react-icons/tb'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/client'
import { CreateMyFeedback } from '@/util/feedback/feedback.mutation'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function Feedback({ appointmentID, close }: any) {




    const [ feed, setFeedback ] = useState({
        rating: 0,
        comment: ""
    })

    const [ userid, setUserId ] = useState("")


    useEffect(() => {
        const cook = Cookies.get("physio_token") as any;
        if (cook) {
            const { userID }: any = jwtDecode(cook)
            setUserId(userID)
        }
    }, [])


    const [ mutate ] = useMutation(CreateMyFeedback, {
        variables: {
            feedback: feed.comment,
            rating: feed.rating,
            appointmentId: appointmentID,
            userId: userid
        },
        errorPolicy: "all",
        onCompleted: () => {
            alert("Successfully Feedback Created");
            close()

        }
    })


    const onHandleFeedbackForm = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
            </Head>
            <h2 className={poppins.className}>Create Review</h2>
            <form onSubmit={onHandleFeedbackForm}>
                <div className={styles.ratings}>
                    <h2 className={poppins.className}>Rate your experience</h2>
                    <div className={styles.stars}>
                        <select onChange={(e) => setFeedback({ ...feed, rating: parseInt(e.currentTarget.value) })}>
                            <option value={1}>⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>

                </div>
                <div className={styles.comments}>
                    <h2 className={poppins.className}>Comment</h2>
                    <textarea onChange={(e) => setFeedback({ ...feed, comment: e.target.value })} className={oxygen.className} placeholder='Type your comment here...' />
                </div>
                <div className={styles.btns}>
                    <button type="submit">Submit</button>
                    <button onClick={close} type="button" className={styles.cancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
