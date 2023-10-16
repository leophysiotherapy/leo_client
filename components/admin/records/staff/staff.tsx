import React from 'react'
import { Oxygen } from 'next/font/google'
import { TbPlus, TbTrash, TbEdit } from 'react-icons/tb'
import { useState } from 'react'
import styles from '@/styles/admin/records/staff.module.scss'
import UserDelete from './delete'
import UserEdit from './edit'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function StaffQuery({ userID, firstname, lastname, designation, expertise, phone, emergencyPhone, avatar }: {
    userID: string, firstname: string, lastname: string, designation: string, expertise: string, phone: string, emergencyPhone: string, avatar: string
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
            <td className={oxygen.className}>{designation}</td>
            <td className={oxygen.className}>{expertise}</td>
            <td className={oxygen.className}>
                {phone}
            </td>
            <td className={oxygen.className}>
                {emergencyPhone}
            </td>
            <td>
                {
                    staffDelete ? <div className={styles.overlay}>
                        <UserDelete close={onHandeleStaffDelete} userID={userID} />
                    </div> : null
                }
                {
                    staffEdit ? <div className={styles.overlay}>
                        <UserEdit close={onHandleStaffEdit} userID={userID} firstname={firstname} lastname={lastname} phone={phone} designation={designation} expertise={expertise} emergencyPhone={emergencyPhone} avatar={avatar} />
                    </div> : null
                }
                <button onClick={() => setStaffEdit(() => !staffEdit)}>
                    <TbEdit size={23} />
                </button>
                <button onClick={() => setStaffDelete(() => !staffDelete)}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
