import React, { SyntheticEvent, useState } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { gql, useMutation } from '@apollo/client'
import { getAllAppointByPlatform } from '@/util/appointment/appointment.query'


const oxygen = Oxygen({
  weight: "400",
  subsets: [ "latin" ]
})

const ReasonForCancellaiton = [
  {
    name: "Personal Emergency", value: "Personal Emergency",
  },
  {
    name: "Illness", value: "Illness",
  },
  {
    name: "Weather Conditions ", value: "Weather Conditions ",
  },
  {
    name: "Transportation Issues", value: "Transportation Issues"
  },
  {
    name: "Unexpected Clinic Closure", value: " Unexpected Clinic Closure",
  },
  {
    name: "Legal Issues", value: "Legal Issues"
  }
]

export default function DeleteAppointmentsId({ close, appointmentID }: any) {


  const [ cancellation, setCancellation ] = useState("")

  const [ mutate ] = useMutation(gql`mutation CancelAdminAppointment($reason: String!, $appointmentId: ID!) {
    cancelAdminAppointment(reason: $reason, appointmentID: $appointmentId) {
      link
      date
    }
  }`, {
    variables: {
      reason: cancellation,
      appointmentId: appointmentID
    },
    onCompleted: () => {
      alert("Successfully Updated")
    },
    refetchQueries: [ {
      query: getAllAppointByPlatform,
      variables: {
        platform: "online",

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
        <h2 className={oxygen.className}>Reason for Cancellation</h2>
        <select onChange={(e) => setCancellation(() => e.target.value)}>
          <option value="-">-</option>
          {ReasonForCancellaiton.map(({ name, value }) => (
            <option key={name} value={value}>{name}</option>
          ))}
        </select>
        <div className={styles.add}>
          <button className={styles.cancel} onClick={close} type="button">Cancel</button>
          <button className={styles.submit} type="submit">Submit</button>
        </div>
      </form>
    </div >
  )
}
