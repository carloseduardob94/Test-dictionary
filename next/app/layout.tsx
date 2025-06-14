import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { WordProvider } from "./context/WordContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "Busque palavras, salve no histórico e favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>
          <WordProvider>
            <Layout>{children}</Layout>
          </WordProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
