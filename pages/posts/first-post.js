import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      {/* <img src="/images/profile.jpg" height={144}  width={144}  alt="Your Name" /> */}
      <h2 className={styles.title}>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}