import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { UpdateBlogPost } from '@/util/blog/blog.mutation'
import { useMutation } from '@apollo/client'
import { BlogQuery } from '@/util/blog/blog.query'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading...</p>
})
import 'react-quill/dist/quill.snow.css';




const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function BlogEdit({ blogsID, title, content, expertise, close }: any) {


    const [ selectImage, setSelectImage ] = useState(null)
    const [ edit, setEdit ] = useState({
        title: title,
        content: content,
        expertise: expertise
    })
    const [ contents, setContent ] = useState(content)



    const onFileChange = (e: any) => {
        const file = e.target.files[ 0 ]

        if (!file) return

        setSelectImage(file)
    }




    const [ mutate ] = useMutation(UpdateBlogPost, {
        variables: {
            blog: {
                content: contents,
                expertise: edit.expertise,
                title: edit.title,
                file: selectImage
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
                    <input className={`${oxygen.className} ${styles.inp}`} type="text" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                    <input type="file" accept='image/*' onChange={onFileChange} />
                    <ReactQuill value={contents} onChange={setContent} style={{ height: "280px" }} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
