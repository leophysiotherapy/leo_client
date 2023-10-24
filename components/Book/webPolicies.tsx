import React from 'react'
import styles from '../Form/termsAndCondition.module.scss'
import { Oxygen, Poppins } from 'next/font/google'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function WebPolicies({ close }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className={poppins.className}>
                    IMPORTANT: PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE SIGNING UP FOR AN ACCOUNT
                </h2>
                <p className={oxygen.className}>
                    By booking an appointment with {`"`}Physiotherapy: An Appointment and General Records Management System for Leonardo Physical Therapy Rehabilitation Clinic{`"`}P, you agree to be bound by the following Terms and Conditions. These Terms and Conditions, along with our Privacy Policy and any additional agreements and policies referenced herein, govern your use of our services and access to our Rehabilitation Clinic.
                </p>
            </div>
            <div className={styles.orderlist}>

                <div>
                    <h2 className={poppins.className}>1. Time Constraint </h2>
                    <p className={oxygen.className}>
                        -  Patients can only book any services or facilities available on our platform two days after the day they access the website. This time constraint is in place to prevent any immediate hoarding of services and to provide an equal opportunity for all patients to access our offerings.
                    </p>
                </div>

                <div>
                    <h2 className={poppins.className}>2.Fair Usage</h2>
                    <p className={oxygen.className}>
                        -  We encourage all patients to use our booking services responsibly and refrain from any form of unfair advantage or manipulation. Multiple bookings within the stipulated time frame by any individual or entity will not be entertained.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>3. Availability Confirmation
                    </h2>
                    <p className={oxygen.className}>
                        -    All bookings are subject to availability. While we strive to update our inventory regularly, there may be instances where the desired service or facility is not available for the preferred dates. In such cases, patients will be notified promptly through email and offered suitable alternatives or the option to choose an available date.
                    </p>

                </div>
                <div>
                    <h2 className={poppins.className}>4.Payment and Billing
                    </h2>
                    <p className={oxygen.className}>
                        -  You agree to pay all fees associated with your treatment and rehabilitation services as outlined in our fee schedule.
                    </p>
                    <p className={oxygen.className}>
                        -  The user can view the booking summary before proceeding to the payment through PayPal. After the payment is processed, an invoice will be displayed on the dashboard, and the patient will have the option to print or download it for record-keeping.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>5. Cancellation
                    </h2>
                    <p className={oxygen.className}>
                        -  Patients are requested to review their appointment details carefully before confirming the booking. Cancellations made will incur a cancellation fee of $50.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>6. Rescheduling
                    </h2>
                    <p className={oxygen.className}>
                        - We understand that unforeseen circumstances may arise, necessitating changes to the scheduled appointment. Admins will only have the authority to reschedule your schedule to ensure an effective use of available resources.
                    </p>
                </div>
                <div>
                    <h2 className={poppins.className}>7. User Conduct
                    </h2>
                    <p className={oxygen.className}>
                        -  By using our services, you agree to use them for lawful purposes only and in compliance with all applicable laws and regulations. The patient shall not use our services to transmit any content that is offensive, harmful or in violation of the rights of others.
                    </p>

                    <div>
                        <h2 className={poppins.className}>8. Contact Information
                        </h2>
                        <p className={oxygen.className}>
                            - If you have any questions or concerns about these Terms and Conditions or our services, please contact us at restore.pt11@gmail.com.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.title}>
                <p className={oxygen.className}>
                    This policy will contribute to a fair and efficient booking process, allowing all our patients to enjoy our services without any undue advantage or inconvenience. Thank you for your understanding and cooperation.
                </p>
            </div>
            <div className={styles.closeBtn}>
                <button onClick={close} className={poppins.className}>Agree to Terms and Conditions</button>
            </div>
        </div>
    )
}
