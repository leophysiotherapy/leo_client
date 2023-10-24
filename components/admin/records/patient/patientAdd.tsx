import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from './add.module.scss'
import { Poppins } from 'next/font/google'
import { CreateOldPatient } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'
import { TimeValue } from '@/components/Book/calendar.config'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function PatientAdd({ close }: any) {




    const [ mutate ] = useMutation(CreateOldPatient)


    const [ platform, setPlatform ] = useState("")
    const [ patient, setAddPatient ] = useState({
        firstname: "",
        lastname: "",
        contact: "",
        email: "",
        diagnosis: "",
        prescription: "",
        time: "",
        date: "",
        platform: ""
    })

    const onHandleStaffForm = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate({
            variables: {
                user: {
                    email: patient.email,
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    phone: patient.contact
                },
                time: patient.time,
                date: patient.date,
                platform: patient.platform,
                prescription: patient.prescription,
                diagnosis: patient.diagnosis
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Patient Added")
                setAddPatient({
                    firstname: "",
                    lastname: "",
                    contact: "",
                    email: "",
                    diagnosis: "",
                    prescription: "",
                    date: "",
                    platform: "",
                    time: ""
                })
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
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Add Patient</h2>
            <form onSubmit={onHandleStaffForm}>
                <div className={styles.divider}>
                    <div className={styles.patient}>
                        <input type="text" value={patient.firstname} placeholder='Firstname' onChange={(e) => setAddPatient({ ...patient, firstname: e.target.value })} />
                        <input type="text" value={patient.lastname} placeholder='Lastname'
                            onChange={(e) => setAddPatient({ ...patient, lastname: e.target.value })} />
                        <input type="text" value={patient.email} placeholder='Email' onChange={(e) => setAddPatient({ ...patient, email: e.target.value })} />
                        <input type="text" value={patient.contact} placeholder='Contact'
                            onChange={(e) => setAddPatient({ ...patient, contact: e.target.value })} />
                        <div className={styles.platform}>
                            <div>
                                <input type="radio"
                                    checked={patient.platform === "online" ? true : false}
                                    value="online" onChange={(e) => {
                                        setAddPatient({ ...patient, platform: e.target.value })
                                    }} />
                                <label>Online</label>
                            </div>
                            <div>
                                <input type="radio"
                                    checked={patient.platform === "f2f" ? true : false}
                                    value="f2f" onChange={(e) => {
                                        setAddPatient({ ...patient, platform: e.target.value })
                                    }} />
                                <label>Face-to-Face</label>
                            </div>
                        </div>
                        <div className={styles.appointment}>
                            <input type='date' value={patient.date} onChange={(e) => setAddPatient({ ...patient, date: e.target.value })} />
                            <select onChange={(e) => setAddPatient({ ...patient, time: e.target.value })}>
                                <option>-</option>
                                {TimeValue.map(({ name, start }) => (
                                    <option key={name} value={start}>{name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className={styles.ss}>
                        <div>
                            <textarea placeholder='Diagnosis' value={patient.diagnosis} onChange={(e) => setAddPatient({ ...patient, diagnosis: e.target.value })} />
                        </div>
                        <div>
                            <textarea placeholder='Prescriptions' value={patient.prescription} onChange={(e) => setAddPatient({ ...patient, prescription: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className={styles.formBtnGrp}>
                    <button onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
