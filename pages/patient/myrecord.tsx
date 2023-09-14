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

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const heads = [ "Time", "Date", "Diagnosis", "Prescriptions" ]

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
                {loading ? "Loading" : data.getAllPhysioId.map(({ email, profile }: any) => (
                    profile.map(({ firstname, lastname }: any) => (
                        <div key={email}>
                            <h2 className={poppins.className}>Patient Name: {firstname} {lastname}</h2>
                            <h2 className={poppins.className}>Email Address: {email}</h2>
                        </div>
                    ))
                ))}
            </div>
            <div className={styles.record}>
                <table>
                    <thead>
                        <tr>
                            {heads.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
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