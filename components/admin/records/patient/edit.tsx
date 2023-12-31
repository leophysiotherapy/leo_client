import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { UpdateOldPatient } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'
import { TimeValue } from '@/components/Book/calendar.config'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function PatientAdd({ close, userID, firstname, lastname, phone, diagnosis, email }: any) {

    const [ mutate ] = useMutation(UpdateOldPatient)

    const [ patient, setAddPatient ] = useState({
        firstname: firstname,
        lastname: lastname,
        contact: phone,
        email: email,
        diagnosis: diagnosis[ 0 ].diagnosis,

    })

    const onHandleStaffForm = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate({
            variables: {
                userId: userID,
                diagnosis: patient.diagnosis,
                user: {
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    phone: patient.contact,
                    email: patient.email
                }
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Patient Updated")
                setAddPatient({
                    firstname,
                    lastname,
                    contact: phone,
                    email,
                    diagnosis: diagnosis[ 0 ].diagnosis,
                })
            },
            onError: (e) => {
                alert(e.message)
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
            <h2 className={poppins.className}>Edit Patient</h2>
            <form onSubmit={onHandleStaffForm}>
                <div className={styles.divider}>
                    <div className={styles.patient}>
                        <input type="text" value={patient.firstname} placeholder='Firstname' onChange={(e) => setAddPatient({ ...patient, firstname: e.target.value })} />
                        <input type="text" value={patient.lastname} placeholder='Lastname'
                            onChange={(e) => setAddPatient({ ...patient, lastname: e.target.value })} />
                        <input type="text" value={patient.email} placeholder='Email' onChange={(e) => setAddPatient({ ...patient, email: e.target.value })} />
                        <input type="text" value={patient.contact} placeholder='Contact'
                            onChange={(e) => setAddPatient({ ...patient, contact: e.target.value })} />
                        {/* <div className={styles.platform}>
                            <div>
                                {of2f.map(({ name, value }) => (
                                    <>
                                        <input disabled key={name} type="radio" value={value} onChange={(e) => {
                                            setPatientPlatform(e.target.value)
                                        }}
                                            checked={value === patientPlatform ? true : false} />
                                        <label>{name}</label>
                                    </>
                                ))}

                            </div>
                        </div> */}
                        {/* <div className={styles.appointment}>
                            <input disabled type='date' onChange={(e) => setAddPatient({ ...patient, date: e.target.value })} />
                            <select disabled value={patient.time} onChange={(e) => setAddPatient({ ...patient, time: e.target.value })}>
                                {TimeValue.map(({ name, start }) => (
                                    <option key={name} value={start}>{name}</option>
                                ))}
                            </select>
                        </div> */}
                    </div>

                    <div className={styles.ss}>
                        <div>
                            <textarea placeholder='Diagnosis' value={patient.diagnosis} onChange={(e) => setAddPatient({ ...patient, diagnosis: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className={styles.formBtnGrp}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
