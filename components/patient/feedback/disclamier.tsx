import React from 'react'
import styles from './disclaimer.module.scss'

import { Poppins, Oxygen } from 'next/font/google'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})



export default function DisclaimerFeedback({ continueHandler }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.disclaimerContainer}>
                <h2 className={poppins.className}>Disclaimer:</h2>
                <p className={oxygen.className}>Your privacy and the confidentiality of your health information are paramount to us. By participating in this evaluation, you acknowledge that your responses may include sensitive health information. We assure you that all information provided will be treated with strict confidentiality in accordance with the Health Insurance Portability and Accountability Act (HIPAA) regulations and other applicable privacy laws. Authorized individuals will only access your data to improve our program, product, or service. Please contact the evaluation administrator if you have any privacy concerns or questions. Your participation implies your consent to these terms, and we appreciate your feedback.

                </p>
                <p className={oxygen.className}>
                    <i>Note: Our organization{"'"}s privacy policies and HIPAA regulations govern this evaluation form. Please review our privacy policies for further details on data handling and security.</i>

                </p>
                <div className={styles.continue}>
                    <button onClick={continueHandler}>Continue</button>
                </div>
            </div>
        </div>
    )
}
