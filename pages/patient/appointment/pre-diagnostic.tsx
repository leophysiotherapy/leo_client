import React, { FC } from 'react'
import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import Head from 'next/head'


const Prediagnostic: FC = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Head>
                <title>Pre-diagnostic</title>
                <link rel="icon" href="/faviphysio.png" />
            </Head>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScEkdc9eEgx9NYVmIscK6PDFzDMG3gdujJc8ojmHCwAQfYg_w/viewform?embedded=true" width="640" height="1800" style={{ border: "0" }}>Loading…</iframe>
        </div >
    )
}

(Prediagnostic as PageWithLayout).layout = MainLayout
export default Prediagnostic