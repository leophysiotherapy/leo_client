import React from 'react'
import { Oxygen } from 'next/font/google'
import { TbTrash, TbEdit, TbEye } from 'react-icons/tb'
import { useState } from 'react'
import styles from '@/styles/admin/records/patient.module.scss'
import UserDelete from './delete'
import UserEdit from './edit'
import Link from 'next/link'
import { format } from 'date-fns'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function PatientQuery({ userID, firstname, lastname, phone, appointment, prescription, diagnosis, email }: {
    userID: string, firstname: string, lastname: string, phone: string, appointment: [], prescription: [], diagnosis: [], email: string
}) {


    const [ staffDelete, setStaffDelete ] = useState(false)
    const [ staffEdit, setStaffEdit ] = useState(false)


    const onHandeleStaffDelete = () => {
        setStaffDelete(() => !staffDelete)
    }

    const onHandleStaffEdit = () => {
        setStaffEdit(() => !staffEdit)
    }
    return (
        <tr key={userID}>
            <td className={oxygen.className}>{firstname} {lastname}</td>
            {appointment.length === 0 ? <td className={oxygen.className}>N/A</td> : appointment.map(({ date, time }: any, i) => (
                i === 0 ? <td key={date} className={oxygen.className}>{format(new Date(date), "MMMM dd, yyyy")}{" "}{time}</td> : null
            ))}
            {prescription.length === 0 ? <td>N/A</td> :
                prescription.map(({ prescriptionID, prescription: pre }: any, i) => (
                    i === 0 ?
                        <td className={oxygen.className} key={prescriptionID}><Link href={`/administrator/records/patient/prescription/${prescriptionID}`}>
                            <TbEye size={23} /></Link></td> : null
                ))}
            {
                diagnosis.length === 0 ? <td>N/A</td> :
                    diagnosis.map(({ diagnosisID, diagnosis: dia }: any, i) => (
                        i === 0 ? dia === "" ? <td>N/A</td> : <td key={diagnosisID} className={oxygen.className}><Link href={`/administrator/records/patient/diagnosis/${diagnosisID}`}>
                            <TbEye size={23} /></Link></td> : null
                    ))
            }
            <td className={oxygen.className}>
                {phone}
            </td>

            <td>
                {
                    staffDelete ? <div className={styles.overlay}>
                        <UserDelete close={onHandeleStaffDelete} userID={userID} />
                    </div> : null
                }
                {
                    staffEdit ? <div className={styles.overlay}>
                        <UserEdit close={onHandleStaffEdit} userID={userID} firstname={firstname} lastname={lastname} phone={phone} prescription={prescription} diagnosis={diagnosis} appointment={appointment} email={email} />
                    </div> : null
                }
                <button onClick={() => setStaffEdit(() => !staffEdit)}>
                    <TbEdit size={23} />
                </button>
                <button onClick={() => setStaffDelete(() => !staffDelete)}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr >
    )
}
