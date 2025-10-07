import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Suvidha",
  description: "POS and inventory management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

