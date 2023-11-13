import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useEffect, useState } from 'react'
import { TbPlus } from 'react-icons/tb'
import Head from 'next/head'
import styles from '@/styles/admin/content/faqs.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GetAllFAQs, GetFindFaqsQuestion } from '@/util/faqs/faqs.query'
import FAQsQuery from '@/components/admin/content/faqs/faqQuery'
import { GetServerSidePropsContext } from 'next'
import jwtDecode from 'jwt-decode'
import AddFAQs from '@/components/admin/content/faqs/add'
import { FAQSubscriptions } from '@/util/faqs/faqs.subscriptions'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const TableHead = [ "Question", "Answer", "Actions" ]

const FAQs: FC = ({ userID }: any) => {

    const [ add, setAdd ] = useState(false)
    const [ search, setSearch ] = useState("")
    const { loading, data, subscribeToMore } = useQuery(GetAllFAQs)
    const [ searchFAQs, { data: searchData } ] = useLazyQuery(GetFindFaqsQuestion, {
        variables: {
            search
        }
    })

    const onHandleAddFAqs = () => {
        setAdd(() => !add)
    }

    useEffect(() => {
        return subscribeToMore({
            document: FAQSubscriptions,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev


                const newAddedFAQs = subscriptionData.data.FAQsSubscriptions
                return Object.assign({}, {
                    getAllFAQs: [ ...prev.getAllFAQs, newAddedFAQs ]
                })
            }


        })
    }, [ subscribeToMore ])

    return (
        <div className={styles.container}>
            <Head>
                <title>FAQs</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>FAQs</h2>
            {
                add ? <div className={styles.overlay}>
                    <AddFAQs userID={userID} close={onHandleAddFAqs} />
                </div> : null
            }

            <div className={styles.search}>
                <span className={oxygen.className}>Search: </span>
                <input type="search" onChange={(e) => {
                    searchFAQs()
                    setSearch(e.target.value)
                }} />
            </div>
            <div className={styles.addFAqs}>
                <button onClick={() => setAdd(() => !add)}>
                    <TbPlus />
                    <span>Add</span>
                </button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {TableHead.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search ? searchData?.getFindFAQsQuestion.map(({ faqsID, faqs, answer }: any) => (
                            <FAQsQuery key={faqsID} faqsID={faqsID} faqs={faqs} answer={answer} />
                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getAllFAQs.map(({ faqsID, faqs, answer }: any) => (
                            <FAQsQuery key={faqsID} faqsID={faqsID} faqs={faqs} answer={answer} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


(FAQs as PageWithLayout).layout = DashboardLayout
export default FAQs

export const getServerSideProps = (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any

    const { userID } = jwtDecode(cookies) as any

    return {
        props: {
            userID: userID
        }
    }
}