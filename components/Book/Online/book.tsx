import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateAppointment } from '@/util/appointment/appointment.mutation'
import styles from './book.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { format } from 'date-fns'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { getAllPhysioId } from '@/util/user/user.query'
import { useRouter } from 'next/router'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function Books({ selectedDate, time, close, platform }: any) {

    const [ cookies, setCookies ] = useState("")
    const [ paid, setPaid ] = useState(false)
    const router = useRouter();

    const { loading, data, error } = useQuery(getAllPhysioId, {
        variables: {
            userId: cookies
        }
    })

    useEffect(() => {
        const token = Cookies.get("physio_token") as any
        if (token) {
            const { userID }: any = jwtDecode(token)
            setCookies(userID)
        }

    }, [ cookies ])


    const [ mutate ] = useMutation(CreateAppointment)

    const onHandleSubmitForm = (e: any) => {
        e.preventDefault()
        mutate({
            variables: {
                appointment: {
                    date: format(new Date(selectedDate), "yyyy-MM-dd"),
                    time: time,
                    amount: 175,
                    services: "Consultation",
                },
                end: "",
                userId: cookies,
                platform: "online"
            },
            errorPolicy: "all",
            onCompleted: (data) => {
                setPaid(() => false)
                close()
                router.reload();
            },
            onError: error => {
                console.log(error.message)
            }
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.payTitle}>
                <h2 className={poppins.className}>Payment</h2>
            </div>
            {
                paid ?
                    <div className={styles.successfullyPaid}>
                        <div className={styles.titlePaid}>
                            <h2 className={poppins.className}>Successfully Paid. Please click “Confirm” to process your appointment.</h2>
                            <h2 className={poppins.className}> You can access your receipt in your dashboard.</h2>
                        </div>
                        <form onSubmit={onHandleSubmitForm}>
                            <button type="submit">Confirm</button>
                        </form>
                    </div>
                    : null
            }
            <div className={styles.paymentContainer}>
                <div className={styles.booksSum}>
                    <h2 className={poppins.className}>Book Summary</h2>

                    {loading ? "Loading" : data.getAllPhysioId.map(({ email, profile }: any) => (
                        profile.map(({ firstname, lastname }: any) => (
                            <>
                                <div>
                                    <span className={oxygen.className}>Name: </span>
                                    <span className={oxygen.className}>{firstname} {lastname}</span>
                                </div>
                                <div>
                                    <span className={oxygen.className}>Email:</span>
                                    <span className={oxygen.className}>{email}</span>
                                </div></>
                        ))
                    ))}

                    <div>
                        <span className={oxygen.className}>Date: </span>
                        <span className={oxygen.className}>{format(new Date(selectedDate), "MMMM dd yyyy")}</span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Time: </span>
                        <span className={oxygen.className}>{time}</span>
                    </div>
                    <div>
                        <span className={oxygen.className}>Platform: </span>
                        <span className={oxygen.className}>Online</span>
                    </div>
                </div>
                <div className={styles.payment}>
                    <div>
                        <span className={oxygen.className}>Please Pay: </span>
                        <span className={oxygen.className}>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(175)}</span>
                    </div>
                    <PayPalButtons
                        style={{
                            color: "gold",
                            layout: "horizontal",
                            shape: "rect"
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [ {
                                    description: "Consultation",
                                    amount: {
                                        value: "175"
                                    },
                                } ],

                            })
                        }}

                        onApprove={async (data, actions) => {
                            setPaid(true)
                            await actions.order?.capture()
                        }}
                        onCancel={async (data, actions) => {
                            setPaid(() => false)
                        }} // to fixed
                    />
                </div>
            </div>
            <button onClick={close}>Cancel</button>
        </div>
    )
}
