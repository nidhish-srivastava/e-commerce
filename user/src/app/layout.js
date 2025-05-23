import localFont from "next/font/local";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "@/styles/globals.css"
import { ReduxProvider } from "@/utils/providers";
import Navbar from "@/components/common/Navbar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Navbar/>
        {children}
        </ReduxProvider>
      </body>
    </html>
        </ClerkProvider>
  );
}
