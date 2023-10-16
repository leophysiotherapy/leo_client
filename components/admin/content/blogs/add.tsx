import React, { SyntheticEvent, useState } from 'react'
import styles from './add.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { CreatBlogPost } from '@/util/blog/blog.mutation'
import { BlogQuery } from '@/util/blog/blog.query'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function AddBlog({ close, userID }: any) {

    const [ selectImage, setSelectImage ] = useState(null)
    const [ add, setAdd ] = useState({
        title: "",
        content: "",
        expertise: "",
    })



    const onFileChange = (e: any) => {
        const file = e.target.files[ 0 ]

        if (!file) return

        setSelectImage(file)
    }


    const [ mutate ] = useMutation(CreatBlogPost, {

        variables: {
            userId: userID,
            blog: {
                content: add.content,
                file: selectImage,
                title: add.title,
                expertise: add.expertise
            }
        },
        onCompleted: () => {
            alert("Successfully Blog Added");
            setAdd({
                title: "",
                content: "",
                expertise: ""
            })
            setSelectImage(null)
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
                <h2 className={poppins.className}>Add Blog</h2>
                <div className={styles.con}>
                    <input className={`${oxygen.className} ${styles.inp}`} placeholder="Title" type="text" value={add.title} onChange={(e) => setAdd({ ...add, title: e.target.value })} />
                    <input className={`${oxygen.className} ${styles.inp}`} placeholder="Expertise" type="text" value={add.expertise} onChange={(e) => setAdd({ ...add, expertise: e.target.value })} />
                    <input type="file" accept='image/*' onChange={onFileChange} />
                    <textarea className={oxygen.className} placeholder="content" value={add.content} onChange={(e) => setAdd({ ...add, content: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
