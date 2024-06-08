import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./ui/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: '%s | Counties Power Outages App',
        default: 'Counties Power Outages App',
    },
    description: 'Counties Power Outages App by Ryan H',
};

export default function RootLayout({ children, }: {children: React.ReactNode;}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Navigation />
                {children}
            </body>
        </html>
    );
}
