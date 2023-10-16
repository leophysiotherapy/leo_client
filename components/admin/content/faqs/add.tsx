import React, { SyntheticEvent, useState } from 'react'
import styles from './add.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { CreateMyFAQs } from '@/util/faqs/faqs.mutation'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function AddFAQs({ userID, close }: any) {

    const [ add, setAdd ] = useState({
        title: "",
        question: ""
    })

    const [ mutate ] = useMutation(CreateMyFAQs, {
        variables: {
            faqs: {
                faqs: add.title,
                answer: add.question
            },
            userId: userID
        },
        errorPolicy: "all",
        onCompleted: () => {
            alert("Successfully FAQs Addedd")
        }
    })

    const onHandleFAQs = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleFAQs}>
                <h2 className={poppins.className}>Add FAQs</h2>
                <div className={styles.con}>
                    <input className={oxygen.className} type="text" value={add.title} onChange={(e) => setAdd({ ...add, title: e.target.value })} />
                    <textarea className={oxygen.className} value={add.question} onChange={(e) => setAdd({ ...add, question: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
