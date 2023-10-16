import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { UpdateBlogPost } from '@/util/blog/blog.mutation'
import { useMutation } from '@apollo/client'
import { BlogQuery } from '@/util/blog/blog.query'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function BlogEdit({ blogsID, title, content, expertise, close }: any) {


    const [ edit, setEdit ] = useState({
        title: title,
        content: content,
        expertise: expertise
    })


    const [ mutate ] = useMutation(UpdateBlogPost, {
        variables: {
            blog: {
                content: edit.content,
                expertise: edit.expertise,
                title: edit.title
            },
            blogsId: blogsID
        },
        onCompleted: () => {
            alert("Successfully Blog Updated")
        },
        refetchQueries: [ BlogQuery ]
    })

    const onHandleBlogs = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleBlogs}>
                <h2 className={poppins.className}>Edit Blogs</h2>
                <div className={styles.con}>
                    <input className={oxygen.className} type="text" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                    <input className={oxygen.className} type="text" value={edit.expertise} onChange={(e) => setEdit({ ...edit, expertise: e.target.value })} />
                    <textarea className={oxygen.className} value={edit.content} onChange={(e) => setEdit({ ...edit, content: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
