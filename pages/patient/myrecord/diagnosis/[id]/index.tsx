import MainLayout from '@/layout/main.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'

const Diagnosis: FC = () => {
    return (
        <div>Diagnosis</div>
    )
}

(Diagnosis as PageWithLayout).layout = MainLayout
export default Diagnosis