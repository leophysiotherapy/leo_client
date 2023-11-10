import React, { FC, useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import Head from 'next/head'
import styles from '@/styles/admin/content/services.module.scss'
import AddServices from '@/components/admin/content/services/add'
import { Poppins } from 'next/font/google'
import ServiceQuery from '@/components/admin/content/services/servicesQuery'
import PageWithLayout from '@/layout/page.layout'
import DashboardLayout from '@/layout/dashboard.layout'
import { TbPlus } from 'react-icons/tb'

const Thead = [ "Services", "Descriptions", "Actions" ]


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const Services: FC = () => {
    const [ add, setAdd ] = useState(false)
    const [ search, setSearch ] = useState("")

    const { loading, data } = useQuery(gql`query GetAllServices {
        getAllServices {
          services
          descriptions
          servicesID
        }
      }`)


    const [ searchBlog, { data: searchData } ] = useLazyQuery(gql`query GetServicesBySearch($search: String!) {
        getServicesBySearch(search: $search) {
          services
          descriptions
          servicesID
        }
      }`, {
        variables: {
            search
        }
    })


    const onHandleClose = () => {
        setAdd(() => !add)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Services</title>
            </Head>
            <h2 className={poppins.className}>Services</h2>
            {
                add ? <div className={styles.overlay}>
                    <AddServices close={onHandleClose} />
                </div> : null
            }
            <div className={styles.search}>
                <input type="search" placeholder='Search' onChange={(e) => {
                    searchBlog();
                    setSearch(e.target.value)
                }} />
            </div>
            <div className={styles.addFAqs}>
                <button onClick={() => setAdd(() => !add)}>
                    <TbPlus />
                    <span>Add</span>
                </button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {Thead.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search ? searchData?.getServicesBySearch.map(({ servicesID, services, descriptions }: any) => (

                            <ServiceQuery servicesID={servicesID} services={services} key={servicesID} descriptions={descriptions} />

                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getAllServices.map(({ servicesID, services, descriptions }: any) => (
                            <ServiceQuery servicesID={servicesID} services={services} key={servicesID} descriptions={descriptions} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


(Services as PageWithLayout).layout = DashboardLayout
export default Services;