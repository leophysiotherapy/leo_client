import React, { FC, useState } from 'react'
import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import styles from '@/styles/admin/prescription/prediag.module.scss'
import { GetAllPreDiagForm, GetSearchPreDiagForm } from '@/util/prediag/prediag.query'
import { useLazyQuery, useQuery } from '@apollo/client'
import PreDiagFormQuery from '@/components/admin/prediagform/prediagQuery'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const headerTable = [ "DateTime", "Name", "Actions" ]


const PreDiagnostic: FC = () => {


    const [ search, setSearch ] = useState("")
    const { loading, data } = useQuery(GetAllPreDiagForm)

    const [ searchPreDiag, { data: searchData } ] = useLazyQuery(GetSearchPreDiagForm, {
        variables: {
            search: search
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Pre-Diagnostic</title>
            </Head>
            <h2 className={poppins.className}>Pre-Diagnostic Form</h2>
            <div className={styles.filter}>

                <div className={styles.filterEntries}>

                    <div className={styles.filterSearch}>
                        <span className={oxygen.className}>Search:</span>
                        <input type="search" onChange={(e) => {
                            searchPreDiag()
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
                        {search ? searchData?.getSearchPreDiagnosticForm.map(({ prediagnosticID, createdAt, user }: any) => (
                            <PreDiagFormQuery key={prediagnosticID} id={prediagnosticID} date={createdAt} user={user} />
                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getAllPreDiagnosticForm.map(({ prediagnosticID, createdAt, user }: any) => (
                            <PreDiagFormQuery key={prediagnosticID} id={prediagnosticID} date={createdAt} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


(PreDiagnostic as PageWithLayout).layout = DashboardLayout
export default PreDiagnostic