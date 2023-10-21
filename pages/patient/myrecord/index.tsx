import React, { FC } from 'react'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'
import Head from 'next/head'
import styles from '@/styles/patient/myrecord.module.scss'
import { getAllPhysioId } from '@/util/user/user.query'
import { GetServerSidePropsContext } from 'next'
import jwtDecode from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { format } from 'date-fns'
const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const MyRecord: FC = ({ userID }: any) => {
    const { loading, data } = useQuery(getAllPhysioId, {
        variables: {
            userId: userID
        }
    })


    return (
        <div className={styles.container}>
            <Head>
                <title>My Records</title>
            </Head>
            <div className={styles.profile}>
                {loading ? "Loading" : data.getAllPhysioId.map(({ email, profile, prescription, diagnosis }: any) => (
                    profile.map(({ firstname, lastname }: any) => (
                        <div key={email}>
                            <div className={styles.profile}>
                                <h2 className={poppins.className}>Patient Name: {firstname} {lastname}</h2>
                                <h2 className={poppins.className}>Email Address: {email}</h2>
                            </div>
                            <div className={styles.recordContainer}>
                                <div className={styles.record}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className={poppins.className}>DateTime</th>
                                                <th className={poppins.className}>Diagnosis</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {diagnosis.map(({ diagnosisID, diagnosis, createdAt }: any) => (
                                                <tr key={diagnosisID}>
                                                    <td className={poppins.className}>{format(new Date(createdAt), "MMMM dd, yyyy hh:mm:ss")}</td>
                                                    <td>
                                                        <Link href={`/patient/myrecord/diagnosis/${diagnosisID}`}>View</Link>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.record}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className={poppins.className}>DateTime</th>
                                                <th className={poppins.className}>Prescriptions</th>
                                            </tr>
                                        </thead>
                                        <tbody>



                                            {prescription.map(({ prescriptionID, prescription, createdAt }: any) => (
                                                <tr key={prescriptionID}>
                                                    <td className={poppins.className}>{format(new Date(createdAt), "MMMM dd, yyyy hh:mm:ss")}</td>
                                                    <td ><Link href={`/patient/myrecord/prescription/${prescriptionID}`}>View</Link></td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>

        </div>
    )
}

(MyRecord as PageWithLayout).layout = MainLayout
export default MyRecord

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userID: userID
        }
    }
}