// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import CustomCursor from "../components1/global/CustomCursor";
import { ThemeProvider } from "../components1/theme-provider";

export const metadata: Metadata = {
  title: "Catenally | Data Inspired · Tech Integrated · Real Time Thinkers",
  description:
    "Catenally is a software & digital solutions company delivering web, mobile, and technology-driven products with precision, performance, and innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ThemeProvider>

          <CustomCursor />

          <ConditionalLayout>
            {children}
          </ConditionalLayout>

        </ThemeProvider>
      </body>
    </html>
  );
}