import dynamic from 'next/dynamic'
import React, { ReactNode, useState } from 'react'
import styles from '@/styles/layout/main.layout.module.scss'
import Image from 'next/image'
import { Oxygen, Poppins } from 'next/font/google'
import { TbMail, TbBrandInstagram } from 'react-icons/tb'


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

    const [ datesYear ] = useState(new Date().getFullYear())
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="" height={100} width={150} />
                </div>
                <div className={styles.sss}>
                    <span className={oxygen.className}><TbMail size={25} /> leophysiotherapyy@gmail.com</span>
                    <span className={oxygen.className}><TbBrandInstagram size={25} /> @restore.pt</span>
                </div>
                <div className={styles.contactContainer}>
                    <span className={poppins.className}>Contact number</span>
                    <span className={oxygen.className}>&copy;{datesYear} by Leonardo Physical Theraphy</span>
                    <span className={oxygen.className}>Rehabilitation Clinic</span>
                </div>
            </div>
        </div>
    )
}
