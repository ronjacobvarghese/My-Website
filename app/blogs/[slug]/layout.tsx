import { Inter } from "next/font/google";
import "./blogs.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ron Jacob | Personal Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className}`}>
      <div>{children}</div>
    </main>
  );
}
