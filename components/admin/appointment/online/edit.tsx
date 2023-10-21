import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { UpdateAppointmentSession } from '@/util/appointment/appointment.mutation'
import { gql, useMutation } from '@apollo/client'
import { getAllAppointByPlatform } from '@/util/appointment/appointment.query'
import { TimeValue } from '@/components/Book/calendar.config'
import { format } from 'date-fns'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const reasonAppointment = [
    {
        name: "Personal Emergency ", value: "Personal Emergency "
    },
    {
        name: "Illness", value: "Illness"
    },
    {
        name: "Weather Conditions", value: "Weather Conditions"
    },
    {
        name: "Transportation Issues ", value: "Transportation Issues "
    },
    {
        name: "Unexpected Clinic Closure", value: "Unexpected Clinic Closure"
    }
]

export default function EditAppointment({ appointmentID, close, link, date, fullname, status, time, platform }: any) {

    const [ edit, setEdit ] = useState({
        date: date,
        link: link,
        time: time,
        status: status,
        platform: platform
    })
    const [ reason, setReason ] = useState(false)
    const [ myReason, setMyReason ] = useState({
        reason: "",
        date: "",
        time: ""
    })
    const [ updateDateOnly ] = useMutation(gql`mutation UpdateDateAppointment($date: String!, $time: String!, $appointmentId: ID!) {
        updateDateAppointment(date: $date, time: $time, appointmentID: $appointmentId) {
          createdAt
          date
          link
          appointmentID
        }
      }`, {
        variables: {
            date: myReason.date,
            time: myReason.time,
            appointmentId: appointmentID
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
            {
                reason ? <div className={styles.overlay}>
                    <div className={styles.reason}>
                        <h2>Reason for Appointment</h2>
                        <select onChange={(e) => setMyReason({ ...myReason, reason: e.target.value })}>
                            <option value="-">-</option>
                            {reasonAppointment.map(({ name, value }) => (
                                <option key={name} value={value}>{name}</option>
                            ))}
                        </select>
                        <div className={styles.dateTime}>
                            <input type="date" onChange={(e) => setMyReason({ ...myReason, date: e.target.value })} />
                            <select onChange={(e) => setMyReason({ ...myReason, time: e.target.value })}>
                                <option value="-">-</option>
                                {TimeValue.map(({ name, start }) => (
                                    <option key={name} value={start}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.reasonBtnGrp}>
                            <button type="button" className={styles.cancel} onClick={close}>Cancel</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                updateDateOnly()
                            }} type="submit" className={styles.submit}>Submit</button>
                        </div>
                    </div>
                </div> : null
            }
            <h2 className={poppins.className}>Edit Appointment</h2>
            <form onSubmit={onHandleEditAppointment}>
                <div className={styles.formContainer}>
                    <input type="tex" value={fullname} disabled />
                    <select onChange={(e) => setEdit({ ...edit, platform: e.target.value })}>

                        <option value="online">Online</option>
                        <option value="f2f">Face-to-Face</option>
                    </select>

                </div>
                <div onClick={() => setReason(() => !reason)} className={styles.formContainer} >
                    <input type="text" value={edit.time} onChange={(e) => setEdit({ ...edit, time: e.target.value })} />
                    <div className={styles.dateReason}>
                        <span >
                            {edit.date}
                        </span>
                    </div>
                </div>
                <div className={styles.formContainer}>
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
