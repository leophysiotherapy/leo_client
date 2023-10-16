import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { UpdateMyFAQs } from '@/util/faqs/faqs.mutation'
import { GetAllFAQs } from '@/util/faqs/faqs.query'
import { useMutation } from '@apollo/client'


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
export default function EditFAQs({ close, faqsID, answer, title }: any) {


    const [ edit, setEdit ] = useState({
        title: title,
        question: answer
    })

    const [ EditMutation ] = useMutation(UpdateMyFAQs)
    const onHandleFAQs = (e: SyntheticEvent) => {
        e.preventDefault()
        EditMutation({
            variables: {
                faqs: {
                    faqs: edit.title,
                    answer: edit.question
                },
                faqsId: faqsID
            },
            onCompleted: () => {
                alert("Successfully Updated Faqs")
            },
            refetchQueries: [ GetAllFAQs ]
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onHandleFAQs}>
                <h2 className={poppins.className}>Edit FAQs</h2>
                <div className={styles.con}>
                    <input className={oxygen.className} type="text" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                    <textarea className={oxygen.className} value={edit.question} onChange={(e) => setEdit({ ...edit, question: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
