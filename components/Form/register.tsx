import React, { useEffect, useState, SyntheticEvent } from 'react'
import styles from './registerform.module.scss'
import { Oxygen, Poppins } from 'next/font/google'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'
import { RegisterUser } from '@/util/form/auth'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import TermsAndCondition from './termsAndCondition'
import { TbEye, TbEyeOff } from 'react-icons/tb'
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
    const [ hippa, setHippa ] = useState(false)
    const [ ischecked, setChecked ] = useState(false)
    const [ optin, setOptin ] = useState(false)
    const [ retype, setRetype ] = useState("")
    const [ mutate ] = useMutation(RegisterUser)
    const [ show, setShow ] = useState(false)
    const [ isShow, setIsShow ] = useState(false)
    const [ isValid, setIsValid ] = useState(false)

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
            onError: (e) => {
                alert(e.message)
            },
            errorPolicy: "all",
        })
    }


    const onHippaClose = () => {
        setHippa(() => !hippa)
    }


    const checkPassword = () => {
        const capitalRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;

        const hasCapital = capitalRegex.test(users.password);
        const hasNumber = numberRegex.test(users.password);
        const isLengthValid = users.password.length >= 6;

        setIsValid(hasCapital && hasNumber && isLengthValid);
    }

    return (
        <div className={styles.container}>
            {
                hippa ?
                    <div className={styles.tc}>
                        <TermsAndCondition close={onHippaClose} />
                    </div> : null
            }
            <form onSubmit={onHandleRegisterForm}>
                <h2 className={poppins.className}>Create an Account</h2>
                <div className={styles.fullname}>
                    <input onChange={(e) => setUsers({ ...users, firstname: e.target.value })} className={styles.inptext} type="text" placeholder='Firstname' />
                    <input onChange={(e) => setUsers({ ...users, lastname: e.target.value })} className={styles.inptext} type="text" placeholder='Lastname' />
                </div>
                <input onChange={(e) => {
                    setUsers({ ...users, email: e.target.value })
                }} className={styles.inptext} type="email" placeholder='Email Address' />
                <p className={oxygen.className} style={{ textAlign: 'left', width: "100%" }}>
                    You must use a gmail account.
                </p>
                <input onChange={(e) => setUsers({ ...users, phone: e.target.value })} className={styles.inptext} type="tel" placeholder='Contact Number' />
                <div className={styles.password}>
                    <input style={isValid && users.password.length > 6 ? { border: "2px solid green" } : { border: "2px solid red" }} onChange={(e) => {
                        setUsers({ ...users, password: e.target.value })
                        checkPassword()
                    }} className={styles.inptext} type={show ? "text" : "password"} placeholder='Password' />
                    <button className={styles.showPassword} type="button" onClick={() => setShow(() => !show)}>
                        {show ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                    </button>
                </div>
                <p className={oxygen.className}>
                    Password must contain at least 1 capital letter, 1 number, and be at least 6 characters long.
                </p>
                <div className={styles.password}>
                    <input onChange={(e) => {
                        setRetype(e.target.value)
                    }} className={styles.inptext} type={isShow ? "text" : "password"} placeholder='Re-Type Password' />
                    <button className={styles.showPassword} type="button" onClick={() => setIsShow(() => !isShow)}>
                        {show ? <TbEyeOff size={23} /> : <TbEye size={23} />}
                    </button>
                </div>
                <div className={styles.verification}>
                    <div className={styles.statement}>
                        <input onChange={() => setChecked(!ischecked)} checked={ischecked} required type="checkbox" />
                        <span className={oxygen.className}>I agree to all statement in <button type='button' onClick={() => setHippa(() => !hippa)} className={styles.hippa}><b>HIPAA</b></button> </span>
                    </div>
                    <div className={styles.statement2}>
                        <input type="checkbox" required onChange={() => setOptin(() => !optin)} checked={optin} />
                        <span className={oxygen.className}>
                            I accept to receive automated booking reminder prior to my appointment schedule through SMS
                        </span>

                    </div>
                    <span className={oxygen.className}>Already have an account? <Link href="/auth/login">Login here</Link></span>
                </div>
                <button className={styles.submitBtn} disabled={ischecked === false || !users.email || !users.firstname || !users.password || !users.lastname || !users.phone || optin === false} type="submit">
                    <span className={oxygen.className}>
                        Sign up
                    </span>
                </button>
            </form>
        </div>
    )
}
