import type { Metadata } from "next";
import { Raleway } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title:
    'Xuba. IT Services, support partner.  Cloud technology. Small to medium size businesses. Hamilton, NZ ',
  description:
    'Looking for a dedicated, hard-working, clever IT support partner?  You&apos;ve come to the right place.  Located in Hamilton, Waikato, New Zealand, Xuba offers a robust range of IT support products and services including Cloud technology, Helpdesk remote support, System deployment, Server support and security, Network configuration, Proactive IT Support, Incident Support, & SMB IT Guidance. ',
}

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${raleway.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
