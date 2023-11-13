import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import { client } from '@/lib/apolloWrapper'
import { GetStaticPropsContext } from 'next'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GetAllDiagnosis, GetDiagnosisID } from '@/util/diagnostic/diagnosis.query'
import styles from '@/styles/patient/diagnosis.module.scss'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'
import ReceiptDiagnosis from '@/components/patient/receiptDiagnosis'
import { useReactToPrint } from 'react-to-print'
import DashboardLayout from '@/layout/dashboard.layout'



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


    const [ isPrinting, setIsPrinting ] = useState(false)
    const promiseResolveRef = useRef<any>(null)
    const PrintComponent = useRef(null)



    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current
        }
    }, [ isPrinting ])

    const hanadlePrint = useReactToPrint({
        content: () => PrintComponent.current
    })


    if (router.isFallback) {
        return (<p>Loading...</p>)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Diagnosis</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <div className={styles.printer} ref={PrintComponent}>
                <ReceiptDiagnosis data={diagnosis} />
            </div>
            <div className={styles.cc}>
                <div className={styles.header}>
                    <button onClick={() => router.back()}>Back to Patient Record</button>
                    <h2 className={poppins.className}>Diagnosis</h2>
                    <button onClick={hanadlePrint}>Print/Save</button>
                </div>
                <div className={styles.diagnosisContainer}>
                    {diagnosis.map(({ diagnosis, diagnosisID, createdAt }: any) => (
                        <div key={diagnosisID} className={styles.card}>
                            <span className={oxygen.className}>{diagnosis}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

(Diagnosis as PageWithLayout).layout = DashboardLayout
export default Diagnosis