import React, { FC } from 'react'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'
import styles from '@/styles/faqs/faqs.module.scss'
import { Poppins } from 'next/font/google'
import { useQuery } from '@apollo/client'
import { GetAllFAQs } from '@/util/faqs/faqs.query'
import FAQsCard from '@/components/faqs/faqsCard'
import Head from 'next/head'
const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


interface FAQs {
    faqsID: string
    faqs: string
    answer: string
}
const FAQs: FC = () => {

    const { loading, data, error } = useQuery(GetAllFAQs)
    return (
        <div className={styles.container}>
            <Head>
                <title>FAQs</title>
            </Head>
            <h2 className={poppins.className}>Frequently Asked Question</h2>
            {
                loading ? "Loading" : data.getAllFAQs.map(({ faqsID, faqs, answer }: FAQs) => (
                    <FAQsCard key={faqsID} question={faqs} answers={answer} />
                ))
            }
        </div>
    )
}

(FAQs as PageWithLayout).layout = MainLayout
export default FAQs