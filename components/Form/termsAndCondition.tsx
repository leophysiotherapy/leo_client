import React from 'react'
import styles from './termsAndCondition.module.scss'
import { Oxygen, Poppins } from 'next/font/google'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function TermsAndCondition({ close }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className={poppins.className}>
                    IMPORTANT: PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE SIGNING UP FOR AN ACCOUNT
                </h2>
                <p className={oxygen.className}>
                    By signing up for an account with {`"`}Physiotherapy: An Appointment and General Records Management System for Leonardo Physical Therapy Rehabilitation Clinic{`"`}, you agree to be bound by the following Terms and Conditions. These Terms and Conditions, along with our Privacy Policy and any additional agreements and policies referenced herein, govern your use of our services and access to our Rehabilitation Clinic.
                </p>
            </div>
            <div className={styles.orderlist}>

                <div>
                    <h2 className={poppins.className}>1. Hippa Compliance </h2>
                    <p className={oxygen.className}>
                        -  Leonardo Physical Therapy Rehabilitation Clinic is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA) of 1996, which governs the protection of personal health information.
                    </p>
                    <p className={oxygen.className}>
                        -  We take your privacy seriously and will safeguard your protected health information (PHI) as required by HIPAA. Please refer to our Privacy Policy for more information on how we collect, use, and protect your PHI.
                    </p>
                </div>

                <div>
                    <h2 className={poppins.className}>2. Account Registration </h2>
                    <p className={oxygen.className}>
                        -  To use our services, you must create an account. You agree to provide accurate, current, and complete information during the registration process.
                    </p>
                    <p className={oxygen.className}>
                        -  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>3. Treatment Consent
                    </h2>
                    <p className={oxygen.className}>
                        -   By using our services, you consent to receive treatment and rehabilitation services from our qualified healthcare professionals.
                    </p>
                    <p className={oxygen.className}>
                        - You understand that any information you provide to us, including medical history and treatment progress, may be used to facilitate your care and for billing purposes.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>4. Payment and Billing
                    </h2>
                    <p className={oxygen.className}>
                        -  You agree to pay all fees associated with your treatment and rehabilitation services as outlined in our fee schedule.
                    </p>
                    <p className={oxygen.className}>
                        - Payment is due promptly upon receipt of the invoice. Failure to pay may result in suspension or termination of services.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>5. Cancellation and Refund Policy
                    </h2>
                    <p className={oxygen.className}>
                        -  We understand that circumstances may change. Please refer to our Cancellation and Refund Policy for information on canceling appointments and requesting refunds.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>6. User Conduct
                    </h2>
                    <p className={oxygen.className}>
                        -  You agree to use our services for lawful purposes only and in compliance with all applicable laws and regulations.
                    </p>
                    <p className={oxygen.className}>
                        -  You will not use our services to transmit any content that is offensive, harmful, or violates the rights of others.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>7. Intellectual Property
                    </h2>
                    <p className={oxygen.className}>
                        -   All content provided on our platform, including text, graphics, logos, and software, is our property and is protected by copyright and other intellectual property laws.
                    </p>

                    <div>
                        <h2 className={poppins.className}>8. Disclaimer of Warranties
                        </h2>
                        <p className={oxygen.className}>
                            -  We make no warranties or representations about the accuracy or completeness of our services. Your use of our services is at your own risk.
                        </p>
                    </div>
                    <div>
                        <h2 className={poppins.className}>9. Limitation of Liability
                        </h2>
                        <p className={oxygen.className}>
                            -  In no event shall {`"`}Physiotherapy: An Appointment and General Records Management System for Leonardo Physical Therapy Rehabilitation Clinic{`"`} be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>
                    </div>
                    <div>
                        <h2 className={poppins.className}>10. Governing Law
                        </h2>
                        <p className={oxygen.className}>
                            -  These Terms and Conditions shall be governed by and construed in accordance with the laws of State of California, United States, without regard to its conflict of law principles
                        </p>
                    </div>
                    <div>
                        <h2 className={poppins.className}>11. Amendments
                        </h2>
                        <p className={oxygen.className}>
                            -  We reserve the right to amend these Terms and Conditions at any time. Any changes will be posted on our platform, and it is your responsibility to review them periodically.
                        </p>
                    </div>
                    <div>
                        <h2 className={poppins.className}>12. Contact Information
                        </h2>
                        <p className={oxygen.className}>
                            -  If you have any questions or concerns about these Terms and Conditions or our services, please contact us at restore.pt11@gmail.com.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <p className={oxygen.className}>
                    By signing up for an account with {`"`}Physiotherapy: An Appointment and General Records Management System for Leonardo Physical Therapy Rehabilitation Clinic,{`"`} you acknowledge that you have read, understood, and agreed to these Terms and Conditions, including our commitment to HIPAA compliance. If you do not agree with any part of these Terms and Conditions, please do not use our services.

                </p>
            </div>
            <div className={styles.closeBtn}>
                <button onClick={close} className={poppins.className}>Agree to Terms and Conditions</button>
            </div>
        </div>
    )
}
