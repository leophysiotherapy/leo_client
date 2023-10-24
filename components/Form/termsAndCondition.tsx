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
                        -  Leonardo Physical Therapy Rehabilitation Clinic is fully dedicated to ensuring strict compliance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996, which serves as the cornerstone for safeguarding personal health information. At our clinic, your privacy is of outmost importance to us, and we are unwavering in our commitment to protecting your Protected Health Information (PHI) in accordance with HIPAA regulations. We encourage you to review our comprehensive Privacy Policy to gain a deeper understanding of how we collect, utilize, and fortify the security of your PHI.
                    </p>
                    <div className={styles.privacy}>
                        <h3 className={poppins.className}>Privacy Policy</h3>
                        <p className={oxygen.className}>- Leonardo Physical Therapy Rehabilitation Clinic is fully dedicated to ensuring strict compliance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996, which serves as the cornerstone for safeguarding personal health information. At our clinic, your privacy is of outmost importance to us, and we are unwavering in our commitment to protecting your Protected Health Information (PHI) in accordance with HIPAA regulations. We encourage you to review our comprehensive Privacy Policy to gain a deeper understanding of how we collect, utilize, and fortify the security of your PHI.</p>
                        <div className={styles.s}>
                            <div>
                                <h2 className={poppins.className}>1. Collection of PHI</h2>
                                <p className={oxygen.className}>- We collect PHI with your explicit consent and use it solely for the purpose of providing you with the best possible services and healthcare. This may include information such as your medical history, treatment records, and any other relevant health-related data necessary for your care.
                                </p>
                            </div>
                            <div>
                                <h2 className={poppins.className}>2. Use of PHI</h2>
                                <p className={oxygen.className}>- Your PHI is used for treatment, payment, and healthcare operations as outlined under the Health Insurance Portability and Accountability Act (HIPAA) guidelines. We do not use your PHI for any purposes other than those permitted by law without your explicit authorization.
                                </p>
                            </div>
                            <div>
                                <h2 className={poppins.className}>3. Disclosure of PHI</h2>
                                <p className={oxygen.className}>- We may disclose your PHI to authorized personnel involved in your care, or as required by law. Any other disclosure of your PHI to third parties will be done only with your explicit consent or as permitted by the HIPAA regulations.
                                </p>
                            </div>
                            <div>
                                <h2 className={poppins.className}>4. Compliance with Regulations</h2>
                                <p className={oxygen.className}>- Our policies and procedures are in strict compliance with the regulations outlined in the HIPAA Privacy Rule. We regularly review and update our policies to ensure ongoing adherence to all applicable privacy and security requirements.
                                </p>
                            </div>
                            <div>
                                <h2 className={poppins.className}>5. Access to Your PHI</h2>
                                <p className={oxygen.className}>- You have the right to access, review, and request amendments to your PHI as allowed by law.
                                </p>
                            </div>
                            <div>
                                <h2 className={poppins.className}>6. Data Retention and Disposal</h2>
                                <p className={oxygen.className}>- We retain your PHI for the period required by law and dispose of it securely once it is no longer needed. This includes the secure deletion of electronic records and the proper disposal of physical documents containing PHI.
                                </p>
                            </div>
                            <span className={oxygen.className}>If you have any questions or concerns regarding the use or protection of your PHI, please don{"'"}t hesitate to contact us.</span>
                        </div>
                    </div>
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
                    <h2 className={poppins.className}>3. Account Security
                    </h2>
                    <p className={oxygen.className}>
                        -  Users are responsible for maintaining the security of their account credentials. It is essential to create strong passwords and refrain from sharing account information with any third parties.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>4. Prohibited Activities
                    </h2>
                    <p className={oxygen.className}>
                        -  The use of our platform for any illegal, unauthorized, or fraudulent activities is strictly prohibited. Users are expected to adhere to the terms and conditions outlined in our policies and guidelines.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>5. Amendments
                    </h2>
                    <p className={oxygen.className}>
                        -  We reserve the right to amend these Terms and Conditions at any time. Any changes will be posted on our platform, and it is your responsibility to review them periodically.

                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>6.  Intellectual Property
                    </h2>
                    <p className={oxygen.className}>
                        -  All content provided on our platform, including text, graphics, logos, and software, is our property and is protected by copyright and other intellectual property laws.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>7.  Contact Information
                    </h2>
                    <p className={oxygen.className}>
                        -  If you have any questions or concerns about these Terms and Conditions or our services, please contact us at restore.pt11@gmail.com
                    </p>
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
