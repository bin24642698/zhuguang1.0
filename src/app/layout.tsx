import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationProvider } from "@/contexts/NavigationContext";
import "./globals.css";
import "../styles/typing-cursor.css";
import LogControlInitializer from "@/components/common/LogControlInitializer";
import AuthInitializer from "@/components/auth/AuthInitializer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "烛光写作 - 创作空间",
  description: "烛光写作 - 激发你的创作灵感，让写作更加轻松愉快",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#d8e8de" />
        <script dangerouslySetInnerHTML={{ __html: `
          // 处理URL参数，防止水合错误
          if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('inject_video_svd')) {
              // 移除可能导致水合错误的参数
              urlParams.delete('inject_video_svd');
              const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
              window.history.replaceState({}, document.title, newUrl);
            }
          }
        ` }} />
      </head>
      <body
        className={`${inter.variable} antialiased bg-bg-color min-h-screen font-sans`}
        suppressHydrationWarning
      >
        <NavigationProvider>
          {/* 日志控制初始化组件 */}
          <LogControlInitializer />
          {/* 认证初始化组件 */}
          <AuthInitializer />
          <div className="flex flex-col min-h-screen">
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}
