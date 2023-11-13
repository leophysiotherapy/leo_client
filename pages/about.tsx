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
    { name: "Sofhia Lacandola", avatar: "/avatar/sofhia.JPG", expertise: "Expert", descriptions: "Therapist" },
    { name: "Shane Ivan Tiu", avatar: "/avatar/sheyn.jpg", expertise: "Expert", descriptions: "Therapist" },
    { name: "Marc Ramos", avatar: "/avatar/marc.jpg", expertise: "Expert", descriptions: "Therapist" },
    { name: "Rylan Tioco", avatar: "/avatar/ry.jpg", expertise: "Expert", descriptions: "Therapist" },
]
const Abouts: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>About</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>

            <div className={styles.about}>
                <div className={styles.video}>
                    <video muted loop style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "cover"
                    }} autoPlay={true}>
                        <source src="/video/finalvideo.mov" />
                    </video>
                </div>
                <h2 className={poppins.className}>LEONARDO PHYSICAL THERAPY REHABILITATION CLINIC</h2>
                <p className={oxygen.className}>Our purpose at Leonardo Physical Therapy is simple: we want to help you achieve full functionality and well-being. Whether managing pain, improving mobility, or improving the overall quality of life, our devoted team of healthcare specialists creates individualized treatment regimens to meet your needs. We{"'"}re more than just a rehab facility; we{"'"}re your companions on the road to excellent health and a life full of vigor and joy. Your health is our main priority, and we{"'"}ll be there for you every step of the way

                </p>
            </div>
            <div className={styles.mivission}>
                <div>
                    <h2 className={poppins.className}>Mission</h2>
                    <p className={oxygen.className}>
                        Our solid aim at Leonardo Physical Therapy is to empower and uplift our valued customers and patients on their journey to optimal physical well-being. We are dedicated to treating your pain-related issues, poor mobility, or a desire to regain strength and functionality. Our experienced healthcare specialists are committed to providing you with the most individualized care and attention possible.</p>
                </div>
                <div>
                    <h2 className={poppins.className}>Vision</h2>
                    <p className={oxygen.className}>Leonardo Physical Therapy aims to change healthcare by embracing the uniqueness of everyone{"'"}s road to recovery. We reject the idea of one-size-fits-all solutions and instead take the time to understand your unique circumstances, concerns, and goals. We strive to be a light of hope for people struggling with the weight of pain by adapting our treatment plans to your specific needs.
                    </p>
                </div>
            </div>
            <div className={styles.locations}>
                <h2 className={poppins.className}>Location</h2>
                <iframe className={styles.locaitonFrame} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.6245244326174!2d-118.15758552363712!3d33.92506202443397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2cd0090d9f07b%3A0xb60d9c2df411bacb!2s7860%20Imperial%20Hwy.%2C%20Downey%2C%20CA%2090242%2C%20USA!5e0!3m2!1sen!2sph!4v1697342221282!5m2!1sen!2sph" width="600" height="450" style={{
                    border: "0px",
                }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className={styles.team}>
                <h2 className={poppins.className}>Meet Our Team</h2>
                <div className={styles.teamGrid}>
                    {teams.map(({ name, descriptions, expertise, avatar }) => (
                        <div className={styles.teamCard} key={name}>
                            <div className={styles.avatar}>
                                <Image src={avatar} alt={name} height={150} width={150} style={{
                                    objectPosition: "center",
                                    overflow: 'hidden',
                                    objectFit: "cover"
                                }} />
                            </div>
                            <h2 className={`${styles.titleName} ${poppins.className}`}>{name},</h2>
                            <div className={styles.teamInfo}>
                                <span>{descriptions}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


(Abouts as PageWithLayout).layout = MainLayout
export default Abouts