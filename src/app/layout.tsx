// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import CustomCursor from "../components1/global/CustomCursor";
import { ThemeProvider } from "../components1/theme-provider";

export const metadata: Metadata = {
  title: "Yogesh Verma | Software & Mobile App Solutions Developer",
    description:
    "Yogesh Kumar is a freelance developer providing end-to-end software solutions including mobile apps, web platforms, and scalable digital products using modern technologies like iOS, React Native, and Next.js.",
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