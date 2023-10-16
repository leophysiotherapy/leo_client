import { Oxygen } from 'next/font/google'
import React, { useState } from 'react'
import { TbTrash, TbEdit } from 'react-icons/tb'
import styles from '@/styles/admin/content/faqs.module.scss'
import DeleteFAQs from './delete'
import EditFAQs from './edit'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})



export default function FAQsQuery({ faqsID, faqs, answer }: any) {

    const [ deleteFaqs, setDeleteFaqs ] = useState(false)
    const [ editFaqs, setEditFaqs ] = useState(false)


    const onHnadleDeleteFaqs = () => {
        setDeleteFaqs(() => !deleteFaqs)
    }

    const onHandleEditFAQs = () => {
        setEditFaqs(() => !editFaqs)
    }

    return (
        <tr>

            <td className={oxygen.className}>{faqs}</td>
            <td className={oxygen.className}>{answer}</td>
            <td>
                {
                    deleteFaqs ? <div className={styles.overlay}>
                        <DeleteFAQs close={onHnadleDeleteFaqs} faqsID={faqsID} />
                    </div> : null
                }
                {
                    editFaqs ? <div className={styles.overlay}>
                        <EditFAQs close={onHandleEditFAQs} faqsID={faqsID} title={faqs} answer={answer} />
                    </div> : null
                }
                <button onClick={onHandleEditFAQs}>
                    <TbEdit size={23} />
                </button>
                <button onClick={onHnadleDeleteFaqs}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
