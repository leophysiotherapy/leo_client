import React, { useEffect, useState } from 'react'
import { TbDownload, TbTrash, TbEye } from 'react-icons/tb'
import { format } from 'date-fns'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'
import { PDFDownloadLink, Document, View, Page, Text, Image } from '@react-pdf/renderer'
import styles from '@/styles/admin/prescription/prescription.module.scss'
import PrescriptionsDelete from './delete'
import HTMLParse from 'react-pdf-html'

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})




const PrescriptionDocument = ({ fullname, prescription, email, phone, date }: any) => {
    return (
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

                <View style={{
                    padding: "10px 0"
                }}>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Patient Name: {fullname} </Text>
                    </View>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Email: {email} </Text>
                    </View>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Contact No.: {phone} </Text>
                    </View>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>Date of Prescription: {format(new Date(date), "MMMM dd, yyyy hh:mm")} </Text>
                    </View>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>____________________________________________________________________________</Text>
                    </View>
                    <View>
                        <Text style={{ padding: "5px 10px", fontSize: "14px" }}>
                            <HTMLParse>
                                {prescription}
                            </HTMLParse>
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end"
                }}>
                    <Image src="/signature.png" style={{
                        height: "100px", width: "150px"
                    }} />
                    <Text>Therapist Signature:</Text>
                </View>
            </Page>
        </Document>
    )
}


export default function PrescriptionQuery({ date, prescriptionID, fullname, prescription, email, phone }: { date: any, prescriptionID: string, fullname: string, prescription: string, email: string, phone: string }) {

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
                {isClient ? <PDFDownloadLink fileName={`${fullname}.pdf`} document={<PrescriptionDocument fullname={fullname} prescription={prescription} date={date} email={email} phone={phone} />}>
                    <TbDownload size={23} />
                </PDFDownloadLink> : null}
                <button onClick={() => setDeletePrescription(() => !deletePrescription)}>
                    <TbTrash size={23} /></button>
            </td>
        </tr>
    )
}
