import React, { FC, useState } from 'react'
import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'
import Disclaimer from '@/components/patient/prediag/disclaimer'
import { Poppins } from 'next/font/google'
import jwtDecode from 'jwt-decode'
import Questionaire from '../../../components/patient/prediag/questionaire'
import { GetServerSidePropsContext } from 'next'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const Prediagnostic: FC = ({ userID }: any) => {

    const [ cont, setContinue ] = useState(false)


    const onHandleDisclaimer = () => {
        setContinue(() => !cont)
    }

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "50px" }}>
            <Head>
                <title>Pre-diagnostic Form</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <h2 className={poppins.className}>Pre-Diagnostic Form</h2>
            {!cont ? <Disclaimer continueHandle={onHandleDisclaimer} /> : <Questionaire userID={userID} />}
        </div >
    )
}

(Prediagnostic as PageWithLayout).layout = MainLayout
export default Prediagnostic


export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const cookies = context.req.cookies[ "physio_token" ] as any
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userID: userID
        }
    }
}