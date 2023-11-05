import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import styles from '@/styles/admin/content/blogs.module.scss'
import Head from 'next/head'
import { TbPlus } from 'react-icons/tb'
import { Poppins } from 'next/font/google'
import AddBlog from '@/components/admin/content/blogs/add'
import jwtDecode from 'jwt-decode'
import { GetServerSidePropsContext } from 'next'
import BlogQuery from '@/components/admin/content/blogs/blogQuery'
import { BlogQuery as BlogQueries, BlogSearch } from '@/util/blog/blog.query'
import { useQuery, useLazyQuery } from '@apollo/client'

const Thead = [ "Title", "Author", "Date", "Actions" ]


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const Blogs: FC = ({ userID }: any) => {

    const [ add, setAdd ] = useState(false)
    const [ search, setSearch ] = useState("")
    const { loading, data } = useQuery(BlogQueries)



    const [ searchBlog, { data: searchData } ] = useLazyQuery(BlogSearch, {
        variables: {
            search
        }
    })

    const onHandleClose = () => {
        setAdd(() => !add)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Blogs</title>
            </Head>
            {
                add ? <div className={styles.overlay}>
                    <AddBlog close={onHandleClose} userID={userID} />
                </div> : null
            }
            <div className={styles.search}>
                <input type="search" placeholder='Search' onChange={(e) => {
                    searchBlog();
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
                            {Thead.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search ? searchData?.getBlogSearch.map(({ blogsID, title, author, expertise, createdAt, content }: any) => (
                            author.map(({ profile }: any) => (
                                profile.map(({ fullname }: any) => (
                                    <BlogQuery key={blogsID} blogsID={blogsID} title={title} expertise={expertise} author={fullname} date={createdAt} content={content} />
                                ))
                            ))
                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getAllBlogsPost.map(({ blogsID, title, author, expertise, createdAt, content }: any) => (
                            author.map(({ profile }: any) => (
                                profile.map(({ fullname }: any) => (
                                    <BlogQuery key={blogsID} blogsID={blogsID} title={title} expertise={expertise} author={fullname} date={createdAt} content={content} />
                                ))
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

(Blogs as PageWithLayout).layout = DashboardLayout
export default Blogs

export const getServerSideProps = (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any

    const { userID } = jwtDecode(cookies) as any

    return {
        props: {
            userID: userID
        }
    }
}