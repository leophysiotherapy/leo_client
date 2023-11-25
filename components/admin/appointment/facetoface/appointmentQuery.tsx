import React, { useState } from 'react'
import { Oxygen } from 'next/font/google'
import Link from 'next/link'
import { format } from 'date-fns'
import { TbEdit, TbEye, TbX } from 'react-icons/tb'
import styles from '@/styles/admin/booking/online.module.scss'
import DeleteAppointmentsId from './cancelAppointment'
import EditAppointment from './edit'
import { utcToZonedTime } from 'date-fns-tz'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function AppointmentQuery({ appointmentID, date, time, status, fullname, services }: any) {


    const [ deleteAppointment, setDeleteAppointment ] = useState(false)

    const [ editAppointment, setEditAppointment ] = useState(false)

    const onHandleCancelAppointment = () => {
        setDeleteAppointment(() => !deleteAppointment)
    }


    const onHandleEditAppointment = () => {
        setEditAppointment(() => !editAppointment)
    }
    return (
        <tr>
            <td className={oxygen.className}>{format(utcToZonedTime(date, "America/Los_Angeles"), "MM/dd/yyyy")} {time}</td>
            <td className={oxygen.className}>{fullname}</td>
            <td className={oxygen.className}>{services}</td>
            <td style={{ textTransform: "uppercase" }} className={oxygen.className}>{status}</td>
            <td className={oxygen.className}>
                <Link href={`/administrator/bookings/face-to-face/${appointmentID}`}>
                    <TbEye size={23} />
                </Link>
            </td>
            <td>
                {
                    deleteAppointment ? <div className={styles.overlay}>
                        <DeleteAppointmentsId appointmentID={appointmentID} close={onHandleCancelAppointment} />
                    </div> : null
                }
                {
                    editAppointment ?
                        <div className={styles.overlay}>
                            <EditAppointment appointmentID={appointmentID} close={onHandleEditAppointment} date={date} time={time} fullname={fullname} />
                        </div> : null
                }
                <button onClick={onHandleEditAppointment}>
                    <TbEdit size={23} />
                </button>
                <button onClick={onHandleCancelAppointment}>
                    <TbX size={23} />
                </button>
            </td>
        </tr >
    )
}
