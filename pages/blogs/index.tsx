import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/blogs/blogs.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BlogQuery, BlogSearch } from '@/util/blog/blog.query'
import Image from 'next/image'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const Blogs: FC = () => {

    const router = useRouter()
    const { loading, data } = useQuery(BlogQuery)
    const [ search, setSearch ] = useState("")
    const [ BlogsSearch, { data: searchData } ] = useLazyQuery(BlogSearch, {
        variables: {
            search
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Blogs</title>
            </Head>
            <h2 className={poppins.className}>Blogs</h2>
            <div className={styles.search}>
                <span className={oxygen.className}>Search: </span>
                <input type="search" onChange={(e) => {
                    BlogsSearch();
                    setSearch(e.target.value)
                }} />
            </div>
            <div className={styles.blogContainer}>
                {search ? searchData?.getBlogSearch.map(({ title, content, blogsID, image, createdAt }: any) => (
                    <div className={styles.blogCard} key={blogsID}>
                        <div className={styles.backImage}>
                        <Image src={image} alt="physical therapy" fill style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                imageResolution: "from-image"
                            }} />
                        </div>
                        <div className={styles.title}>
                            <h2 className={poppins.className} onClick={() => router.push(`/blogs/${blogsID}`)}>{title}</h2>
                        </div>
                        <div className={styles.blogDate}>
                            <span className={oxygen.className}>
                                {format(new Date(createdAt), "MMMM dd, yyyy")}
                            </span>
                        </div>
                    </div>
                )) : loading ? "Loading" : data?.getAllBlogsPost.map(({ title, content, blogsID, image, createdAt }: any) => (
                    <div className={styles.blogCard} key={blogsID}>
                        <div className={styles.backImage}>
                            <Image src={image} alt="physical therapy" fill style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                imageResolution: "from-image"
                            }} />
                        </div>
                        <div>
                            <div className={styles.title}>
                                <h2 className={poppins.className} onClick={() => router.push(`/blogs/${blogsID}`)}>{title}</h2>
                            </div>
                            <div className={styles.blogDate}>
                                <span className={oxygen.className}>
                                    {format(new Date(createdAt), "MMMM dd, yyyy")}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

(Blogs as PageWithLayout).layout = MainLayout
export default Blogs