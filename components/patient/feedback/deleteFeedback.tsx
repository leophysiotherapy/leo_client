import React, { SyntheticEvent } from 'react'
import styles from './deleteFeedback.module.scss'
import { Poppins } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteMyFeedback } from '@/util/feedback/feedback.mutation'
import { useRouter } from 'next/router'


const oxygen = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function DeleteFeedback({ feedbackID, close }: any) {

    const router = useRouter();

    const [ deleteMutation ] = useMutation(DeleteMyFeedback, {
        variables: {
            feedbackId: feedbackID
        },
        onCompleted: () => {
            router.reload()
        }
    })

    const onHandleFeedbacKDeleteForm = (e: SyntheticEvent) => {
        e.preventDefault();
        deleteMutation();
    }
    return (
        <div className={styles.container}>

            <form onSubmit={onHandleFeedbacKDeleteForm}>
                <span className={oxygen.className}>Do you want to delete this Feedback?</span>
                <div className={styles.add}>
                    <button onClick={close} type='button'>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
