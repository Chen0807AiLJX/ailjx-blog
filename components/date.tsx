/*
 * @Author: AiLjx
 * @Date: 2022-08-08 18:11:50
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 18:11:50
 */
import { parseISO, format } from "date-fns";

export default function Date({ dateString }: any) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
