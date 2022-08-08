/*
 * @Author: AiLjx
 * @Date: 2022-08-08 17:47:18
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 18:25:21
 */
import { getAllPostIds, getPostData } from "../../utils/posts";
import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }: any) {
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
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
