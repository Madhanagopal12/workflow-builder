import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrape Flow",
  description: "Workflow Automation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
