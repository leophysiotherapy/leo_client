import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { DeletePreForm } from '@/util/prediag/prediag.mutation'
import { GetAllPreDiagForm } from '@/util/prediag/prediag.query'



const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})




export default function DeletePreDiag({ id, close }: any) {



    const [ mutate ] = useMutation(DeletePreForm, {
        variables: {
            prediagnosticId: id,
        },
        onCompleted: () => {
            alert("Successfully Deleted")
        },
        errorPolicy: "all",
        refetchQueries: [ GetAllPreDiagForm ]
    })

    const onHandleDeletePreDiag = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleDeletePreDiag}>
                <span className={oxygen.className}>Do you want to delete this Pre-Diagnostic?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}
