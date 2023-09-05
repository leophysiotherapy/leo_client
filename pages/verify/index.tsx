import React from 'react'
import styles from '@/styles/verify/verify.module.scss'
import VerificationMessage from '@/components/Form/verificationMessage'

export default function Index() {
    return (
        <div className={styles.container}>
            <VerificationMessage />
        </div>
    )
}
