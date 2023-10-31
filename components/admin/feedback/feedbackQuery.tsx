import React from 'react'
import { TbEye, TbTrash } from 'react-icons/tb'
import { format } from 'date-fns'
import { Oxygen } from 'next/font/google'
import { useRouter } from 'next/router'


const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})
export default function FeedbackQuery({ fullname, rating, date, feedbackID }: any) {

    const router = useRouter();
    return (
        <tr>
            <td className={oxygen.className}>{format(new Date(date), "MMMM dd, yyyy hh:mm:sss")}</td>
            <td className={oxygen.className}>{fullname}</td>
            <td>
                {rating === 1 ? "⭐" : null}
                {rating === 2 ? "⭐⭐" : null}
                {rating === 3 ? "⭐⭐⭐" : null}
                {rating === 4 ? "⭐⭐⭐⭐" : null}
                {rating === 5 ? "⭐⭐⭐⭐⭐" : null}
            </td>
            <td>
                <button onClick={() => router.push(`/administrator/feedback/reviews/${feedbackID}`)} className={oxygen.className}>
                    <TbEye size={23} />
                </button>
                <button>
                    <TbTrash size={23} />
                </button>
            </td>
        </tr>
    )
}
