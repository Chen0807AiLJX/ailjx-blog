/*
 * @Author: AiLjx
 * @Date: 2022-08-08 15:28:03
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-09 14:32:47
 */

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
