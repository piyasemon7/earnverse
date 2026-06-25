import type { Metadata } from "next";
import "./globals.css";
import TopBar from "../components/header/TopBar";
import MainHeader from "../components/header/MainHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "EarnVerse - Learn Online Earning",
  description: "Learn Online Earning, Freelancing & Digital Skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0, background: '#f5f5f5'}}>
        <TopBar />
        <MainHeader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}