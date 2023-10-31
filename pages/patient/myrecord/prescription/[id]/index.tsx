import PageWithLayout from '@/layout/page.layout'
import React, { FC, useEffect, useState } from 'react'
import { GetAllPrescription, GetPrescriptionById } from '@/util/prescription/prescription.query'
import { client } from '@/lib/apolloWrapper'
import { GetStaticPropsContext } from 'next'
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer'
import Head from 'next/head'
import MainLayout from '@/layout/main.layout'
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {

    const { data: { getAllPrescription } } = await client.query({
        query: GetAllPrescription
    })

    const paths = getAllPrescription.map(({ prescriptionID }: any) => {
        return { params: { id: prescriptionID } }
    })
    return {
        paths, fallback: true
    }
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    const presId = context.params?.id
    const { data: { getPrescriptionsById } } = await client.query({
        query: GetPrescriptionById,
        variables: {
            prescriptionId: presId
        }
    })


    return {
        props: {
            prescription: getPrescriptionsById
        }
    }
}

const Prescriptions: FC = ({ prescription }: any) => {

    const router = useRouter()
    const [ isClient, setClient ] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])


    if (router.isFallback) {
        return (<p>Loading...</p>)
    }
    return (
        isClient ? <>
            <Head>
                <title>Prescriptions</title>
            </Head>
            <PDFViewer style={{

                width: "100%",
                height: "700px"
            }}>
                <Document>
                    <Page size="LETTER">
                        <View style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            height: "70px",
                            gap: "10px"
                        }}>
                            <Text>Leonardo Physical Therapy Rehabilitation Clinic</Text>
                            <Text style={{ fontSize: "12px" }}>
                                7860 imperial hwy downey, california
                            </Text>
                        </View>



                        {prescription.map(({ prescription, prescriptionID, patient }: any) => (
                            patient.map(({ profile }: any) => (
                                profile.map(({ firstname, lastname }: any) => (
                                    <View style={{

                                    }} key={prescriptionID}>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Name: {firstname} {lastname} </Text>
                                        </View>
                                        <Text style={{ padding: "20px", fontSize: "14px" }}>{prescription}</Text>
                                    </View>
                                ))
                            ))
                        ))}
                    </Page>
                </Document>
            </PDFViewer>

        </> : null
    )
}


(Prescriptions as PageWithLayout).layout = MainLayout
export default Prescriptions