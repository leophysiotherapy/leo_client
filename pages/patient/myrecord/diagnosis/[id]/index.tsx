import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import { client } from '@/lib/apolloWrapper'
import { GetStaticPropsContext } from 'next'
import React, { FC } from 'react'
import { GetAllDiagnosis, GetDiagnosisID } from '@/util/diagnostic/diagnosis.query'
import styles from '@/styles/patient/diagnosis.module.scss'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export const getStaticPaths = async () => {

    const { data: { getAllDiagnosis } } = await client.query({
        query: GetAllDiagnosis
    })

    const paths = getAllDiagnosis.map(({ diagnosisID }: any) => {
        return { params: { id: diagnosisID } }
    })
    return {
        paths, fallback: true
    }
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    const presId = context.params?.id
    const { data: { getDiagnosisID } } = await client.query({
        query: GetDiagnosisID,
        variables: {
            diagnosisId: presId
        }
    })


    return {
        props: {
            diagnosis: getDiagnosisID
        }
    }
}


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const Diagnosis: FC = ({ diagnosis }: any) => {
    const router = useRouter()

    if (router.isFallback) {
        return (<p>Loading...</p>)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Diagnosis</title>
            </Head>
            <div className={styles.header}>
                <button onClick={() => router.back()}>Back to Patient Record</button>
                <h2 className={poppins.className}>Diagnosis</h2>
                <button onClick={() => window.print()}>Print/Save</button>
            </div>
            <div className={styles.diagnosisContainer}>
                {diagnosis.map(({ diagnosis, diagnosisID, createdAt }: any) => (
                    <div key={diagnosisID} className={styles.card}>
                        <span className={oxygen.className}>{diagnosis}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

(Diagnosis as PageWithLayout).layout = MainLayout
export default Diagnosis