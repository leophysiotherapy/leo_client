import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeleteBlogPost } from '@/util/blog/blog.mutation'
import { BlogQuery } from '@/util/blog/blog.query'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function BlogDelete({ blogsID, close }: any) {


    const [ mutate ] = useMutation(DeleteBlogPost, {
        variables: {
            blogsId: blogsID
        },
        onCompleted: () => {
            alert("Successfully Delete Blog Post")
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
                <span className={oxygen.className}>Do you want to delete this blog post?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
