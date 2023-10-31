import React from 'react'
import styles from '@/styles/patient/receipt.module.scss'
import Image from 'next/image'
import { TbLocationPin, TbBrandInstagram } from 'react-icons/tb'
import { Poppins, Oxygen } from 'next/font/google'
import { format } from 'date-fns'



const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function ReceiptBooking({ appointment, ref }: any) {
    return (

        appointment.map(({ appointmentID, time, date, amount, patients, services, status, link, platform }: any) => (
            <div key={appointmentID} ref={ref} className={styles.invoice_container}>
                <div className={styles.invoice_header}>
                    <div className={styles.logo_container}>
                        <Image src="/logo.png" alt="" height={100} width={160} />
                    </div>
                    <div className={styles.clinic_info}>
                        <h2 className={poppins.className}>Leonardo Clinic</h2>
                        <span className={oxygen.className}>
                            <TbLocationPin size={23} />   7860 Imperial Highway, Downey, California
                        </span>
                        <span className={oxygen.className}>
                            <TbBrandInstagram size={23} />  @restore.pt
                        </span>
                    </div>
                </div>

                <div className={styles.patient_container}>
                    <div>
                        <h2 className={poppins.className}>Booking Summary</h2>
                        {patients.map(({ profile, email }: any) => (
                            <>
                                {profile.map(({ firstname, lastname, phone }: any) => (
                                    <>
                                        <p key={firstname} className={oxygen.className}><b>Name:</b> {firstname} {lastname}</p>
                                        <p className={oxygen.className}><b>Email:</b> {email} </p>
                                        <p className={oxygen.className}><b>Contact Number:</b> {phone}</p>

                                    </>
                                ))}
                            </>
                        ))}

                    </div>

                    <div className={styles.details_container}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={poppins.className}><b>Time</b></td>
                                    <td className={poppins.className}>:</td>
                                    <td className={poppins.className}> {time}</td>
                                </tr>
                                <tr>
                                    <td className={oxygen.className}><b>Date</b></td>
                                    <td className={oxygen.className}>:</td>
                                    <td className={oxygen.className}>{format(new Date(date), "MMMM dd, yyyy")}</td>
                                </tr>
                                <tr>
                                    <td className={oxygen.className}><b>Mode of Payment</b></td>
                                    <td className={oxygen.className}>:</td>
                                    <td className={oxygen.className}>Paypal</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.service_container}>
                    <table className={styles.item_table}>
                        <tbody>
                            <tr>
                                <th className={poppins.className}>Booking No.</th>

                                {platform === "f2f" ? <th className={poppins.className}>Service</th> : <th className={poppins.className}>Platform</th>}
                                {platform === "online" ? <th className={poppins.className}>Link</th> : null}
                                <th className={poppins.className}>Amount Paid</th>
                            </tr>
                            <tr>
                                <td className={oxygen.className}>{appointmentID}</td>
                                {platform === "online" ? <th className={poppins.className}>Google Meet</th> : null}
                                {platform === "f2f" ? <th className={poppins.className}>{services}</th> : <th className={poppins.className}>{link}</th>}
                                <td className={oxygen.className}> $175</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.footer}>
                    <div>
                        <h3 className={poppins.className}>Thank You for trusting us.</h3>
                        <p className={oxygen.className}>This page serves as your official receipt for your booking in the Leonardo Physical Therapy Clinic. We recommend that you consider printing or retaining a digital copy of this page for your personal records and safekeeping. An SMS reminder will be sent to your provided contact number, one (1) hour prior to your scheduled appointment.</p>
                        <p className={oxygen.className}>At Leonardo Physical Therapy Clinic, we value your convenience and well-being, and we are committed to making your experience with us as seamless as possible. If you have any questions or require any further assistance, please do not hesitate to contact our dedicated team.</p>
                    </div>
                </div>
            </div>
        ))
    )
}
