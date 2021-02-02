import SearchApp from '../components/SearchApp';
import Head from 'next/head';

export default function Home() {
   return (
      <>
         <Head>
            <title>Yelp Search App</title>
         </Head>
         <SearchApp />
      </>
   );
}
