import Head from "next/head";
import LoginScreen from "./LoginScreen";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cookoff23 | Admin</title>
      </Head>
      <main className="flex items-center justify-center align-middle bg-color1 h-[100vh] w-[100vw]">
         <LoginScreen />
      </main>
    </>
  );
}
