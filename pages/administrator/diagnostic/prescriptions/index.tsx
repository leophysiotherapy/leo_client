import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/admin/prescription/prescription.module.scss'
import { GetAllPrescription, GetFindPrescriptions } from '@/util/prescription/prescription.query'
import { Oxygen, Poppins } from 'next/font/google'
import { useLazyQuery, useQuery } from '@apollo/client'
import PrescriptionQuery from '@/components/admin/diagnostic/prescription'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const headerTable = [ "DateTime", "Name", "Actions" ]


const Prescriptions: FC = () => {


    const { loading, data } = useQuery(GetAllPrescription)
    const [ searchPrescriptions, { data: searchData } ] = useLazyQuery(GetFindPrescriptions)
    const [ search, setSearch ] = useState("")
    return (
        <div className={styles.container}>
            <Head>
                <title>Prescription</title>
            </Head>
            <div className={styles.filter}>
                <div className={styles.filterEntries}>

                    <div className={styles.filterSearch}>
                        <span className={oxygen.className}>Search:</span>
                        <input type="search" onChange={(e) => {
                            searchPrescriptions({
                                variables: {
                                    search
                                }
                            })
                            setSearch(e.target.value)
                        }

                        } />
                    </div>
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
                        {
                            search ?
                                searchData?.getFindPrescription.map(({ prescriptionID, createdAt, patient, prescription }: { prescriptionID: string, createdAt: any, patient: [], prescription: string }) => (

                                    patient.map(({ profile }: { profile: [] }) => (
                                        profile.map(({ fullname }: { fullname: string }) => (
                                            <PrescriptionQuery key={prescriptionID} prescriptionID={prescriptionID} fullname={fullname} date={createdAt} prescription={prescription} />
                                        ))
                                    ))

                                )) :

                                loading ? <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> : data.getAllPrescription.map(({ prescriptionID, createdAt, patient, prescription }: { prescriptionID: string, createdAt: any, patient: [], prescription: string }) => (

                                    patient.map(({ profile }: { profile: [] }) => (
                                        profile.map(({ fullname }: { fullname: string }) => (
                                            <PrescriptionQuery key={prescriptionID} prescriptionID={prescriptionID} fullname={fullname} date={createdAt} prescription={prescription} />
                                        ))
                                    ))

                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
(Prescriptions as PageWithLayout).layout = DashboardLayout
export default Prescriptions
