import React, { SyntheticEvent, useState } from 'react'
import styles from './add.module.scss'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Oxygen } from 'next/font/google'
import { GetAllPrescription } from '@/util/prescription/prescription.query'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading...</p>
})
import 'react-quill/dist/quill.snow.css';


const ToolbarOptions = ['underline']

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function AddPrescriptions({ close }: any) {


    const [ prescriptions, setPrescriptions ] = useState({
        userID: "",

    })

    const [ prescription, setPrescription ] = useState("")
    const { loading, data } = useQuery(gql`query GetAllPhysioPatient {
        getAllPhysioPatient {
          userID
          email
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
                prescription: prescription
            }
        },
        onCompleted: () => {
            alert("Successfully Prescriptions Added")
            close()
            setPrescriptions({
                userID: "-",
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
                    {loading ? "" : data.getAllPhysioPatient.map(({ userID, email, profile }: any) => (
                        profile.map(({ fullname }: any) => (
                            <option key={userID} value={userID}>{fullname} ({email})</option>
                        ))
                    ))}
                </select>
                <ReactQuill value={prescription} onChange={setPrescription} style={{ width: "100%", height: "300px", margin: "10px 0" }}
                    modules={{
                        toolbar: ToolbarOptions
                    }}
                />
                <div className={styles.btnGrp}>
                    <button className={styles.cancel} type="button" onClick={close}>Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
