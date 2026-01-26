import type { Metadata } from "next";
import { Poppins, Raleway } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title:
    'Xuba. IT Services, support partner.  Cloud technology. Small to medium size businesses. Hamilton, NZ ',
  description:
    'Looking for a dedicated, hard-working, clever IT support partner?  You&apos;ve come to the right place.  Located in Hamilton, Waikato, New Zealand, Xuba offers a robust range of IT support products and services including Cloud technology, Helpdesk remote support, System deployment, Server support and security, Network configuration, Proactive IT Support, Incident Support, & SMB IT Guidance. ',
}

const raleway = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
