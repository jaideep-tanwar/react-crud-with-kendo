// import Head from 'next/head'
// import Layout, { siteTitle } from '../components/layout'
// import utilStyles from '../styles/utils.module.css'
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>[Your Self Introduction]</p>
//         <p>
//           (This is a sample website - you’ll be building a site like this on{' '}
//           <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//         </p>
//         <Link href="/posts/first-post">
//             <a>Go to FIrst Post</a>
//           </Link>
//       </section>
//     </Layout>
//   )
// }
import { Link } from 'components/Link';

export default Home;

function Home() {
    return (
        <div>
            <h1>Next.js 10 - CRUD Example with React Hook Form</h1>
            <p>An example app showing how to list, add, edit and delete user records with Next.js 10 and the React Hook Form library.</p>
            <p><Link href="/users">&gt;&gt; Manage Users</Link></p>
            <p><Link href="/employee">&gt;&gt; Manage Users</Link></p>
        </div>
    );
}