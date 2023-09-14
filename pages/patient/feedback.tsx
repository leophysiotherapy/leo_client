import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import { Oxygen, Poppins } from 'next/font/google'
import styles from '@/styles/patient/feedback.module.scss'
import Head from 'next/head'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const Feedback: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
            </Head>
            <h2 className={poppins.className}>Create Review</h2>
            <form>
                <div className={styles.ratings}>
                    <h2 className={poppins.className}>Rate your experience</h2>
                    <div className={styles.stars}>
                        <button>⭐</button>
                        <button>⭐</button>
                        <button>⭐</button>
                        <button>⭐</button>
                        <button>⭐</button>
                    </div>

                </div>
                <div className={styles.comments}>
                    <h2 className={poppins.className}>Comment</h2>
                    <textarea className={oxygen.className} placeholder='Type your comment here...' />
                </div>
                <div className={styles.btns}>
                    <button>Submit</button>
                    <button className={styles.cancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
(Feedback as PageWithLayout).layout = MainLayout
export default Feedback