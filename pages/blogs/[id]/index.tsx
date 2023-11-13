import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'
import { BlogQuery } from '@/util/blog/blog.query'
import { client } from '@/lib/apolloWrapper'
import { useRouter } from 'next/router'
import { GetStaticPropsContext } from 'next'
import { gql } from '@apollo/client'
import Image from 'next/image'
import Head from 'next/head'
import styles from '@/styles/blogs/blogsid.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import parse from 'html-react-parser'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export const getStaticPaths = async () => {
    const { data: { getAllBlogsPost } } = await client.query({
        query: BlogQuery
    })

    const paths = getAllBlogsPost.map(({ blogsID }: { blogsID: string }) => {
        return { params: { id: blogsID } }
    })

    return {
        paths, fallback: true
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const idPrams = context.params?.id


    const { data: { getBlogsById } } = await client.query({
        query: gql`query GetBlogsById($blogsId: ID!) {
            getBlogsById(blogsID: $blogsId) {
              title
              image
              expertise
              createdAt
              content
              blogsID
              author {
                profile {
                  fullname
                }
              }
            }
          }`,
        variables: {
            blogsId: idPrams
        }
    })


    return {
        props: {
            blogs: getBlogsById
        }
    }
}

const BlogsID: FC = ({ blogs }: any) => {

    const router = useRouter()

    if (router.isFallback) {
        return (<p>Loading</p>)
    }

    return (
        blogs.map(({ blogsID, title, image, content }: { blogsID: string, title: string, image: string, content: string }) => (
            <div className={styles.container} key={blogsID}>
                <Head>
                    <title>{title}</title>
                </Head>
                <button onClick={() => router.back()}>Back to blogs</button>
                <div className={styles.imageContainer}>
                    <h2 className={poppins.className}>{title}</h2>
                    <Image src={image} priority height={500} width={500} alt="" style={{
                        width: "700px",
                        height: "auto",
                        padding: "0 20px"
                    }} />
                </div>
                <div className={styles.pContainer}>
                    <p className={oxygen.className}>{parse(content)}</p>
                </div>
            </div>
        ))
    )
}

(BlogsID as PageWithLayout).layout = MainLayout
export default BlogsID