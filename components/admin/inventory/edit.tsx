import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Poppins } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { UpdateEquipment } from '@/util/inventory/equipment.mutation'
import { GetAllInventory } from '@/util/inventory/equipment.query'



const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function InventoryAdd({ close, equipmentID, name, expiredDate, quantity, description }: any) {

    const [ inventory, setInventoryAdd ] = useState({
        name,
        quantity,
        expiredDate,
        description
    })


    const [ EquipmentMutate ] = useMutation(UpdateEquipment)

    const onHandleInventoryForm = (e: SyntheticEvent) => {
        e.preventDefault();
        EquipmentMutate({
            variables: {
                equipmentId: equipmentID,
                equipment: {
                    description: inventory.description,
                    expireDate: inventory.expiredDate,
                    name: inventory.name,
                    quantity: parseInt(inventory.quantity)
                }
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Inventory Updated")
            },
            refetchQueries: [ GetAllInventory ]
        })
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Edit Equipment</h2>
            <form onSubmit={onHandleInventoryForm}>
                <div>
                    <input type="text" value={inventory.name} placeholder='Name' onChange={(e) => setInventoryAdd({ ...inventory, name: e.target.value })} />
                    <input type="text" value={inventory.quantity} placeholder='Quantity'
                        onChange={(e) => setInventoryAdd({ ...inventory, quantity: e.target.value })} />
                </div>
                <div>
                    <input className={styles.expiredDate} type="date" value={inventory.expiredDate} placeholder='Email' onChange={(e) => setInventoryAdd({ ...inventory, expiredDate: e.target.value })} />
                </div>
                <div>
                    <textarea value={inventory.description} onChange={(e) => setInventoryAdd({ ...inventory, description: e.target.value })} />
                </div>
                <div className={styles.formBtnGrp}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
