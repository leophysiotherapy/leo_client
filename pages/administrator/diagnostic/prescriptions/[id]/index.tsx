import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC, useEffect, useState } from 'react'
import { GetAllPrescription, GetPrescriptionById } from '@/util/prescription/prescription.query'
import { client } from '@/lib/apolloWrapper'
import { GetStaticPropsContext } from 'next'
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

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


    const router = useRouter();

    const [ isClient, setClient ] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])


    if (router.isFallback) {
        return <p>Loading...</p>
    }

    return (
        isClient ? <>
            <Head>
                <title>Prescriptions</title>
            </Head>
            <PDFViewer style={{

                width: "100%",
                height: "650px"
            }}>
                <Document>
                    <Page size="LETTER" style={{
                        padding: "10px",
                    }}>
                        <View style={{
                            width: "100%",
                            height: "150px",
                            gap: "10px",
                            backgroundColor: "#0097b2",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 20px",
                        }}>
                            <View style={{ width: "100%", flex: "1" }}>
                                <Image src="/logo.png" style={{ width: "160px", height: "90px" }} />
                            </View>
                            <View style={{
                                width: "60px",
                                display: "flex",
                                justifyContent: "center",
                                flex: "1"
                            }}>
                                <Text style={{ color: "#fff", fontSize: "13px" }}>Palo Leonardo, DPT</Text>
                                <Text style={{ color: "#fff", fontSize: "13px" }}>
                                    Owner and Physical Therapist
                                </Text>
                                <Text style={{ color: "#fff", fontSize: "13px" }}>7860 Imperial Highway, Downey, California</Text>
                                <Text style={{ color: "#fff", fontSize: "13px" }}>@restore.pt</Text>
                            </View>
                        </View>



                        {prescription.map(({ prescription, prescriptionID, patient, createdAt }: any) => (
                            patient.map(({ profile, email }: any) => (
                                profile.map(({ firstname, lastname, phone }: any) => (
                                    <View style={{
                                        padding: "10px 0"
                                    }} key={prescriptionID}>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Patient Name: {firstname} {lastname} </Text>
                                        </View>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Email: {email} </Text>
                                        </View>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Contact No.: {phone} </Text>
                                        </View>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Date of Prescription: {format(new Date(createdAt), "MMMM dd, yyyy hh:mm")} </Text>
                                        </View>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>____________________________________________________________________________</Text>
                                        </View>
                                        <View>
                                            <Text style={{ padding: "5px 10px", fontSize: "14px" }}>{prescription}</Text>
                                        </View>
                                    </View>
                                ))
                            ))
                        ))}
                    </Page>
                </Document>
            </PDFViewer >

        </> : null
    )
}


(Prescriptions as PageWithLayout).layout = DashboardLayout
export default Prescriptions