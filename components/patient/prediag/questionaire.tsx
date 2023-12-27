import React, { SyntheticEvent, useState } from 'react'
import styles from './questionaire.module.scss'
import { Poppins, Oxygen } from 'next/font/google'
import { TimeValue } from '@/components/Book/calendar.config'
import { useMutation } from '@apollo/client'
import { CreatePreDiagForm } from '@/util/prediag/prediag.mutation'
import { useRouter } from 'next/router'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})




export default function Questionaire({ userID }: any) {

    const router = useRouter();

    const [ age, setAge ] = useState("")
    const [ sex, setSex ] = useState("")
    const [ date, setDate ] = useState("")
    const [ time, setTime ] = useState("")
    const [ question1, setQuestion1 ] = useState("")
    const [ question2, setQuestion2 ] = useState("")
    const [ question3, setQuestion3 ] = useState("")
    const [ question4, setQuestion4 ] = useState("")
    const [ question5, setQuestion5 ] = useState("")
    const [ question6, setQuestion6 ] = useState("")
    const [ question7, setQuestion7 ] = useState("")
    const [ question8, setQuestion8 ] = useState("")
    const [ question9, setQuestion9 ] = useState("")
    const [ question10, setQuestion10 ] = useState("")
    const [ question11, setQuestion11 ] = useState("")
    const [ question12, setQuestion12 ] = useState("")
    const [ question13, setQuestion13 ] = useState("")
    const [ question14, setQuestion14 ] = useState("")
    const [ question15, setQuestion15 ] = useState("")
    const [ question16, setQuestion16 ] = useState("")

    const [ questionMutation ] = useMutation(CreatePreDiagForm)



    const onHandleSubmitPreDiagForm = (e: SyntheticEvent) => {
        e.preventDefault();
        questionMutation({
            variables: {
                userId: userID,
                prediag: {
                    age: age,
                    date: date,
                    sex: sex,
                    time: time,
                    question1: question1,
                    question2: question2,
                    question3: question3,
                    question4: question4,
                    question5: question5,
                    question6: question6,
                    question7: question7,
                    question8: question8,
                    question9: question9,
                    question10: question10,
                    question11: question11,
                    question12: question12,
                    question13: question13,
                    question14: question14,
                    question15: question15,
                    question16: question16,
                }
            },
            onCompleted: () => {
                alert("Successfully Pre-diagnostic Created");
                router.reload();
            },
            onError: (e) => {
                alert(e.message)
            },
            errorPolicy: "all"
        });
    }


    return (
        <div className={styles.container}>
            <form onSubmit={onHandleSubmitPreDiagForm}>
                <div className={styles.questionaireContainer}>
                    <div className={styles.question}>
                        <label className={poppins.className}>Age:</label>
                        <input value={age} type="text" onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Sex: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Male" checked={sex === "Male" ? true : false} onChange={(e) => setSex(e.target.value)} />
                            <label className={oxygen.className}>Male</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="Female" checked={sex === "Female" ? true : false} onChange={(e) => setSex(e.target.value)} />
                            <label className={oxygen.className}>Female</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Date of Appointment:</label>
                        <input type="date" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>Time of Appointment:</label>
                        <select onChange={(e) => setTime(e.target.value)} >
                            <option defaultValue={"-"}>-</option>
                            {TimeValue.map(({ name, start }) => (
                                <option key={name} value={start}>{start}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.question}>
                        <span className={poppins.className}>Do you experience any of the following symptoms?</span>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>A. Fevers/Chills/Sweats: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question1 === "Yes" ? true : false} onChange={(e) => setQuestion1(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question1 === "No" ? true : false} onChange={(e) => setQuestion1(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>B. Unusual Fatigue: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question2 === "Yes" ? true : false} onChange={(e) => setQuestion2(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question2 === "No" ? true : false} onChange={(e) => setQuestion2(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>C. Nausea/vomiting: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question3 === "Yes" ? true : false} onChange={(e) => setQuestion3(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question3 === "No" ? true : false} onChange={(e) => setQuestion3(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>D. Headaches/Dizziness: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question4 === "Yes" ? true : false} onChange={(e) => setQuestion4(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question4 === "No" ? true : false} onChange={(e) => setQuestion4(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>E. Numbness/Tingling: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question5 === "Yes" ? true : false} onChange={(e) => setQuestion5(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question5 === "No" ? true : false} onChange={(e) => setQuestion5(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>F. Muscle cramping: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question6 === "Yes" ? true : false} onChange={(e) => setQuestion6(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question6 === "No" ? true : false} onChange={(e) => setQuestion6(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>G. Chest pain/Palpitations: </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question7 === "Yes" ? true : false} onChange={(e) => setQuestion7(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question7 === "No" ? true : false} onChange={(e) => setQuestion7(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>H. Swelling in feet or hands
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question8 === "Yes" ? true : false} onChange={(e) => setQuestion8(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question8 === "No" ? true : false} onChange={(e) => setQuestion8(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>I. Difficulty breathing/Shortness of breath
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question9 === "Yes" ? true : false} onChange={(e) => setQuestion9(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question9 === "No" ? true : false} onChange={(e) => setQuestion9(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>J. Cough/Change in cough/Blood in phlegm
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question10 === "Yes" ? true : false} onChange={(e) => setQuestion10(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question10 === "No" ? true : false} onChange={(e) => setQuestion10(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>K. Difficulty swallowing
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question11 === "Yes" ? true : false} onChange={(e) => setQuestion11(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question11 === "No" ? true : false} onChange={(e) => setQuestion11(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>L. Heartburn/Indigestion
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question12 === "Yes" ? true : false} onChange={(e) => setQuestion12(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question12 === "No" ? true : false} onChange={(e) => setQuestion12(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>M. Difficulty urinating (starting, stopping)
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question13 === "Yes" ? true : false} onChange={(e) => setQuestion13(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question13 === "No" ? true : false} onChange={(e) => setQuestion13(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={poppins.className}>N. Are you pregnant?
                            : </label>
                        <div className={styles.radios}>
                            <input type="radio" value="Yes" checked={question14 === "Yes" ? true : false} onChange={(e) => setQuestion14(e.target.value)} />
                            <label className={oxygen.className}>Yes</label>
                        </div>
                        <div className={styles.radios}>
                            <input type="radio" value="No" checked={question14 === "No" ? true : false} onChange={(e) => setQuestion14(e.target.value)} />
                            <label className={oxygen.className}>No</label>
                        </div>
                    </div>
                    <div className={styles.question2}>
                        <label className={poppins.className}>Other medical Connditions or prior surgeries: (Type N/A if none) </label>
                        <input type="text" onChange={(e) => setQuestion15(e.target.value)} />
                    </div>
                    <div className={styles.question2}>
                        <label className={poppins.className}>Current medications: (Type N/A if none) </label>
                        <input type="text" onChange={(e) => setQuestion16(e.target.value)} />
                    </div>
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>
    )
}
