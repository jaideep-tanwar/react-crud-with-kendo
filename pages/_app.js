// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import Head from 'next/head';

import 'styles/globals.css';
import { Nav} from '../components/Nav';
import { Alert } from '../components/Alert';

export default App;

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Next.js 10 - CRUD Example with React Hook Form</title>

                {/* bootstrap css */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <div className="app-container bg-light">
                <Nav />
                <Alert />
                <div className="container pt-4 pb-4">
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    );
}