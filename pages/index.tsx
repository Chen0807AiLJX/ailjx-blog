/*
 * @Author: AiLjx
 * @Date: 2022-08-08 15:28:03
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-08 18:18:16
 */
import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../utils/posts";

const Home: NextPage<any> = ({ allPostsData }) => {
    return (
        <Layout home>
            <div>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={utilStyles.headingMd}>
                    <p>[Your Self Introduction]</p>
                    <p>
                        (This is a sample website - you’ll be building a site
                        like this on{" "}
                        <a href='https://nextjs.org/learn'>
                            our Next.js tutorial
                        </a>
                        .)
                    </p>
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

export default Home;

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    return {
        props: {
            allPostsData,
        },
    };
}
