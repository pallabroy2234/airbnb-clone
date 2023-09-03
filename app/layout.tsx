import "./globals.css";
import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import Navbar from "@/app/components/Navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LogInModal from "./components/modals/LogInModal";
import {getCurrentUser} from "./actions/getCurrentUser";

// import Modal from "@/app/components/modals/Modal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          {/* <Modal title='Palalb' isOpen actionLabel='submit' secondaryActionLabel={"Pallab"} /> */}
          <ToasterProvider />
          <RegisterModal />
          <LogInModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
