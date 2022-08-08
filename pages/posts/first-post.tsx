/*
 * @Author: AiLjx
 * @Date: 2022-08-08 15:55:20
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 16:38:15
 */
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
export default function FirstPost() {
    return (
        <>
            <Layout>
                <Head>
                    <title>First Blog</title>
                </Head>
                <h1>First Post</h1>
                <h2>
                    <Link href='/'>
                        <a>Back to home</a>
                    </Link>
                </h2>
            </Layout>
        </>
    );
}
