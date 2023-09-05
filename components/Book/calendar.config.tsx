import dayjs from "dayjs";


export const generateDAte = (month = dayjs().month(), year = dayjs().year()) => {



    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")


    const arrayOfDate = []

    //create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: firstDateOfMonth.date(i)
        })
    }

    //generate the current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            date: firstDateOfMonth.date(i),
            currentMonth: true,
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
        })
    }


    const remainingDate = 42 - arrayOfDate.length


    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDate; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i)
        })
    }


    return arrayOfDate
}



export const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]



export const TimeValue = [
    { name: "09:00 am", value: "09:00:00z" },
    { name: "10:00 am", value: "10:00:00z" },
    { name: "11:00 am", value: "11:00:00z" },
    { name: "01:00 pm", value: "01:00:00z" },
    { name: "02:00 pm", value: "02:00:00z" },
    { name: "03:00 pm", value: "03:00:00z" },
    { name: "04:00 pm", value: "05:00:00z" },
]