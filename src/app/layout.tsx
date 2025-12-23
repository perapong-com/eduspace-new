
import "./globals.css";
import "../styles/index.scss";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <head>
                <link rel="icon" href="/favicon.svg" />
                {/* Inter font for English */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
                {/* TH Sarabun New font for Thai */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" />
            </head>
            <body>
                <LanguageProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
