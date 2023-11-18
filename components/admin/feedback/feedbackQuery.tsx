import React, { useState } from 'react'
import { TbEye, TbTrash } from 'react-icons/tb'
import { format } from 'date-fns'
import { Oxygen } from 'next/font/google'
import { useRouter } from 'next/router'
import DeleteFeedback from './delete'
import styles from '@/styles/admin/feedback/review.module.scss'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function FeedbackQuery({ fullname, rating, date, feedbackID }: any) {

    const router = useRouter();

    const [ feedback, setFeedback ] = useState(false)

    const onHandleFeedbackDelete = () => {
        setFeedback(() => !feedback)
    }

    return (
        <tr>
            <td className={oxygen.className}>{format(new Date(date), "MMMM dd, yyyy hh:mm:sss")}</td>
            <td className={oxygen.className}>{fullname}</td>
            <td>
                {rating === 1 ? "⭐" : null}
                {rating === 2 ? "⭐⭐" : null}
                {rating === 3 ? "⭐⭐⭐" : null}
                {rating === 4 ? "⭐⭐⭐⭐" : null}
                {rating === 5 ? "⭐⭐⭐⭐⭐" : null}
            </td>
            <td>
                <button onClick={() => router.push(`/administrator/feedback/reviews/${feedbackID}`)} className={oxygen.className}>
                    <TbEye size={23} />
                </button>
                {
                    feedback ?
                        <div className={styles.overlay}>
                            <DeleteFeedback feedbackID={feedbackID} close={onHandleFeedbackDelete} />
                        </div> : null
                }
                <button onClick={onHandleFeedbackDelete}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
