import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from './add.module.scss'
import { Poppins } from 'next/font/google'
import { CreateOldPatient } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function PatientAdd({ close }: any) {




    const [ mutate ] = useMutation(CreateOldPatient)

    const [ patient, setAddPatient ] = useState({
        firstname: "",
        lastname: "",
        contact: "",
        email: "",
        diagnosis: "",
        prescription: ""
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
                    prescription: ""
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
