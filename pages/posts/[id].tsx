/*
 * @Author: AiLjx
 * @Date: 2022-08-08 17:47:18
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 20:52:25
 */
import type { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

import { useEffect } from "react";

interface Props {
    postData: {
        title: string;
        date: string;
        contentHtml: string;
    };
}

export default function Post({ postData }: Props) {
    useEffect(() => {
        hljs.registerLanguage("jsx", javascript);
        hljs.highlightAll();
    });
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </article>
        </Layout>
    );
}
// getStaticProps和getStaticPaths只在服务器端运行，永远不会在客户端运行

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params!.id as string);
    return {
        props: {
            postData,
        },
    };
};
