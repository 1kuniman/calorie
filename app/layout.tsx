import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calorie-keisan.vercel.app";

export const metadata: Metadata = {
  title: "カロリー計算機 - 食品のカロリーを無料で計算・記録",
  description:
    "食品名と量を入力するだけでカロリーを即座に計算。よく使う食品20種類をワンタップで選択でき、1日の摂取カロリーを記録できる無料ツールです。ダイエット・健康管理にご活用ください。",
  keywords: ["カロリー計算機", "カロリー計算", "食品カロリー", "ダイエット", "カロリー管理", "無料ツール"],
  authors: [{ name: "カロリー計算機" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "カロリー計算機 - 食品のカロリーを無料で計算・記録",
    title: "カロリー計算機 - 食品のカロリーを無料で計算・記録",
    description: "食品のカロリーを即座に計算・記録できる無料ツール。よく使う食品20種をワンタップ選択。",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "カロリー計算機" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "カロリー計算機 - 食品のカロリーを無料で計算・記録",
    description: "食品のカロリーを即座に計算・記録できる無料ツール。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "9hsoM-4jQQ8ck8mOn39f6Z5K9A5QZOZzd_AdUX24QPM",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">{children}</body>
    </html>
  );
}
