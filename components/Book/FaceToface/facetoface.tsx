import React, { useEffect, useState } from 'react'
import styles from '@/styles/appointment/app.module.scss'
import dayjs from 'dayjs'
import cn from '../cn'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Oxygen, Poppins } from 'next/font/google'
import { generateDate, days, months, TimeValue } from '../calendar.config'
import { getFindSpecificDate } from '@/util/appointment/appointment.query'
import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Books from './book'
import { useRouter } from 'next/router'
import WebPolicies from '../webPolicies'



const poppins = Poppins({
    weight: "500",
    subsets: [ "latin" ]
})

const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function F2F() {

    const router = useRouter();
    const currentDate = dayjs();
    const [ today, setToday ] = useState(currentDate)
    const [ selectedDate, setSelectedDate ] = useState(currentDate.add(1, "days"))
    const [ books, setBooks ] = useState(false)

    const [ appointment, setAppointment ] = useState({
        time: "",
        end: "",
        services: "",

    })

    const onClosBookPayment = () => {
        setBooks(() => !books)
    }


    const { loading, data } = useQuery(getFindSpecificDate, {
        variables: {
            date: format(new Date(selectedDate.toISOString()), "yyyy-MM-dd"),
            platform: "f2f"
        },
        pollInterval: 1000
    })

    const [ times, setTime ] = useState([ "" ]);
    const [ dates, setDates ] = useState([ "" ])
    const [ isRender, setRender ] = useState(false)
    const [ policies, setPolicies ] = useState(false)
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



    const onHandleClosePolicies = () => {
        setPolicies(() => !policies)
    }


    const [ toggle, setToggle ] = useState(false)
    const onHandleToggle = () => {
        setToggle(() => !toggle)
    }

    const { loading: LoadServices, data: dataServices } = useQuery(gql`query GetAllServices {
        getAllServices {
          services
          descriptions
          servicesID
        }
      }`)
    if (loading || LoadServices) return <></>
    return (
        <div className={styles.container}>
            {
                books ? <div className={styles.books}>
                    <Books close={onClosBookPayment} selectedDate={selectedDate}
                        time={appointment.time}
                        platform={"Face-to-Face"} services={appointment.services} />
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
                                onClick={() => {
                                    setSelectedDate(date)
                                    setDates([])
                                    setTime([])
                                }}
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
                    {TimeValue.map(({ name, start, }) => (
                        <button
                            disabled={onValidChange(start)}
                            onClick={(e) => {
                                setAppointment({ ...appointment, time: e.currentTarget.value })
                            }}
                            value={start} key={name} className={appointment.time === start ? `${styles.timeContainer} ${styles.timeActive}` : `${styles.timeContainer}`}>
                            <h2 className={oxygen.className}>{name}</h2>
                        </button>
                    ))}
                </div>
                <h2 className={poppins.className}>Select Services</h2>
                <div className={styles.select}>
                    <select onChange={(e) => setAppointment({ ...appointment, services: e.target.value })}>
                        <option selected disabled>--</option>
                        {dataServices.getAllServices.map(({ services, servicesID }: { services: string, servicesID: string }) => (
                            <option key={servicesID} value={services}>{services}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.policies}>
                    <input type="checkbox" checked={toggle} onChange={onHandleToggle} />
                    <span className={oxygen.className}>I have read the <button onClick={onHandleClosePolicies}>policies of the website</button></span>
                </div>
                <div className={styles.form}>
                    <button onClick={() => router.push("/")} className={styles.cancelBtn}>Cancel</button>
                    <button disabled={toggle === false} onClick={() => setBooks(() => !books)}>Book Now</button>
                </div>
            </div>

        </div >
    )
}
