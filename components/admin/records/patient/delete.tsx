import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteUsers } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'

const oxygen = Oxygen({
  weight: "400",
  subsets: [ "latin" ]
})

export default function UserDelete({ close, userID }: any) {

  const [ mutate ] = useMutation(DeleteUsers, {
    variables: {
      userId: userID
    },
    onCompleted: () => {
      alert("Successfully deleted")
    },
    refetchQueries: [ {
      query: GetAllPhysioUserByRole,
      variables: {
        role: "patient",
        take: 10,
        limit: 0
      }
    } ]
  })


  const onHandelUserDeleteForm = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate()

  }
  return (
    <div className={styles.container}>
      <form onSubmit={onHandelUserDeleteForm}>
        <span className={oxygen.className}>Do you want to delete this user?</span>
        <div className={styles.add}>
          <button className={styles.cancel} onClick={close} type="button">Cancel</button>
          <button className={styles.submit} type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
