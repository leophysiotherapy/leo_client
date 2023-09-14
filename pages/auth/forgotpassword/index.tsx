import React from 'react'
import styles from '@/styles/auth/forgetpassword.module.scss'
import { Poppins, Oxygen } from 'next/font/google'

const poppins = Poppins({
    weight: '500',
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function ForgetPassword() {
    return (
        <div className={styles.container}>
            <div className={styles.forgotContainer}>
                <h2 className={poppins.className}>Reset Password</h2>
                <span className={oxygen.className}>Enter your account Email Address </span>
                <input type="email" placeholder='Email address' />
                <button>Submit</button>
            </div>
        </div>
    )
}
