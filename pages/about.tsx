import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import styles from '@/styles/about/about.module.scss'
import Image from 'next/image'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const teams = [
    { name: "Junny boy", expertise: "Expert", descriptions: "descriptions" },
    { name: "Junny boy", expertise: "Expert", descriptions: "descriptions" },
    { name: "Junny boy", expertise: "Expert", descriptions: "descriptions" },
]
const Abouts: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>About</title>
            </Head>

            <div className={styles.about}>
                <h2 className={poppins.className}>LEONARDO PHYSICAL THERAPHY REHABILITATION CLINIC</h2>
                <p className={oxygen.className}>Our purpose at Restore PT is simple: we want to help you achieve full functionality and well-being. Whether managing pain, improving mobility, or improving the overall quality of life, our devoted team of healthcare specialists creates individualized treatment regimens to meet your needs. We{"'"}re more than just a rehab facility; we{"'"}re your companions on the road to excellent health and a life full of vigor and joy. Your health is our main priority, and we{"'"}ll be there for you every step of the way
                </p>
            </div>
            <div className={styles.mivission}>
                <div>
                    <h2 className={poppins.className}>Mission</h2>
                    <p className={oxygen.className}>Our solid aim at Restore PT is to empower and uplift our valued customers and patients on their journey to optimal physical well-being. We are dedicated to treating your pain-related issues, poor mobility, or a desire to regain strength and functionality. Our experienced healthcare specialists are committed to providing you with the most individualized care and attention possible.</p>
                </div>
                <div>
                    <h2 className={poppins.className}>Vission</h2>
                    <p className={oxygen.className}>Restore PT aims to lead the way in changing healthcare by embracing the uniqueness of everyone’s road to recovery. We reject the idea of one-size-fits-all solutions and instead take the time to understand your unique circumstances, concerns, and goals. We strive to be a light of hope for people struggling with the weight of pain by adapting our treatment plans to your specific needs.</p>
                </div>
            </div>
            <div className={styles.locations}>
                <h2 className={poppins.className}>Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.6245244326174!2d-118.15758552363712!3d33.92506202443397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2cd0090d9f07b%3A0xb60d9c2df411bacb!2s7860%20Imperial%20Hwy.%2C%20Downey%2C%20CA%2090242%2C%20USA!5e0!3m2!1sen!2sph!4v1697342221282!5m2!1sen!2sph" width="600" height="450" style={{
                    border: "0px",
                }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className={styles.team}>
                <h2 className={poppins.className}>Meet Our Team</h2>
                <div className={styles.teamGrid}>
                    {teams.map(({ name, descriptions, expertise }) => (
                        <div className={styles.teamCard} key={name}>
                            <div className={styles.avatar}>Avatar</div>
                            <h2 className={`${styles.titleName} ${poppins.className}`}>{name}, {expertise}</h2>
                            <div className={styles.teamInfo}>
                                <span>{descriptions}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="" height={150} width={250} />
                </div>
                <div className={styles.contactContainer}>
                    <h2 className={poppins.className}>Contact Us</h2>
                    <span className={oxygen.className}>johndoe@example.com</span>
                    <span className={oxygen.className}>Phone Number</span>
                </div>
            </div>
        </div>
    )
}


(Abouts as PageWithLayout).layout = MainLayout
export default Abouts