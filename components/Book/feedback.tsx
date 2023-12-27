import React, { useState, useEffect, SyntheticEvent } from 'react'
import styles from '@/styles/patient/feedback.module.scss'
import Head from 'next/head'
import { Poppins, Oxygen } from 'next/font/google'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/client'
import { CreateMyFeedback } from '@/util/feedback/feedback.mutation'
import { TimeValue } from './calendar.config'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function Feedback({ appointmentID, close }: any) {


    const [ name, setName ] = useState("")
    const [ date, setDate ] = useState("")
    const [ time, setTime ] = useState("")
    const [ question1, setQuestion1 ] = useState("");
    const [ question2, setQuestion2 ] = useState("");
    const [ question3, setQuestion3 ] = useState("");
    const [ question4, setQuestion4 ] = useState("");
    const [ question5, setQuestion5 ] = useState("");
    const [ question6, setQuestion6 ] = useState("");
    const [ question7, setQuestion7 ] = useState("");
    const [ question8, setQuestion8 ] = useState("")

    const [ feed, setFeedback ] = useState({
        rating: 0,
        comment: ""
    })

    const [ userid, setUserId ] = useState("")


    useEffect(() => {
        const cook = Cookies.get("physio_token") as any;
        if (cook) {
            const { userID }: any = jwtDecode(cook)
            setUserId(userID)
        }
    }, [])


    const [ mutate ] = useMutation(CreateMyFeedback, {
        variables: {
            therapistName: name,
            date: date,
            time: time,
            question1: question1,
            question2: question2,
            question3: question3,
            question4: question4,
            question5: question5,
            question6: question6,
            question7: question7,
            question8: question8,
            feedback: feed.comment,
            rating: feed.rating,
            appointmentId: appointmentID,
            userId: userid,
        },
        errorPolicy: "all",
        onCompleted: () => {
            alert("Successfully Feedback Created");
            close()
        },
        onError: (e) => {
            alert(e.message)
        }
    })


    const onHandleFeedbackForm = (e: SyntheticEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Feedback</title>
            </Head>
            <h2 className={poppins.className}>Create Feedback</h2>
            <form onSubmit={onHandleFeedbackForm}>
                <div className={styles.qs}>
                    <label className={poppins.className}>Therapist{"'"}s Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.qs}>
                    <label className={poppins.className}>Date of Appointment:</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className={styles.qs}>
                    <label className={poppins.className}>Time of Appointment:</label>
                    <select onChange={(e) => setTime(e.target.value)}>
                        <option>-</option>
                        {TimeValue.map(({ name }) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <span className={poppins.className}>Please rate each stratement on scale of 1 to 5 with 1 being {'"'}Strongly Disagree{'"'} and 5 being {'"'}Strong Agree{'"'}</span>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>Booking an appointment was easy and convenient.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion1(e.target.value)} checked={question1 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion1(e.target.value)} checked={question1 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion1(e.target.value)} checked={question1 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion1(e.target.value)} checked={question1 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion1(e.target.value)} checked={question1 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>My therapist was punctual for my appointments</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion2(e.target.value)} checked={question2 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion2(e.target.value)} checked={question2 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion2(e.target.value)} checked={question2 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion2(e.target.value)} checked={question2 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion2(e.target.value)} checked={question2 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>My therapist explained my condition and treatment plan clearly.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion3(e.target.value)} checked={question3 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion3(e.target.value)} checked={question3 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion3(e.target.value)} checked={question3 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion3(e.target.value)} checked={question3 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion3(e.target.value)} checked={question3 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>The treatment sessions were practical in addressing my concerns.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion4(e.target.value)} checked={question4 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion4(e.target.value)} checked={question4 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion4(e.target.value)} checked={question4 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion4(e.target.value)} checked={question4 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion4(e.target.value)} checked={question4 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>I noticed an improvement in my physical abilities after the session.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion5(e.target.value)} checked={question5 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion5(e.target.value)} checked={question5 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion5(e.target.value)} checked={question5 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion5(e.target.value)} checked={question5 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion5(e.target.value)} checked={question5 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>The session contributed to my overall rehabilitation.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion6(e.target.value)} checked={question6 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion6(e.target.value)} checked={question6 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion6(e.target.value)} checked={question6 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion6(e.target.value)} checked={question6 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion6(e.target.value)} checked={question6 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>My therapist helped me set achievable goals for my rehabilitation.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion7(e.target.value)} checked={question7 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion7(e.target.value)} checked={question7 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion7(e.target.value)} checked={question7 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion7(e.target.value)} checked={question7 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion7(e.target.value)} checked={question7 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.question}>
                    <h2 className={oxygen.className}>My privacy was maintained during treatment.</h2>
                    <div className={styles.onRadio}>
                        <div className={styles.radio}>
                            <input type="radio" value="1" onChange={(e) => setQuestion8(e.target.value)} checked={question8 === "1" ? true : false} />
                            <label className={oxygen.className}>1</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="2" onChange={(e) => setQuestion8(e.target.value)} checked={question8 === "2" ? true : false} />
                            <label className={oxygen.className}>2</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="3" onChange={(e) => setQuestion8(e.target.value)} checked={question8 === "3" ? true : false} />
                            <label className={oxygen.className}>3</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="4" onChange={(e) => setQuestion8(e.target.value)} checked={question8 === "4" ? true : false} />
                            <label className={oxygen.className}>4</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" value="5" onChange={(e) => setQuestion8(e.target.value)} checked={question8 === "5" ? true : false} />
                            <label className={oxygen.className}>5</label>
                        </div>
                    </div>
                </div>
                <div className={styles.ratings}>
                    <h2 className={poppins.className}>Rate your experience</h2>
                    <div className={styles.stars}>
                        <select onChange={(e) => setFeedback({ ...feed, rating: parseInt(e.currentTarget.value) })}>
                            <option value={1}>⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>

                </div>
                <div className={styles.comments}>
                    <h2 className={poppins.className}>Comment</h2>
                    <textarea onChange={(e) => setFeedback({ ...feed, comment: e.target.value })} className={oxygen.className} placeholder='Type your comment here...' />
                </div>
                <div className={styles.btns}>
                    <button type="submit">Submit</button>
                    <button onClick={close} type="button" className={styles.cancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
