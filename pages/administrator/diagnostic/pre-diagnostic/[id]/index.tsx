import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import { client } from '@/lib/apolloWrapper'
import { GetAllPreDiagForm, GetAllPreDiagFormId } from '@/util/prediag/prediag.query'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styles from '@/styles/admin/prescription/prediagid.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import Head from 'next/head'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export const getStaticPaths = async () => {
    const { data: { getAllPreDiagnosticForm } } = await client.query({
        query: GetAllPreDiagForm
    })

    const paths = getAllPreDiagnosticForm.map(({ prediagnosticID }: any) => {
        return { params: { id: prediagnosticID } }
    })

    return {
        paths, fallback: true
    }
}


export const getStaticProps = async (context: any) => {
    const preDiagId = context.params?.id
    const { data: { getPreDiagnositicFormId } } = await client.query({
        query: GetAllPreDiagFormId,
        variables: {
            prediagnosticId: preDiagId
        }
    })

    return {
        props: {
            diagForm: getPreDiagnositicFormId
        }
    }
}

const Index: FC = ({ diagForm }: any) => {

    const router = useRouter();


    if (router.isFallback) {
        return (<p>Loading...</p>)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Pre-Diagnostic Form</title>
            </Head>
            <h2 className={poppins.className}>Pre-Diagnostic</h2>
            {diagForm.map(({ prediagnosticID, age, date, sex, time, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, user }: any) => (
                <div className={styles.questionaireContainer} key={prediagnosticID}>
                    <div>
                        <label className={poppins.className} >Name: {user[ 0 ].profile[ 0 ].fullname}</label>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Age: {age}</label>

                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Sex: {sex}</label>
                        <div className={styles.radios}>

                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Date of Appointment: {date}</label>

                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Time of Appointment: {time}</label>

                    </div>
                    <div className={styles.question}>
                        <span className={poppins.className}>Do you experience any of the following symptoms?</span>

                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>A. Fevers/Chills/Sweats: </label>
                        <span className={oxygen.className}>{question1}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>B. Unusual Fatigue: </label>
                        <span className={oxygen.className}>{question2}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>C. Nausea/vomiting: </label>
                        <span className={oxygen.className}>{question3}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>D. Headaches/Dizziness: </label>
                        <span className={oxygen.className}>{question4}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>E. Numbness/Tingling: </label>
                        <span className={oxygen.className}>{question5}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>F. Muscle cramping: </label>
                        <span className={oxygen.className}>{question6}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>G. Chest pain/Palpitations: </label>
                        <span className={oxygen.className}>{question7}</span>
                    </div>

                    <div className={styles.question}>
                        <label className={poppins.className}>H. Swelling in feet or hands
                            : </label>
                        <span className={oxygen.className}>{question8}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>I. Difficulty breathing/Shortness of breath
                        </label>
                        <span className={oxygen.className}>{question9}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>J. Cough/Change in cough/Blood in phlegm
                            : </label>
                        <span className={oxygen.className}>{question10}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>K. Difficulty swallowing
                            : </label>
                        <span className={oxygen.className}>{question11}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>L. Heartburn/Indigestion
                            : </label>
                        <span className={oxygen.className}>{question12}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>M. Difficulty urinating (starting, stopping)
                            : </label>
                        <span className={oxygen.className}>{question13}</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>N. Are you pregnant?
                            : </label>
                        <span className={oxygen.className}>{question14}</span>
                    </div>
                    <div className={styles.question2}>
                        <label className={poppins.className}>Other medical Connditions or prior surgeries: (Type N/A if none) </label>
                        <span className={oxygen.className}>{question15}</span>
                    </div>
                    <div className={styles.question2}>
                        <label className={poppins.className}>Current medications: (Type N/A if none) </label>
                        <span className={oxygen.className}>{question16}</span>
                    </div>
                </div>
            ))}
            <button onClick={() => router.back()}>Go Back to Pre-Diagnostic Form</button>
        </div>
    )
}


(Index as PageWithLayout).layout = DashboardLayout
export default Index