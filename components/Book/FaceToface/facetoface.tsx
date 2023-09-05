import React, { useState, SyntheticEvent } from 'react'
import styles from '@/styles/appointment/app.module.scss'
import dayjs from 'dayjs'
import cn from '../cn'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Oxygen, Poppins } from 'next/font/google'
import { generateDAte, days, months, TimeValue } from '../calendar.config'
import { GetAllService } from '@/util/service/service.query'
import { useQuery } from '@apollo/client'
import { CreateAppointment } from '@/util/appointment/appointment.mutation'
import { useMutation } from '@apollo/client'
import Books from '../book'

const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})


export default function F2F() {



    const currentDate = dayjs();

    const [ today, setToday ] = useState(currentDate)

    const [ selectedDate, setSelectedDate ] = useState(currentDate)

    const { loading, data } = useQuery(GetAllService)

    const [ time, setTime ] = useState("")

    const [ books, setBooks ] = useState(false)


    return (
        <div className={styles.container}>
            {
                books ? <div className={styles.books}>
                    <Books />
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
                    {generateDAte(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                        <div className={styles.cells} key={index}>
                            <span
                                onClick={() => { setSelectedDate(date) }}
                                className={cn(today ? `${styles.activeDate} ${oxygen.className}` : `${styles.notActive} ${oxygen.className}`)}>{date.date()}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.dates}>
                <h2 className={poppins.className}>Select Time</h2>
                <div className={styles.time}>
                    {TimeValue.map(({ name, value }) => (
                        <div key={name} className={styles.timeContainer}>
                            <h2 className={oxygen.className}>{name}</h2>
                        </div>
                    ))}
                </div>
                <h2 className={poppins.className}>Select Service</h2>
                <div className={styles.select}>
                    <select>
                        <option>--</option>
                        {loading ? "Loading" : data.getAllServcie.map(({ service, serviceID }: any) => (
                            <option className={oxygen.className} key={serviceID} value={serviceID}>{service}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.policies}>
                    <input type="checkbox" />
                    <span className={oxygen.className}>I have read the policies of the website</span>
                </div>
                <div className={styles.form}>
                    <button>Cancel</button>
                    <button onClick={() => setBooks(() => !books)}>Book Now</button>
                </div>
            </div>

        </div>
    )
}
