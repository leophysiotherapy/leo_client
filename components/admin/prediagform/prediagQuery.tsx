import { Oxygen } from 'next/font/google'
import React, { useState } from 'react'
import { TbEye, TbTrash } from 'react-icons/tb'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/router'
import DeletePreDiag from './delete'
import styles from '@/styles/admin/prescription/prediag.module.scss'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function PreDiagFormQuery({ date, user, id }: any) {

    const router = useRouter();
    const [ deleteInventory, setDeleteInventory ] = useState(false)

    const onHandleDeleteInventory = () => {
        setDeleteInventory(() => !deleteInventory)
    }
    return (
        <tr>
            <td className={oxygen.className}>{format(utcToZonedTime(date, "America/Los_Angeles"), "MM/dd/yyyy hh:mm aa")}</td>
            {user.map(({ profile }: any) => (
                profile.map(({ fullname }: any) => (
                    <td key={fullname}>{fullname}</td>
                ))
            ))}
            <td>
                <button onClick={() => router.push(`/administrator/diagnostic/pre-diagnostic/${id}`)}>
                    <TbEye size={23} />
                </button>
                <button onClick={onHandleDeleteInventory}>
                    <TbTrash size={23} />
                </button>
                {
                    deleteInventory ?
                        <div className={styles.overlay}>
                            <DeletePreDiag id={id} close={onHandleDeleteInventory} />
                        </div> : null
                }
            </td>
        </tr>
    )
}
