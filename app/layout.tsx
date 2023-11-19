//! Required
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

//! Components
import { Toaster } from "sonner";
import ConvexClientProvider from "@/components/providers/convex-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
    title: "Note It",
    description: "Note It, Just a pro-clone of Notion Note taking app",
};

//! Template
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <body className={inter.className}>
                <ConvexClientProvider>
                    <EdgeStoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                            storageKey="note-it-theme"
                        >
                            <Toaster position="bottom-center" />
                            <ModalProvider />
                            {children}
                        </ThemeProvider>
                    </EdgeStoreProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
};
export default RootLayout;
