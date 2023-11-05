import { Oxygen } from 'next/font/google'
import React, { useState } from 'react'
import { TbEdit, TbTrash } from 'react-icons/tb'
import ServiceEdit from './edit'
import styles from '@/styles/admin/content/services.module.scss'
import ServiceDelete from './delete'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function ServiceQuery({ services, servicesID, descriptions }: { servicesID: any, services: any, descriptions: string }) {

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
            <td className={oxygen.className}>{services}</td>
            <td className={oxygen.className}>{descriptions}</td>
            <td>
                {
                    deleteBlog ? <div className={styles.overlay}>
                        <ServiceDelete servicesID={servicesID} close={onHandleDeleteBlog} />
                    </div> : null
                }
                {
                    edit ?
                        <div className={styles.overlay}>
                            <ServiceEdit close={onHandleEditBlog} servicesID={servicesID} services={services} descriptions={descriptions} />
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
