import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteAppointment } from '@/util/appointment/appointment.mutation'
import { getAllAppointByPlatform } from '@/util/appointment/appointment.query'
const oxygen = Oxygen({
  weight: "400",
  subsets: [ "latin" ]
})

export default function DeleteAppointmentsId({ close, appointmentID }: any) {

  const [ mutate ] = useMutation(DeleteAppointment, {
    variables: {
      appointmentId: appointmentID
    },
    onCompleted: () => {
      alert("Successfully deleted")
    },
    update: (cache, { data }) => {
      const { getAppointmentByplatform }: any = cache.readQuery({
        query: getAllAppointByPlatform,
        variables: {
          platform: "f2f"
        },
      })

      cache.writeQuery({
        query: getAllAppointByPlatform,
        variables: {
          platform: "f2f"
        },
        data: {
          getAppointmentByplatform: getAppointmentByplatform.filter((appointment: any) => appointment.appointmentID !== data.deleteAppointment.appointmentID)
        }
      })
    },
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
