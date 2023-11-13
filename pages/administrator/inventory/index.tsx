import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/admin/inventory/inventory.module.scss'
import InventoryQuery from '@/components/admin/inventory/inventoryQuery'
import InventoryAdd from '@/components/admin/inventory/add'
import jwtDecode from 'jwt-decode'
import { Oxygen, Poppins } from 'next/font/google'
import { useQuery, useLazyQuery } from '@apollo/client'
import { TbPlus } from 'react-icons/tb'
import { GetAllInventory, GetAllInventoryBySearch } from '@/util/inventory/equipment.query'
import { GetServerSidePropsContext } from 'next'

const headerTable = [ "Name", "Quantity", "Expired Date", "Actions" ]


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})




const Equipment: FC = ({ userID }: any) => {

    const [ search, setSearch ] = useState("")
    const [ add, setAdd ] = useState(false)

    const [ inventory, setInventory ] = useState("equipment")
    const { loading, data } = useQuery(GetAllInventory, {
        variables: {
            inventories: inventory
        }
    })
    const [ searchInventory, { data: searchData } ] = useLazyQuery(GetAllInventoryBySearch)


    const onHandleInventoryAdd = () => {
        setAdd(() => !add)
    }
    return (
        <div className={styles.container}>
            <h2 className={poppins.className}>Inventory</h2>
            <Head>
                <title>Inventory</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            {
                add ? <div className={styles.overlay}>
                    <InventoryAdd close={onHandleInventoryAdd} userID={userID} />
                </div> : null
            }
            <div className={styles.addStaff}>
                <button onClick={() => setAdd(() => !add)}>
                    <TbPlus size={16} />
                    <span>Add</span>
                </button>
            </div>
            <div className={styles.filter}>
                <div className={styles.filterEntries}>
                    <select onChange={(e) => setInventory(e.target.value)}>
                        <option value="equipment">Equipment</option>
                        <option value="supplies">Supplies</option>
                    </select>
                </div>
                <div className={styles.filterSearch}>
                    <span className={oxygen.className}>Search:</span>
                    <input type="search" onChange={(e) => {
                        searchInventory({
                            variables: {
                                search,
                            }
                        })
                        setSearch(e.target.value)
                    }

                    } />
                </div>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            {headerTable.map((name) => (
                                <th className={poppins.className} key={name}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search ? searchData?.getInventoryBySearch.map(({ equipmentID, name, quantity, expireDate, description }: any) => (
                            <InventoryQuery userID={userID} equipmentID={equipmentID} key={equipmentID} name={name} quantity={quantity} expiredDate={expireDate} description={description} />
                        )) : loading ? <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : data.getAllEquipment.map(({ equipmentID, name, quantity, expireDate, description }: any) => (
                            <InventoryQuery key={equipmentID} equipmentID={equipmentID} name={name} quantity={quantity} expiredDate={expireDate} userID={userID} description={description} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

(Equipment as PageWithLayout).layout = DashboardLayout
export default Equipment

export const getServerSideProps = (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any

    const { userID } = jwtDecode(cookies) as any

    return {
        props: {
            userID: userID
        }
    }
}