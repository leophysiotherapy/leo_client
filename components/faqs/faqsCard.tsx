import React, { useState } from 'react'
import styles from './faqs.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { TbChevronDown, TbChevronUp } from 'react-icons/tb'
const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function FAQsCard({ question, answers }: any) {

    const [ open, setOpen ] = useState(false)
    return (
        <div className={styles.container}>

            <div>
                <h2 className={poppins.className}>{question}</h2>
                <button onClick={() => setOpen(() => !open)}>
                    {open ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
                </button>
            </div>
            {open ? <p className={oxygen.className}>{answers}</p> : null}
        </div>
    )
}
