import React, { useState } from 'react'
import { format } from 'date-fns'
import { TbEdit, TbTrash } from 'react-icons/tb'
import { Oxygen } from 'next/font/google'
import styles from '@/styles/admin/content/blogs.module.scss'
import BlogDelete from './delete'
import BlogEdit from './edit'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function BlogQuery({ blogsID, author, title, date, expertise, content }: any) {


    const [ edit, setEdit ] = useState(false)
    const [ deleteBlog, setDeleteBlog ] = useState(false)

    const onHandleEditBlog = () => {
        setEdit(() => !edit)
    }

    const onHandleDeleteBlog = () => {
        setDeleteBlog(() => !deleteBlog)
    }
    return (
        <tr>
            <td className={oxygen.className}>{title}</td>
            <td className={oxygen.className}>{author}</td>
            <td className={oxygen.className}>{expertise}</td>
            <td className={oxygen.className}>{format(new Date(date), "MM/dd/yyyy")}</td>
            <td>
                {
                    deleteBlog ? <div className={styles.overlay}>
                        <BlogDelete blogsID={blogsID} close={onHandleDeleteBlog} />
                    </div> : null
                }
                {
                    edit ?
                        <div className={styles.overlay}>
                            <BlogEdit close={onHandleEditBlog} blogsID={blogsID} title={title} content={content} expertise={expertise} />
                        </div> : null
                }
                <button onClick={onHandleEditBlog}>
                    <TbEdit size={23} />
                </button>
                <button onClick={onHandleDeleteBlog}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
