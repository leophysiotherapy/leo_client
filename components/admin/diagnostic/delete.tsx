import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeletePrescription } from '@/util/prescription/prescription.mutation'
import { GetAllPrescription } from '@/util/prescription/prescription.query'


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function PrescriptionsDelete({ close, prescriptionID }: any) {

    const [ mutate ] = useMutation(DeletePrescription, {
        variables: {
            prescriptionId: prescriptionID
        },
        onCompleted: () => {
            alert("Successfully Deleted");
        },
        errorPolicy: "all",
        refetchQueries: [ GetAllPrescription ]
    })


    const onHandleDeleteInventory = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()

    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleDeleteInventory}>
                <span className={oxygen.className}>Do you want to delete this Prescription?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
