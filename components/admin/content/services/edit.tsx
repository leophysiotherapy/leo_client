import React, { SyntheticEvent, useState } from 'react'
import styles from './edit.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { gql, useMutation } from '@apollo/client'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

export default function ServiceEdit({ services, servicesID, descriptions, close }: any) {


    const [ edit, setEdit ] = useState({
        title: services,
        content: descriptions,
    })


    const [ mutate ] = useMutation(gql`mutation UpdateServices(
        $servicesId: ID!
        $descriptions: String!
        $services: String!
        $file: Upload
      ) {
        updateServices(
          servicesID: $servicesId
          descriptions: $descriptions
          services: $services
          file: $file
        ) {
          services
          price
          descriptions
          servicesID
        }
      }
      `, {
        variables: {
            services: edit.title,
            descriptions: edit.content,
            servicesId: servicesID
        },
        onCompleted: () => {
            alert("Successfully Services Updated")
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
                <h2 className={poppins.className}>Edit Services</h2>
                <div className={styles.con}>
                    <input className={oxygen.className} type="text" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                    <textarea className={oxygen.className} value={edit.content} onChange={(e) => setEdit({ ...edit, content: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
