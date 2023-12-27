import React, { FC, useState, useEffect } from 'react'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import Head from 'next/head'
import styles from '@/styles/admin/records/staff.module.scss'
import { TbPlus } from 'react-icons/tb'
import { Oxygen, Poppins } from 'next/font/google'
import { useQuery, useLazyQuery } from '@apollo/client'
import StaffAdd from '@/components/admin/records/staff/staffAdd'
import { GetAllPhysioUserByRole, GetAllPhysioSearchByRole } from '@/util/user/user.query'
import { UserSubscriptions } from '@/util/user/user.subscirptions'
import StaffQuery from '@/components/admin/records/staff/staff'
import { Sorting } from '@/util/sorting'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const headerTable = [ "Name", "Designation", "Expertise", "Contact No.", "Emergency No.", "Actions" ]
const Staff: FC = () => {

    const [ add, setAdd ] = useState(false)
    const [ pagination, setPagination ] = useState(10)
    const [ pages, setPages ] = useState(0)

    const [ search, setSearch ] = useState("")

    const [ orders, setOrders ] = useState("asc")

    const { loading, data, subscribeToMore } = useQuery(GetAllPhysioUserByRole, {
        variables: {
            role: "staff",
            take: pagination,
            limit: pages * pagination,
            orders: orders
        },
        pollInterval: 1000
    })


    const [ searchUser, { data: searchData } ] = useLazyQuery(GetAllPhysioSearchByRole)

    const onHandleStaff = () => {
        setAdd(false)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Staff</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Staff Records</h2>
            {
                add ? <div className={styles.overlay}>
                    <StaffAdd close={onHandleStaff} />
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
                    <span className={oxygen.className}>Sort:</span>
                    <select onChange={(e) => setOrders(e.target.value)}>
                        {Sorting.map(({ name, value }) => (
                            <option key={name} value={value}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterSearch}>
                    <span className={oxygen.className}>Search:</span>
                    <input type="search" onChange={(e) => {
                        searchUser({
                            variables: {
                                search,
                                role: "staff"
                            }
                        })
                        setSearch(e.target.value)
                    }

                    } />
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
                        {search ? searchData?.getSearchuserByRole.map(({ email, profile, userID, }: { email: string, profile: [], userID: string }) => (
                            profile.map(({ firstname, lastname, expertise, phone, emergencyPhone, designation, avatar }: { firstname: string, lastname: string, expertise: string, phone: string, emergencyPhone: string, designation: string, avatar: any }) => (

                                <StaffQuery key={userID} userID={userID} firstname={firstname} lastname={lastname} expertise={expertise} phone={phone} avatar={avatar} emergencyPhone={emergencyPhone} designation={designation} />
                            ))

                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getPhysioUserByRole.map(({ email, profile, userID }: { email: string, profile: [], userID: string }) => (
                            profile.map(({ firstname, lastname, expertise, phone, emergencyPhone, designation, avatar }: { firstname: string, lastname: string, expertise: string, phone: string, emergencyPhone: string, designation: string, avatar: any }) => (

                                <StaffQuery key={userID} userID={userID} firstname={firstname} lastname={lastname} expertise={expertise} phone={phone} avatar={avatar} emergencyPhone={emergencyPhone} designation={designation} />

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

(Staff as PageWithLayout).layout = DashboardLayout
export default Staff