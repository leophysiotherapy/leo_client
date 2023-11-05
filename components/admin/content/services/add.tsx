import React, { SyntheticEvent, useState } from 'react'
import { Poppins, Oxygen } from 'next/font/google'
import { useMutation, gql } from '@apollo/client'
import styles from './add.module.scss'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function AddServices({ close }: any) {

    const [ selectImage, setSelectImage ] = useState(null)
    const [ add, setAdd ] = useState({
        services: "",
        descriptions: "",
    })

    const onFileChange = (e: any) => {
        const file = e.target.files[ 0 ]

        if (!file) return

        setSelectImage(file)
    }



    const [ mutate ] = useMutation(gql`mutation CreateServices($services: String!, $descriptions: String!, $file: Upload) {
        createServices(services: $services, descriptions: $descriptions, file: $file) {
          services
          servicesID
          price
        }
      }`, {
        variables: {
            services: add.services,
            descriptions: add.descriptions,
            file: selectImage
        },
        onCompleted: () => {
            alert("Successfully Add Services");
            setAdd({
                descriptions: "",
                services: ""
            })
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
                <h2 className={poppins.className}>Add Services</h2>
                <div className={styles.con}>
                    <input className={`${oxygen.className} ${styles.inp}`} placeholder="Title" type="text" value={add.services} onChange={(e) => setAdd({ ...add, services: e.target.value })} />
                    <input type="file" accept='image/*' onChange={onFileChange} />
                    <textarea value={add.descriptions} onChange={(e) => setAdd({ ...add, descriptions: e.target.value })} />
                </div>
                <div className={styles.add}>
                    <button className={styles.cancel} onClick={close} type="button">Cancel</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
