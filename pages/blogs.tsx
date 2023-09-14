import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import Head from 'next/head'
import styles from '@/styles/blogs/blogs.module.scss'
import { Poppins } from 'next/font/google'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})
const Blogs: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blogs</title>
            </Head>
            <h2 className={poppins.className}>Blogs</h2>
        </div>
    )
}

(Blogs as PageWithLayout).layout = MainLayout
export default Blogs