/*
 * @Author: AiLjx
 * @Date: 2022-08-08 18:11:50
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-09 15:38:41
 */
import { parseISO, format } from "date-fns";

interface Props {
    dateString: string;
}

export default function Date({ dateString }: Props) {
    const date = parseISO(dateString);
    return (
        <time dateTime={dateString} className='text-gray-500'>
            {format(date, "yyyy年MM月dd日")}
        </time>
    );
}
