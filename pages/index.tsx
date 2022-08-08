/*
 * @Author: AiLjx
 * @Date: 2022-08-08 15:28:03
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 19:35:09
 */
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../utils/posts";

interface Props {
    allPostsData: {
        date: string;
        title: string;
        id: string;
    }[];
}

const Home: NextPage<Props> = ({ allPostsData }) => {
    return (
        <Layout home>
            <div>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={utilStyles.headingMd}>
                    <p>你好，我是 Ailjx</p>
                    <p>一个又菜又爱玩的前端小白，欢迎来到我的博客！</p>
                </section>

                <section
                    className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <ul className={utilStyles.list}>
                        {allPostsData.map(({ id, date, title }: any) => (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date} />
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();

    return {
        props: {
            allPostsData,
        },
    };
};

export default Home;
