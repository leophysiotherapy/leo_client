import React, { useEffect, useState } from 'react'
import styles from '@/styles/appointment/app.module.scss'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Oxygen, Poppins } from 'next/font/google'
import dayjs from 'dayjs'
import { generateDate, days, months, TimeValue } from '../calendar.config'
import cn from '../cn'
import Books from './book'
import { getFindSpecificDate } from '@/util/appointment/appointment.query'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import WebPolicies from '../webPolicies'


const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function Online() {


    const currentDate = dayjs();



    const [ today, setToday ] = useState(currentDate.add(1, "days"))
    const [ books, setBooks ] = useState(false)
    const [ selectedDate, setSelectedDate ] = useState(currentDate.add(1, "days"))
    const [ appointment, setAppointment ] = useState({
        time: "",
        end: "",
        services: "",

    })
    const [ policies, setPolicies ] = useState(false)


    const { loading, data } = useQuery(getFindSpecificDate, {
        variables: {
            date: format(new Date(selectedDate.toISOString()), "yyyy-MM-dd"),
            platform: "online"
        }
    })

    const onHandleClose = () => {
        setBooks(false)
    }


    const [ times, setTime ] = useState([ "" ]);
    const [ dates, setDates ] = useState([ "" ])
    const [ isRender, setRender ] = useState(false)


    useEffect(() => {

        if (!isRender) {
            data?.getAppointmentByDateTime.map(({ date, time }: any) => {

                setTime((patientsTime) => [ ...patientsTime, time ])
                setDates((patientsDate) => [ ...patientsDate, date ])
            })

        }
        setRender(false)
    }, [ data, isRender ])


    const onValidChange = (time: any) => {

        if (dates.includes(format(new Date(selectedDate.toDate()), "yyyy-MM-dd"))) {
            if (times.includes(time)) {
                return true
            }
        }

    }

    const [ toggle, setToggle ] = useState(false)
    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }


    const onHandleClosePolicies = () => {
        setPolicies(() => !policies)
    }
    if (loading) return <></>

    return (
        <div className={styles.container}>
            {
                books ? <div className={styles.books}>
                    <Books selectedDate={selectedDate} time={appointment.time} close={onHandleClose} />
                </div> : null
            }
            {
                policies ? <div className={styles.overlay}>
                    <WebPolicies close={onHandleClosePolicies} />
                </div> : null
            }

            <div className={styles.cal}>
                <div className={styles.dateToday}>
                    <div>
                        <h2 className={poppins.className}>{months[ today.month() ]}, {today.year()}</h2>
                    </div>
                    <div className={styles.today}>
                        <button onClick={() => setToday(today.month(today.month() - 1))}>
                            <TbChevronLeft size={20} />
                        </button>
                        <button onClick={() => setToday(today.month(today.month() + 1))}>
                            <TbChevronRight size={20} />
                        </button>
                    </div>
                </div>
                <div className={styles.days}>
                    {days.map((name, index) => (
                        <div className={styles.cells} key={index}>
                            <span className={poppins.className}>{name}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.calendar}>
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                        <div className={styles.cells} key={index}>
                            <button
                                onClick={() => { setSelectedDate(date) }}
                                disabled={date.isBefore(currentDate.add(1, "days"), "days") || date.isAfter(currentDate.add(2, "days"), "days")}
                                className={
                                    cn(
                                        today ?
                                            `${styles.activeDate} ${oxygen.className}` : `${styles.notActive} ${oxygen.className}`,
                                        selectedDate.toDate().toDateString() === date.toDate().toDateString() ? `${styles.activeSelectedDate}`
                                            : null, currentMonth ? null : `${styles.monthFalse}`)

                                }>{date.date()}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.dates}>
                <h2 className={poppins.className}>Select Time</h2>
                <div className={styles.time}>

                    {

                    }
                    {TimeValue.map(({ name, start, }) => (
                        <button
                            disabled={
                                onValidChange(start)

                            }
                            onClick={(e) => setAppointment({ ...appointment, time: e.currentTarget.value })}
                            value={start} key={name} className={appointment.time === start ? `${styles.timeContainer} ${styles.timeActive}` : `${styles.timeContainer}`}>
                            <h2 className={oxygen.className}>{name}</h2>
                        </button>
                    ))}
                </div>
                <h2 className={poppins.className}>Select Platform</h2>
                <div className={styles.select}>
                    <select onChange={(e) => setAppointment({ ...appointment, services: e.target.value })}>
                        <option disabled>--</option>
                        <option value="Gmeet">Gmeet</option>
                    </select>
                </div>
                <div className={styles.policies}>
                    <input type="checkbox" checked={toggle} onChange={onHandleToggle} />
                    <span className={oxygen.className}>I have read the <button onClick={onHandleClosePolicies}>policies of the website</button></span>
                </div>
                <div className={styles.form}>
                    <button className={styles.cancelBtn}>Cancel</button>
                    <button disabled={toggle === false} onClick={() => setBooks(() => !books)}>Book Now</button>
                </div>
            </div>

        </div >
    )
}
