import Head from "next/head";
import { Box } from "@chakra-ui/react";

// import Footer from './Footer';
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Xclusive Estate</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          footer
          {/* <Footer /> */}
        </footer>
      </Box>
    </>
  );
}
