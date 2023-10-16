import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { UpdateAppointmentSession } from '@/util/appointment/appointment.mutation'
import { useMutation } from '@apollo/client'
import { getAllAppointByPlatform } from '@/util/appointment/appointment.query'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function EditAppointment({ appointmentID, close, link, date, fullname, status, time, platform }: any) {

    const [ edit, setEdit ] = useState({
        date: date,
        link: link,
        time: time,
        status: status,
        platform: platform
    })

    const [ UpdateSession ] = useMutation(UpdateAppointmentSession, {
        variables: {
            appointmentId: appointmentID,
            appointment: {
                time: edit.time,
                date: edit.date
            },
            platform: edit.platform,
            link: edit.link,
            status: edit.status
        },
        onCompleted: () => {
            alert("Successfully Session Update")
        },
        refetchQueries: [ {
            query: getAllAppointByPlatform,
            variables: {
                platform: "onlline"
            }
        } ]
    })

    const onHandleEditAppointment = (e: SyntheticEvent) => {
        e.preventDefault();
        UpdateSession()
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Edit Appointment</h2>
            <form onSubmit={onHandleEditAppointment}>
                <div>
                    <input type="tex" value={fullname} disabled />
                    <select onChange={(e) => setEdit({ ...edit, platform: e.target.value })}>

                        <option value="online">Online</option>
                        <option value="f2f">Face-to-Face</option>
                    </select>

                </div>
                <div >
                    <input type="text" value={edit.time} onChange={(e) => setEdit({ ...edit, time: e.target.value })} />
                    <input type="date" value={edit.date} onChange={(e) => setEdit({ ...edit, date: e.target.value })} />
                </div>
                <div>
                    <input type="url" value={edit.link} placeholder='Link' onChange={(e) => setEdit({ ...edit, link: e.target.value })}
                    />
                    <select onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
                        <option value="upcoming">Upcoming</option>
                        <option value="done">Done</option>
                        <option value="finished">Finished</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div className={styles.formBtnGrp}>
                    <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
                    <button type="submit" className={styles.submit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
