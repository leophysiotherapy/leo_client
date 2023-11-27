import React, { useState } from 'react'
import { TbEdit, TbTrash } from 'react-icons/tb'
import { format } from 'date-fns'
import { Oxygen } from 'next/font/google'
import styles from '@/styles/admin/inventory/inventory.module.scss'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
import EditEquipment from './edit'
import DeleteEquipment from './delete'
import { utcToZonedTime } from 'date-fns-tz'

export default function InventoryQuery({ name, quantity, expiredDate, equipmentID, description }: any) {

    const [ editInventory, setEditInventory ] = useState(false)
    const [ deleteInventory, setDeleteInventory ] = useState(false)

    const onHandleDeleteInventory = () => {
        setDeleteInventory(() => !deleteInventory)
    }

    const onHandleEditInventory = () => {
        setEditInventory(() => !editInventory)
    }


    const currentDate = new Date()
    const expirationDate = new Date(expiredDate)
    const almostExpiredDays: number = 7
    const almostExpiredDate = new Date(expirationDate);
    almostExpiredDate.setDate(expirationDate.getDate() - almostExpiredDays);
    expirationDate.setDate(currentDate.getDate() + almostExpiredDays)


    return (
        <tr style={currentDate >= expirationDate && currentDate >= almostExpiredDate || currentDate <= expirationDate && currentDate >= almostExpiredDate ? { color: "red" } : {}}>
            <td className={oxygen.className}>{name}</td>
            <td className={oxygen.className}>{quantity}</td>
            <td className={oxygen.className}>{format(utcToZonedTime(expiredDate, "America/Los_Angeles"), "MMMM dd, yyyy")}</td>
            <td>
                {
                    deleteInventory ? <div className={styles.overlay}>
                        <DeleteEquipment equipmentID={equipmentID} close={onHandleDeleteInventory} />
                    </div> : null
                }
                {
                    editInventory ? <div className={styles.overlay}>
                        <EditEquipment equipmentID={equipmentID} name={name} quantity={quantity} expireDate={expiredDate} description={description}
                            close={onHandleEditInventory}
                        />
                    </div> : null
                }
                <button onClick={() => setEditInventory(() => !editInventory)}>
                    <TbEdit size={23} />
                </button>
                <button onClick={() => setDeleteInventory(() => !deleteInventory)}>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
