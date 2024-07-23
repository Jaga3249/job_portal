import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Home/Nav";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

const font = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job_portal | Find Your Dream Job",
  description: "Find Your Dream Job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MantineProvider>
          <Nav />
          {children}
          <Toaster />
        </MantineProvider>
      </body>
    </html>
  );
}
