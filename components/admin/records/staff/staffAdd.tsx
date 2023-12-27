import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from './add.module.scss'
import { Poppins } from 'next/font/google'
import { CreateStaff } from '@/util/user/user.mutation'
import { GetAllPhysioUserByRole } from '@/util/user/user.query'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function StaffAdd({ close }: any) {




    const [ mutate ] = useMutation(CreateStaff)

    const [ imageUpload, setImageUpload ] = useState(null)

    const [ staff, setAddStaff ] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        designation: "",
        emergency: "",
        experties: ""
    })

    const onHandleStaffForm = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate({
            variables: {
                user: {
                    designation: staff.designation,
                    email: staff.email,
                    emergencyPhone: staff.emergency,
                    expertise: staff.experties,
                    firstname: staff.firstname,
                    lastname: staff.lastname,
                    phone: staff.contact,
                },
                file: imageUpload
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Staff Added")
                setAddStaff({
                    contact: "",
                    designation: "",
                    email: "",
                    emergency: "",
                    experties: "",
                    firstname: "",
                    lastname: ""
                })
                setImageUpload(null)
            },
            onError: (e) => {
                alert(e.message)
            },
            refetchQueries: [ {
                query: GetAllPhysioUserByRole,
                variables: {
                    role: "staff",
                    take: 10,
                    limit: 0,
                    orders: "asc"
                }
            } ]
        })
    }

    const onChangeImageUpload = (e: any) => {
        const files = e.target.files[ 0 ]
        if (!files) return

        setImageUpload(files)
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Add Staff</h2>
            <form onSubmit={onHandleStaffForm}>
                <div>
                    <input type="text" value={staff.firstname} placeholder='Firstname' onChange={(e) => setAddStaff({ ...staff, firstname: e.target.value })} />
                    <input type="text" value={staff.lastname} placeholder='Lastname'
                        onChange={(e) => setAddStaff({ ...staff, lastname: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={staff.email} placeholder='Email' onChange={(e) => setAddStaff({ ...staff, email: e.target.value })} />
                    <input type="text" value={staff.contact} placeholder='Contact'
                        onChange={(e) => setAddStaff({ ...staff, contact: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={staff.designation} placeholder='Designation'
                        onChange={(e) => setAddStaff({ ...staff, designation: e.target.value })} />
                    <input type="text" value={staff.emergency} placeholder='Emergency'
                        onChange={(e) => setAddStaff({ ...staff, emergency: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={staff.experties} placeholder='Expertise'
                        onChange={(e) => setAddStaff({ ...staff, experties: e.target.value })} />
                    <input type="file" onChange={onChangeImageUpload} />
                </div>
                <div className={styles.formBtnGrp}>
                    <button onClick={close}>Cancel</button>
                    <button className={styles.submit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
