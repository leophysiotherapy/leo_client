import React, { useEffect, useState } from 'react'
import { TbDownload, TbTrash, TbEye } from 'react-icons/tb'
import { format } from 'date-fns'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'
import { PDFDownloadLink, Document, View, Page, Text } from '@react-pdf/renderer'
import styles from '@/styles/admin/prescription/prescription.module.scss'
import PrescriptionsDelete from './delete'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})




const PrescriptionDocument = ({ fullname, prescription }: any) => {
    return (
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
                        4742 Kelvin Road, Freetown, Prince Edward Island, C0B 1L0
                    </Text>
                </View>


                <View style={{
                }} >
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Name: {fullname} </Text>
                    </View>
                    <Text style={{ padding: "20px", fontSize: "14px" }}>{prescription}</Text>
                </View>


            </Page>
        </Document>
    )
}


export default function PrescriptionQuery({ date, prescriptionID, fullname, prescription }: { date: any, prescriptionID: string, fullname: string, prescription: string }) {

    const router = useRouter()

    const [ isClient, setIsClient ] = useState(false)
    const [ deletePrescription, setDeletePrescription ] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    const onHandleDeleteTogglePrescriptions = () => {
        setDeletePrescription(() => !deletePrescription)
    }
    return (
        <tr>
            <td className={oxygen.className}>{format(new Date(date), "MMMM dd, yyyy")}</td>
            <td className={oxygen.className}>{fullname}</td>
            <td>
                {
                    deletePrescription ? <div className={styles.overlay}>
                        <PrescriptionsDelete close={onHandleDeleteTogglePrescriptions} prescriptionID={prescriptionID} />
                    </div> : null
                }
                <button onClick={() => router.push(`/administrator/diagnostic/prescriptions/${prescriptionID}`)}>
                    <TbEye size={23} />
                </button>
                {isClient ? <PDFDownloadLink fileName={`${fullname}.pdf`} document={<PrescriptionDocument fullname={fullname} prescription={prescription} />}>
                    <TbDownload size={23} />
                </PDFDownloadLink> : null}
                <button onClick={() => setDeletePrescription(() => !deletePrescription)}>
                    <TbTrash size={23} /></button>
            </td>
        </tr>
    )
}
