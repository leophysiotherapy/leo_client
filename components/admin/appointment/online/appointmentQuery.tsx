import React, { useState } from 'react'
import { Oxygen } from 'next/font/google'
import Link from 'next/link'
import { format } from 'date-fns'
import { TbEdit, TbEye, TbX } from 'react-icons/tb'
import DeleteAppointmentsId from './cancelAppointment'
import styles from '@/styles/admin/booking/online.module.scss'
import EditAppointment from './edit'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function AppointmentQuery({ appointmentID, date, link, time, status, fullname, platform }: any) {


    const [ deleteAppointment, setDeleteAppointment ] = useState(false)
    const [ editAppointment, setEditAppointment ] = useState(false)

    const onHandleDeleteApppointment = () => {
        setDeleteAppointment(() => !deleteAppointment)
    }

    const onHandleEditAppointment = () => {
        setEditAppointment(() => !editAppointment)
    }

    return (
        <tr>
            <td className={oxygen.className}>{format(new Date(date), "MM/dd/yyyy")} {time}</td>
            <td className={oxygen.className}>{fullname}</td>
            <td className={oxygen.className}>{link === null || link === "" ? "N/A" : <Link target='_blank' href={link}>Link</Link>}</td>
            <td style={{ textTransform: "uppercase" }} className={oxygen.className}>{status}</td>
            <td className={oxygen.className}>
                <Link href={`/administrator/bookings/online/${appointmentID}`}>
                    <TbEye size={23} />
                </Link>
            </td>
            <td>
                {
                    deleteAppointment ? <div className={styles.overlay}>
                        <DeleteAppointmentsId appointmentID={appointmentID} close={onHandleDeleteApppointment} />
                    </div> : null
                }
                {
                    editAppointment ? <div className={styles.overlay}>
                        <EditAppointment appointmentID={appointmentID} close={onHandleEditAppointment} date={date} link={link} fullname={fullname} status={status} time={time} platform={platform} />
                    </div> : null
                }
                <button onClick={onHandleEditAppointment}>
                    <TbEdit size={23} />
                </button>
                <button onClick={onHandleDeleteApppointment}>
                    <TbX size={23} />
                </button>
            </td>
        </tr >
    )
}
