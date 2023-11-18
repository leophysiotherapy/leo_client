import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteMyFeedback } from '@/util/feedback/feedback.mutation'
import { GetAllFeedbackQuery } from '@/util/feedback/feedback.query'

const oxygen = Oxygen({
  weight: "400",
  subsets: [ "latin" ]
})

export default function UserDelete({ close, feedbackID }: any) {

  const [ mutate ] = useMutation(DeleteMyFeedback, {
    variables: {
      feedbackId: feedbackID
    },
    onCompleted: () => {
      alert("Successfully deleted")
      close()
    },
    refetchQueries: [ GetAllFeedbackQuery ]
  })


  const onHandelUserDeleteForm = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate()

  }
  return (
    <div className={styles.container}>
      <form onSubmit={onHandelUserDeleteForm}>
        <span className={oxygen.className}>Do you want to delete this review?</span>
        <div className={styles.add}>
          <button className={styles.cancel} onClick={close} type="button">Cancel</button>
          <button className={styles.submit} type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
