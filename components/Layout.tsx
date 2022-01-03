import Head from "next/head";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: String;
}

export default function Layout({ children, title }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
}
