import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useState, SyntheticEvent } from 'react'
import styles from '@/styles/patient/settings.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import { GetServerSidePropsContext } from 'next'
import jwtDecode from 'jwt-decode'
import { getAllPhysioId } from '@/util/user/user.query'
import { useQuery, useMutation } from '@apollo/client'
import Head from 'next/head'
import { UpdateUserPassword, UpdateContactNumber } from '@/util/user/user.mutation'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
const Settings: FC = ({ userID }: any) => {


    const [ password, setPassword ] = useState({
        current: "",
        newpass: ""
    })

    const [ phone, setPhone ] = useState("")

    const { loading, data } = useQuery(getAllPhysioId, {
        variables: {
            userId: userID
        }
    })


    const [ changePasswordMutation ] = useMutation(UpdateUserPassword)
    const [ changePhoneNumberMutaiton ] = useMutation(UpdateContactNumber)

    const onHandleUpdateUserPassword = (e: SyntheticEvent) => {
        e.preventDefault()
        changePasswordMutation({
            variables: {
                userId: userID,
                current: password.current,
                newpass: password.newpass
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Password Successfully Updated")
            },
            onError: (e) => {
                alert(e.message)
            }
        })
    }


    const onhandleUpdateContactNumber = (e: SyntheticEvent) => {
        e.preventDefault();
        changePhoneNumberMutaiton({
            variables: {
                userId: userID,
                phone: phone
            },
            errorPolicy: "all",
            onCompleted: () => {
                alert("Contact Number Successfully Updated")
            },
            onError: (e) => {
                alert(e.message)
            }
        })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Account Settings</title>
            </Head>
            <div className={styles.profile}>
                {loading ? "Loading" : data.getAllPhysioId.map(({ email, profile }: any) => (
                    profile.map(({ firstname, lastname, phone }: any) => (
                        <div className={styles.con} key={email}>
                            <div className={styles.prof}>
                                <h2 className={poppins.className}>Patient Name: {firstname} {lastname}</h2>
                                <h2 className={poppins.className}>Email Address: {email}</h2>
                            </div>
                            <div className={styles.ss}>
                                <div className={styles.settingsContainer}>
                                    <form onSubmit={onHandleUpdateUserPassword}>
                                        <div className={styles.in}>
                                            <h2 className={poppins.className}>Current Password</h2>
                                            <input type="password" onChange={(e) => setPassword({ ...password, current: e.target.value })} />
                                        </div>
                                        <div className={styles.in}>
                                            <h2 className={poppins.className}>New Password</h2>
                                            <input type="password" onChange={(e) => setPassword({ ...password, newpass: e.target.value })} />
                                        </div>
                                        <div className={styles.confirmation}>
                                            <button type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.settingsContainer}>
                                    <form onSubmit={onhandleUpdateContactNumber}>
                                        <div className={styles.in}>
                                            <h2 className={poppins.className}>Contact Number</h2>
                                            <span className={oxygen.className}>{phone}</span>
                                        </div>
                                        <div className={styles.in}>
                                            <h2 className={poppins.className}>Change Contact Number</h2>
                                            <input type="tel" onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className={styles.confirmation}>
                                            <button type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>

        </div>
    )
}

(Settings as PageWithLayout).layout = MainLayout
export default Settings



export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = context.req.cookies[ "physio_token" ] as any

    const { userID }: any = jwtDecode(cookies)

    return {
        props: {
            userID: userID
        }
    }
}