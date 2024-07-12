import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/Navbar/TopNavbar";
import MuiTheme from "@/components/MuiTheme";
import Form from "@/contexts/FormContext";
import AppWalletProvider from "@/components/AppWalletProvider";
import Redirection from "@/components/Redirection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus Platform",
  description: "this the description for nexus platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWalletProvider>
          <MuiTheme>
            <TopNavbar />
            <Redirection>
              <Form>{children}</Form>
            </Redirection>
          </MuiTheme>
        </AppWalletProvider>
      </body>
    </html>
  );
}
