import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { request } from "@/lib/datoCMS/client";
import { NavbarDocument } from "@/gql/generated/graphql";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const { navbar } = await request(NavbarDocument, {}, { tags: ["navbar"] });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar data={navbar} />
          <main className="pt-14 min-[90vh]">{children}</main>
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
