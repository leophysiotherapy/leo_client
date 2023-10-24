import React, { SyntheticEvent, useState } from 'react'
import styles from './add.module.scss'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Oxygen } from 'next/font/google'
import { GetAllPrescription } from '@/util/prescription/prescription.query'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function AddPrescriptions({ close }: any) {


    const [ prescriptions, setPrescriptions ] = useState({
        userID: "",
        prescriptions: ""
    })

    const { loading, data } = useQuery(gql`query GetAllPhysioPatient {
        getAllPhysioPatient {
          userID
          profile {
            fullname
          }
        }
      }`)



    const [ mutate ] = useMutation(gql`mutation CreatePatientPrescription($userId: ID!, $prescription: prescriptionInput!) {
        createPatientPrescription(userID: $userId, prescription: $prescription) {
          prescription
        }
      }`, {
        variables: {
            userId: prescriptions.userID,
            prescription: {
                prescription: prescriptions.prescriptions
            }
        },
        onCompleted: () => {
            alert("Successfully Prescriptions Added")
            setPrescriptions({
                userID: "-",
                prescriptions: ""
            })
        },
        refetchQueries: [ GetAllPrescription ]
    })


    const onHandleSubmitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate();
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleSubmitForm}>
                <h2 className={oxygen.className}>Add Prescriptions</h2>
                <select onChange={(e) => setPrescriptions({ ...prescriptions, userID: e.target.value })}>
                    <option value="-">-</option>
                    {loading ? "" : data.getAllPhysioPatient.map(({ userID, profile }: any) => (
                        profile.map(({ fullname }: any) => (
                            <option key={userID} value={userID}>{fullname}</option>
                        ))
                    ))}
                </select>
                <textarea onChange={(e) => setPrescriptions({ ...prescriptions, prescriptions: e.target.value })} />
                <div className={styles.btnGrp}>
                    <button className={styles.cancel} type="button" onClick={close}>Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
