import React from 'react'
import styles from './header.module.scss';
import { TbMenu2 } from 'react-icons/tb';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


export default function Header({ close }: any) {
    return (
        <div className={styles.container}>
            <button onClick={close}>
                <TbMenu2 size={40} />
            </button>
            <h2 className={poppins.className}>
                Leonardo Physical Therapy Rehabilitation Clinic
            </h2>
        </div>
    )
}
