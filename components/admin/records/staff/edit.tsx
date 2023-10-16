import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { GetAllPhysioUserByRole, UpdatestaffUpdateProfile } from '@/util/user/user.query'
import { useMutation } from '@apollo/client'
import Image from 'next/image'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function UserEdit({ close, userID, firstname, lastname, phone, designation, expertise, emergencyPhone, avatar }: any) {

    const [ staff, setAddStaff ] = useState({
        firstname,
        lastname,
        contact: phone,
        designation,
        emergency: emergencyPhone,
        experties: expertise
    })

    const [ updateStaffProfile ] = useMutation(UpdatestaffUpdateProfile, {
        variables: {
            userId: userID,
            user: {
                designation: staff.designation,
                emergencyPhone: staff.emergency,
                expertise: staff.experties,
                firstname: staff.firstname,
                lastname: staff.lastname,
                phone: staff.contact
            }
        },
        errorPolicy: "all",
        onCompleted: () => {
            alert("Successfully Profile Update")
        },
        refetchQueries: [ {
            query: GetAllPhysioUserByRole,
            variables: {
                role: "staff",
                take: 10,
                limit: 0
            }
        } ]
    })

    const onHandleStaffForm = (e: SyntheticEvent) => {
        e.preventDefault();
        updateStaffProfile()
    }


    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Edit Staff</h2>
            <div className={styles.avatar}>
                {avatar.length === 0 ? <Image src="/default.jpg" alt={`${firstname} ${lastname}`} width={90} height={90} /> : avatar.map(({ avatar: profile }: any) => (
                    <Image key={profile} src={profile} alt={`${firstname} ${lastname}`} width={90} height={90} />
                ))}
            </div>
            <form onSubmit={onHandleStaffForm}>
                <div>
                    <input type="text" value={staff.firstname} placeholder='Firstname' onChange={(e) => setAddStaff({ ...staff, firstname: e.target.value })} />
                    <input type="text" value={staff.lastname} placeholder='Lastname'
                        onChange={(e) => setAddStaff({ ...staff, lastname: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={staff.contact} placeholder='Contact'
                        onChange={(e) => setAddStaff({ ...staff, contact: e.target.value })} />
                    <input type="text" value={staff.experties} placeholder='Expertise'
                        onChange={(e) => setAddStaff({ ...staff, experties: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={staff.designation} placeholder='Designation'
                        onChange={(e) => setAddStaff({ ...staff, designation: e.target.value })} />
                    <input type="text" value={staff.emergency} placeholder='Emergency'
                        onChange={(e) => setAddStaff({ ...staff, emergency: e.target.value })} />
                </div>
                <div className={styles.formBtnGrp}>
                    <button className={styles.cancel} onClick={close}>Cancel</button>
                    <button className={styles.submit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
