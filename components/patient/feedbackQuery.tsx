import React, { useState } from 'react'
import { Oxygen } from 'next/font/google'
import { format } from 'date-fns'
import Link from 'next/link'
import styles from '@/styles/patient/feedback/feedback.module.scss'
import { TbEye, TbTrash } from 'react-icons/tb'
import DeleteFeedback from './feedback/deleteFeedback'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function FeedbackQuery({ feedbackID, createdAt, rating }: any) {

    const [ feedback, setFeedback ] = useState(false)

    const onHandleCloseFeedbackDelete = () => {
        setFeedback(() => !feedback)
    }
    return (
        <tr key={feedbackID}>
            <td className={oxygen.className}>{format(new Date(createdAt), "MMMM dd, yyyy hh:mm:ss")}</td>
            <td>
                {rating === 1 ? "⭐" : null}
                {rating === 2 ? "⭐⭐" : null}
                {rating === 3 ? "⭐⭐⭐" : null}
                {rating === 4 ? "⭐⭐⭐⭐" : null}
                {rating === 5 ? "⭐⭐⭐⭐⭐" : null}
            </td>
            <td className={styles.actions}>
                <Link href={`/patient/feedback/${feedbackID}`}>
                    <TbEye size={20} />
                </Link>
                {
                    feedback ? <div className={styles.overlay}>
                        <DeleteFeedback feedbackID={feedbackID} close={onHandleCloseFeedbackDelete} />
                    </div> : null
                }
                <button className={styles.btnTrash} onClick={() => setFeedback(() => !feedback)}>
                    <TbTrash size={20} />
                </button>
            </td>
        </tr>
    )
}
