import DashboardLayout from '@/layout/dashboard.layout'
import PageWithLayout from '@/layout/page.layout'
import React, { FC } from 'react'

const FaceToFaceReports: FC = () => {
    return (
        <div>FaceToFaceReports</div>
    )
}

(FaceToFaceReports as PageWithLayout).layout = DashboardLayout
export default FaceToFaceReports