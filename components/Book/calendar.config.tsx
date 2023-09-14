import dayjs from "dayjs";

export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year()
) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        const date = firstDateOfMonth.day(i);

        arrayOfDate.push({
            currentMonth: false,
            date,
        });
    }

    // generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today:
                firstDateOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    const remaining = 42 - arrayOfDate.length;

    for (
        let i = lastDateOfMonth.date() + 1;
        i <= lastDateOfMonth.date() + remaining;
        i++
    ) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i),
        });
    }
    return arrayOfDate;
};




export const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]



export const TimeValue = [
    { name: "09:00 am", start: "09:00", end: "10:00" },
    { name: "10:00 am", start: "10:00", end: "11:00" },
    { name: "11:00 am", start: "11:00", end: "12:00" },
    { name: "01:00 pm", start: "01:00", end: "02:00" },
    { name: "02:00 pm", start: "02:00", end: "03:00" },
    { name: "03:00 pm", start: "03:00", end: "05:00" },
    { name: "04:00 pm", start: "05:00", end: "06:00" }
]