import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'


const DiagnosisID: FC = () => {
    return (
        <div>DiagnosisID</div>
    )
}

(DiagnosisID as PageWithLayout).layout = DashboardLayout
export default DiagnosisID