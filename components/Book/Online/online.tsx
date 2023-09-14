import React, { useState, SyntheticEvent } from 'react'
import styles from '@/styles/appointment/app.module.scss'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Oxygen, Poppins } from 'next/font/google'
import dayjs from 'dayjs'
import { generateDate, days, months, TimeValue } from '../calendar.config'
import cn from '../cn'

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

    const [ today, setToday ] = useState(currentDate)
    const [ books, setBooks ] = useState(false)
    const [ selectedDate, setSelectedDate ] = useState(currentDate)
    const [ appointment, setAppointment ] = useState({
        time: "",
        end: "",
        serviceId: "",

    })

    return (
        <div className={styles.container}>
            <div className={styles.cal}>
                <div className={styles.dateToday}>
                    <div>
                        <h2 className={poppins.className}>{months[ today.month() ]}, {today.year()}</h2>
                    </div>
                    <div className={styles.today}>
                        <button onClick={() => setToday(today.month(today.month() - 1))}>
                            <TbChevronLeft size={20} />
                        </button>
                        <span className={oxygen.className}>TODAY</span>
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
                                disabled={date.isBefore(currentDate, "days")}
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
                    {TimeValue.map(({ name, start, }) => (
                        <button
                            onClick={(e) => setAppointment({ ...appointment, time: e.currentTarget.value })}
                            value={start} key={name} className={appointment.time === start ? `${styles.timeContainer} ${styles.timeActive}` : `${styles.timeContainer}`}>
                            <h2 className={oxygen.className}>{name}</h2>
                        </button>
                    ))}
                </div>
                <h2 className={poppins.className}>Select Service</h2>
                <div className={styles.select}>
                    <select onChange={(e) => setAppointment({ ...appointment, serviceId: e.target.value })}>
                        <option>--</option>
                        <option value="Gmeet">Gmeet</option>
                    </select>
                </div>
                <div className={styles.policies}>
                    <input type="checkbox" />
                    <span className={oxygen.className}>I have read the policies of the website</span>
                </div>
                <div className={styles.form}>
                    <button className={styles.cancelBtn}>Cancel</button>
                    <button onClick={() => setBooks(() => !books)}>Book Now</button>
                </div>
            </div>

        </div>
    )
}
