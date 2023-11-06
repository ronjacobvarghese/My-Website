import { Inter } from "next/font/google";

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
    <main className={`${inter.className} pl-10 flex justify-center blog`}>
      <div className="w-full md:w-[65%] md:max-w-[45rem]">{children}</div>
    </main>
  );
}
