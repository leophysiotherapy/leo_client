import React, { useEffect, useState, SyntheticEvent } from 'react'
import styles from './registerform.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'
import { RegisterUser } from '@/util/form/auth'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
interface RegisterForm {
    email: string
    password: string
    phone: string
    firstname: string
    lastname: string
}

const poppins = Poppins({
    weight: "600",
    subsets: [ "latin" ]
})
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function RegisterForm() {

    const router = useRouter()
    const [ store, setStored ] = useLocalStorage("email", "")
    const [ ischecked, setChecked ] = useState(false)
    const [ retype, setRetype ] = useState("")
    const [ mutate ] = useMutation(RegisterUser)

    const [ users, setUsers ] = useState<RegisterForm>({
        email: "",
        password: "",
        phone: "",
        firstname: "",
        lastname: ""
    })



    useEffect(() => {
        if (users.email !== "") {
            setStored(users.email)
        } else {
            localStorage.removeItem("email")
        }
    }, [ setStored, users.email ])



    const onHandleRegisterForm = (e: SyntheticEvent) => {
        e.preventDefault();

        if (users.password !== retype) {
            alert("Password is not matched")
        }


        mutate({
            variables: {
                user: {
                    email: users.email,
                    password: users.password,
                    phone: users.phone,
                    firstname: users.firstname,
                    lastname: users.lastname
                }
            },
            onCompleted: () => {
                router.push("/verify")
            },
            errorPolicy: "all",
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onHandleRegisterForm}>
                <h2 className={poppins.className}>Create an Account</h2>
                <div className={styles.fullname}>
                    <input onChange={(e) => setUsers({ ...users, firstname: e.target.value })} className={styles.inptext} type="text" placeholder='Firstname' />
                    <input onChange={(e) => setUsers({ ...users, lastname: e.target.value })} className={styles.inptext} type="text" placeholder='Lastname' />
                </div>
                <input onChange={(e) => setUsers({ ...users, email: e.target.value })} className={styles.inptext} type="email" placeholder='Email Address' />
                <input onChange={(e) => setUsers({ ...users, phone: e.target.value })} className={styles.inptext} type="tel" placeholder='Contact Number' />
                <input onChange={(e) => setUsers({ ...users, password: e.target.value })} className={styles.inptext} type="password" placeholder='Password' />
                <input onChange={(e) => setRetype(e.target.value)} className={styles.inptext} type="password" placeholder='Confirm Password' />
                <div className={styles.verification}>
                    <div className={styles.statement}>
                        <input onChange={() => setChecked(!ischecked)} checked={ischecked} type="checkbox" />
                        <span className={oxygen.className}>I agree to all statement in HIPPA</span>
                    </div>
                    <span className={oxygen.className}>Already have an account? <Link href="/auth/login">Login here</Link></span>
                </div>
                <button disabled={ischecked === false || !users.email || !users.firstname || !users.password || !users.lastname || !users.phone} type="submit">
                    <span className={oxygen.className}>
                        Sign up
                    </span>
                </button>
            </form>
        </div>
    )
}
