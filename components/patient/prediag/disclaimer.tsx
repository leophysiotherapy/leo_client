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



export default function Disclaimer({ continueHandle }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.disclaimerContainer}>
                <h2 className={poppins.className}>Disclaimer:</h2>
                <p className={oxygen.className}>Your privacy and the confidentiality of your health information are paramount to us. By completing this pre-diagnostic form, you acknowledge that the information you provide may include sensitive health-related details. We assure you that all data shared will be handled with the utmost care and in full compliance with the <b> Health Insurance Portability and Accountability Act (HIPAA)</b>and other applicable privacy regulations. Your information will only be accessible to authorized personnel involved in the pre-diagnostic process and will be used solely to assess your health condition. We are committed to safeguarding your privacy, and should you have any concerns or questions regarding handling your data, please contact our privacy officer or designated personnel. Your submission of this form implies your consent to these terms, and we thank you for entrusting us with your health information.
                </p>
                <p className={oxygen.className}>
                    It{"'"}s essential to note that our organization{"'"}s privacy policies govern this pre-diagnostic form and comply with HIPAA regulations to ensure the confidentiality and security of your health information. Your trust in us is valued, and your information will be used responsibly to assist in your healthcare assessment
                </p>
                <div className={styles.continue}>
                    <button onClick={continueHandle}>Continue</button>
                </div>
            </div>
        </div>
    )
}
