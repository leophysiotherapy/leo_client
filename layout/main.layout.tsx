import dynamic from 'next/dynamic'
import React, { ReactNode, useState } from 'react'
import styles from '@/styles/layout/main.layout.module.scss'
import Image from 'next/image'
import { Oxygen, Poppins } from 'next/font/google'
import { TbMail, TbBrandInstagram, TbPhone } from 'react-icons/tb'
import TermsAndCondition from '@/components/tc'


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
const Header = dynamic(() => import("@/components/Header/header"))



export default function MainLayout({ children }: { children: ReactNode }) {


    const [ isOpen, setIsOpen ] = useState(false)
    const [ datesYear ] = useState(new Date().getFullYear())


    const onHandleTC = () => {
        setIsOpen(() => !isOpen)
    }
    return (
        <div className={styles.container}>
            {
                isOpen ? <div className={styles.overlay}>
                    <TermsAndCondition close={onHandleTC} />
                </div> : null
            }
            <Header />
            {children}
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="" height={100} width={150} />
                </div>
                <div className={styles.sss}>
                    <span className={oxygen.className}><TbMail size={25} /> leonardophysiotherapy@gmail.com</span>
                    <span className={oxygen.className}><TbBrandInstagram size={25} /> @restore.pt</span>
                    <span className={oxygen.className}><TbPhone size={25} />+16264847725</span>
                </div>
                <div className={styles.contactContainer}>
                    <span className={poppins.className}><button onClick={onHandleTC}>Terms and Conditions</button></span>
                    <span className={oxygen.className}>&copy;{datesYear} by Leonardo Physical Therapy</span>
                    <span className={oxygen.className}>Rehabilitation Clinic</span>
                </div>
            </div>
            <div className={styles.footers}>
                <span className={oxygen.className}>All photos are courtesy of the clinic.</span>
            </div>
        </div>
    )
}
