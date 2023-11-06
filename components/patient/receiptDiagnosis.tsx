import React from 'react'
import styles from '@/styles/patient/diagnosisRecepit.module.scss'
import Image from 'next/image'
import { Poppins, Oxygen } from 'next/font/google'
import { TbLocationPin, TbBrandInstagram } from 'react-icons/tb'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})



export default function ReceiptDiagnosis({ data }: { data: [] }) {





    return (
        data.map(({ diagnosis, diagnosisID, createdAt, patient }: { diagnosis: string, diagnosisID: string, createdAt: any, patient: [] }) => (
            patient.map(({ email, profile }: { email: string, profile: [] }) => (
                profile.map(({ fullname, phone }: { fullname: string, phone: string }) => (
                    <div key={diagnosisID} className={styles.container}>
                        <div className={styles.invoice_header}>
                            <div className={styles.logo_container}>
                                <Image src="/logo.png" alt="" height={120} width={170} />
                            </div>
                            <div className={styles.clinic_info}>
                                <h2 className={poppins.className}>Paolo Leonardo, DPT</h2>
                                <span className={oxygen.className}>Owner and Physical Therapist</span>
                                <span className={oxygen.className}>
                                    <TbLocationPin size={23} />   7860 Imperial Highway, Downey, California
                                </span>
                                <span className={oxygen.className}>
                                    <TbBrandInstagram size={23} />  @restore.pt
                                </span>
                            </div>
                        </div>

                        <div className={styles.patient_info}>
                            <div>
                                <p className={oxygen.className}><b>Patient Name:</b> {fullname}</p>
                                <p className={oxygen.className}><b>Email:</b> {email}</p>
                                <p className={oxygen.className}><b>Contact Number:</b> {phone}</p>
                            </div>
                        </div>
                        <div className={styles.diagnosis}>
                            <h2 className={poppins.className}>Diagnosis</h2>
                            <p className={oxygen.className}>{diagnosis}</p>
                        </div>
                        <div className={styles.signature}>
                            <Image src="/signature.png" alt="" height={90} width={110} />
                            <span>Provider Signature:</span>
                        </div>
                    </div>
                ))
            ))
        ))
    )
}
