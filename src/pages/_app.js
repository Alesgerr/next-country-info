// pages/_app.js 
import Head from "next/head";
import Header from "@/components/Header";
import "../app/globals.css";
import Providers from "@/app/providers";
import Footer from "@/components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Providers>
        <Header />
        <main className="py-5">
          <Component {...pageProps} />
        </main>
        <Footer />
      </Providers>
    </>
  );
}

export default MyApp;
