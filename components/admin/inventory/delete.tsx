import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeletEquipment } from '@/util/inventory/equipment.mutation'
import { GetAllInventory } from '@/util/inventory/equipment.query'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function UserDelete({ close, equipmentID }: any) {

    const [ mutate ] = useMutation(DeletEquipment, {
        variables: {
            equipmentId: equipmentID
        },
        onCompleted: () => {
            alert("Successfully Deleted");
        },
        errorPolicy: "all",
        refetchQueries: [ GetAllInventory ]
    })


    const onHandleDeleteInventory = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()

    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleDeleteInventory}>
                <span className={oxygen.className}>Do you want to delete this user?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
