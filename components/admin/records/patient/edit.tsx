import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { UpdateOldPatient } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function PatientAdd({ close, userID, firstname, lastname, phone, prescription, diagnosis }: any) {




    const [ mutate ] = useMutation(UpdateOldPatient)

    const [ patient, setAddPatient ] = useState({
        firstname: firstname,
        lastname: lastname,
        contact: phone,
        diagnosis: "",
        prescription: ""
    })

    const onHandleStaffForm = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate({
            variables: {
                userId: userID,
                diagnosis: patient.diagnosis,
                prescription: patient.prescription,
                user: {
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    phone: patient.contact
                }
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Patient Updated")
                setAddPatient({
                    firstname,
                    lastname,
                    contact: phone,
                    diagnosis: diagnosis[ 0 ].diagnosis,
                    prescription: prescription[ 0 ].prescription
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
                        <input type="text" value={patient.contact} placeholder='Contact'
                            onChange={(e) => setAddPatient({ ...patient, contact: e.target.value })} />

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
