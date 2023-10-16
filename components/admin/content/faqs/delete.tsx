import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteMyFAQs } from '@/util/faqs/faqs.mutation'
import { GetAllFAQs } from '@/util/faqs/faqs.query'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function DeleteFAQs({ close, faqsID }: any) {

    const [ deleteMutation ] = useMutation(DeleteMyFAQs, {
        variables: {
            faqsId: faqsID
        },
        refetchQueries: [ GetAllFAQs ]
    })
    const onHandleFAQs = (e: SyntheticEvent) => {
        e.preventDefault();
        deleteMutation()
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleFAQs}>
                <span className={oxygen.className}>Do you want to delete this faqs?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
