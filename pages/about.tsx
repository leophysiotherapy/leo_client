import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import Head from 'next/head'
import { Oxygen, Poppins } from 'next/font/google'
import styles from '@/styles/about/about.module.scss'

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
            <h2 className={poppins.className}>LEONARDO PHYSICAL THERAPHY REHABILITATION CLINIC</h2>
            <div className={styles.mivission}>
                <div>
                    <h2 className={poppins.className}>Mission</h2>
                    <p className={oxygen.className}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias animi eveniet maxime numquam voluptate alias similique. Architecto tempora minus quae dolor ab laudantium, reiciendis commodi. Quam, voluptatum autem fuga aliquid assumenda similique harum blanditiis earum libero quibusdam non ratione natus quisquam. Saepe rerum beatae sed mollitia, libero quasi minima distinctio esse, asperiores ex voluptates commodi ratione consequatur facilis! Amet corporis minima delectus ipsa veniam aspernatur esse corrupti doloremque a deleniti aperiam architecto, et vel fugit eligendi laboriosam labore modi dolores! Maxime velit sunt adipisci nisi accusamus omnis quis fuga nobis necessitatibus eveniet. Voluptas eaque quidem est, molestias aperiam saepe.</p>
                </div>
                <div>
                    <h2 className={poppins.className}>Vission</h2>
                    <p className={oxygen.className}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias animi eveniet maxime numquam voluptate alias similique. Architecto tempora minus quae dolor ab laudantium, reiciendis commodi. Quam, voluptatum autem fuga aliquid assumenda similique harum blanditiis earum libero quibusdam non ratione natus quisquam. Saepe rerum beatae sed mollitia, libero quasi minima distinctio esse, asperiores ex voluptates commodi ratione consequatur facilis! Amet corporis minima delectus ipsa veniam aspernatur esse corrupti doloremque a deleniti aperiam architecto, et vel fugit eligendi laboriosam labore modi dolores! Maxime velit sunt adipisci nisi accusamus omnis quis fuga nobis necessitatibus eveniet. Voluptas eaque quidem est, molestias aperiam saepe.</p>
                </div>
            </div>
            <div className={styles.locations}>
                <h2 className={poppins.className}>Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.8324517163987!2d120.98958457520865!3d14.608618585878643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9ba1de029e7%3A0xdfba8380a7b4eee4!2sUST%20Blessed%20Pier%20Giorgio%20Frassati%20Building!5e0!3m2!1sen!2sph!4v1694351752658!5m2!1sen!2sph" width="100%" height="600" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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