import React, { SyntheticEvent, useState } from 'react'
import styles from './add.module.scss'
import { Poppins } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { CreateEquipment } from '@/util/inventory/equipment.mutation'
import { GetAllInventory } from '@/util/inventory/equipment.query'



const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function InventoryAdd({ close, userID }: any) {

    const [ inventory, setInventoryAdd ] = useState({
        name: "",
        quantity: "" as unknown as number,
        inventories: "",
        expiredDate: "",
        description: ""
    })


    const [ EquipmentMutate ] = useMutation(CreateEquipment)

    const onHandleInventoryForm = (e: SyntheticEvent) => {
        e.preventDefault();
        EquipmentMutate({
            variables: {
                userId: userID,
                equipment: {
                    description: inventory.description,
                    expireDate: inventory.expiredDate,
                    name: inventory.name,
                    quantity: inventory.quantity
                },
                inventory: inventory.inventories
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Successfully Inventory Added")
            },
            refetchQueries: [ GetAllInventory ]
        })
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Add Inventory</h2>
            <form onSubmit={onHandleInventoryForm}>
                <div>
                    <input type="text" value={inventory.name} placeholder='Name' onChange={(e) => setInventoryAdd({ ...inventory, name: e.target.value })} />
                    <input type="text" value={inventory.quantity} placeholder='Quantity'
                        onChange={(e) => {
                            setInventoryAdd({ ...inventory, quantity: parseInt(e.target.value) })
                            if (isNaN(parseInt(e.target.value))) {
                                setInventoryAdd({ ...inventory, quantity: "" as unknown as number })
                            }
                        }} />
                </div>
                <div>
                    <select onChange={(e) => setInventoryAdd({ ...inventory, inventories: e.target.value })}>
                        <option value="-">-</option>
                        <option value="equipment">Equipment</option>
                        <option value="supplies">Supplies</option>
                    </select>
                </div>
                <div>
                    <input className={styles.expiredDate} type="date" value={inventory.expiredDate} placeholder='Email' onChange={(e) => setInventoryAdd({ ...inventory, expiredDate: e.target.value })} />
                </div>
                <div>
                    <textarea value={inventory.description} onChange={(e) => setInventoryAdd({ ...inventory, description: e.target.value })} />
                </div>
                <div className={styles.formBtnGrp}>
                    <button onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
