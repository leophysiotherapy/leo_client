import React, { SyntheticEvent } from 'react'
import styles from './delete.module.scss'
import { Oxygen } from 'next/font/google'
import { gql, useMutation } from '@apollo/client'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function BlogDelete({ servicesID, close }: any) {


    const [ mutate ] = useMutation(gql`mutation DeleteServices($servicesId: ID!) {
        deleteServices(servicesID: $servicesId) {
          servicesID
          services
          price
          descriptions
        }
      }`, {
        variables: {
            servicesId: servicesID
        },
        onCompleted: () => {
            alert("Successfully Delete Services")
        },
        refetchQueries: [ {
            query: gql`query GetAllServices {
                getAllServices {
                  services
                  servicesID
                }
              }`
        } ]
    })

    const onHandleBlogs = (e: SyntheticEvent) => {
        e.preventDefault();
        mutate()
    }
    return (
        <div className={styles.container}>
            <form onSubmit={onHandleBlogs}>
                <span className={oxygen.className}>Do you want to delete this service?</span>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
