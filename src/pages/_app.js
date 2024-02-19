// pages/_app.js veya sayfa dosyalarında direkt olarak kullanabilirsiniz
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
        {/* Diğer head elemanları */}
        {/* Leaflet CSS */}
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha384-VzLXTJGPSyTLX6d96AxgkKvE/LRb7ECGyTxuwtpjHnVWVZs2gp5RDjeM/tgBnVdM"
          crossorigin="anonymous"
        /> */}
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.js"
        /> */}
        {/* React-Leaflet */}
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
