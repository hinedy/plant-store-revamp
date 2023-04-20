import Header from "./Header";
import Head from "next/head";
import Footer from "./Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Plant Store</title>
        <meta name="description" content="plant e-commerce site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;