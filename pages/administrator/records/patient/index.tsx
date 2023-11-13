import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import styles from '@/styles/admin/records/patient.module.scss'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import { TbPlus } from 'react-icons/tb'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GetAllPhysioSearchByRole, GetAllPhysioUserByRole } from '@/util/user/user.query'
import PatientAdd from '@/components/admin/records/patient/patientAdd'
import PatientQuery from '@/components/admin/records/patient/patient'
import { UserSubscriptions } from '@/util/user/user.subscirptions'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})



const headerTable = [ "Name", "Last Visit", "Prescriptions", "Diagnosis", "Contact No.", "Actions" ]

const Patient: FC = () => {
    const [ add, setAdd ] = useState(false)

    const [ pagination, setPagination ] = useState(10)
    const [ pages, setPages ] = useState(0)
    const [ search, setSearch ] = useState("")

    const { loading, data, subscribeToMore } = useQuery(GetAllPhysioUserByRole, {
        variables: {
            role: "patient",
            take: pagination,
            limit: pages * pagination
        }
    })

    const onHandlePatient = () => {
        setAdd(false)
    }


    const [ searchUser, { data: searchData } ] = useLazyQuery(GetAllPhysioSearchByRole)

    useEffect(() => {
        return subscribeToMore({
            document: UserSubscriptions,
            variables: {
                role: "patient"
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const neweAddUser = subscriptionData.data.UserSubscriptions
                return Object.assign({}, {
                    getPhysioUserByRole: [ prev.getPhysioUserByRole, neweAddUser ]
                })
            }
        })
    }, [ subscribeToMore ])
    return (
        <div className={styles.container}>
            <Head>
                <title>Patient</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Patient Records</h2>
            {
                add ? <div className={styles.overlay}>
                    <PatientAdd close={onHandlePatient} />
                </div> : null
            }
            <div className={styles.addStaff}>
                <button onClick={() => setAdd(() => !add)}>
                    <TbPlus size={16} />
                    <span>Add</span>
                </button>
            </div>
            <div className={styles.filter}>
                <div className={styles.filterEntries}>
                    <span className={oxygen.className}>Show</span>
                    <select onChange={(e) => setPagination(() => parseInt(e.target.value))}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className={oxygen.className}>entries</span>
                </div>
                <div className={styles.filterSearch}>
                    <span className={oxygen.className}>Search:</span>
                    <input type="search" onChange={(e) => {
                        searchUser({
                            variables: {
                                search,
                                role: "patient"
                            }
                        })
                        setSearch(e.target.value)
                    }} />
                </div>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {headerTable.map((name) => (

                                <th className={poppins.className} key={name}>{name}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search ? searchData?.getSearchuserByRole.map(({ email, profile, userID, appointment, prescription, diagnosis }: { email: string, profile: [], appointment: [], userID: string, prescription: [], diagnosis: [] }) => (
                            profile.map(({ firstname, lastname, phone }: { firstname: string, lastname: string, expertise: string, phone: string, emergencyPhone: string, designation: string, }) => (

                                <PatientQuery key={userID} userID={userID} firstname={firstname} lastname={lastname} phone={phone} appointment={appointment} prescription={prescription} diagnosis={diagnosis} email={email} />


                            ))
                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getPhysioUserByRole.map(({ email, profile, userID, appointment, prescription, diagnosis }: { email: string, profile: [], appointment: [], userID: string, prescription: [], diagnosis: [] }) => (
                            profile.map(({ firstname, lastname, phone }: { firstname: string, lastname: string, expertise: string, phone: string, emergencyPhone: string, designation: string, }) => (
                                <PatientQuery key={userID} userID={userID} firstname={firstname} lastname={lastname} phone={phone} appointment={appointment} prescription={prescription} diagnosis={diagnosis} email={email} />
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.paginationBtn}>
                <button disabled={pages < 1} onClick={() => setPages(() => pages - 1)}>Prev</button>
                <span>{pages + 1} </span>
                <button onClick={() => setPages(() => pages + 1)}>Next</button>
            </div>
        </div>
    )
}



(Patient as PageWithLayout).layout = DashboardLayout

export default Patient