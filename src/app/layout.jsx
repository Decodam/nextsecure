import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/hooks/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Secure",
  description: "Secure next.js auth template with prisma adapter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
