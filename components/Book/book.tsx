import React, { SyntheticEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateAppointment } from '@/util/appointment/appointment.mutation'
import styles from './book.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function Books({ selectedDate, time }: any) {


    const [ mutate ] = useMutation(CreateAppointment)
    const router = useRouter()

    const onHandleSubmitForm = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate({
            variables: {
                appointment: {
                    date: selectedDate,
                    time: time
                },
                serviceId: null,
                platform: null,
                userId: null

            },
            errorPolicy: "all",
            onCompleted: () => {

            }
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.payTitle}>
                <h2 className={poppins.className}>Payment</h2>
            </div>
            <div className={styles.paymentContainer}>
                <div className={styles.booksSum}>
                    <h2 className={poppins.className}>Book Summary</h2>
                    <div>
                        <span className={oxygen.className}>Name: </span>
                        <span className={oxygen.className}></span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Email Address: </span>
                        <span className={oxygen.className}></span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Date: </span>
                        <span className={oxygen.className}></span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Time: </span>
                        <span className={oxygen.className}></span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Platform: </span>
                        <span className={oxygen.className}></span>
                    </div>
                </div>
                <div className={styles.payment}>
                    <div>
                        <span className={oxygen.className}>Please Pay: </span>
                        <span className={oxygen.className}></span>
                    </div>
                    <PayPalButtons
                        style={{
                            color: "gold",
                            layout: "horizontal",
                            shape: "rect"
                        }}
                    />
                </div>
            </div>
            <button onClick={() => router.push("/")}>Cancel</button>
        </div>
    )
}
