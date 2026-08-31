import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(
    "https://glucostrips.com"
  ),

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  title: "Diagnostic, Medical & Laboratory Supplies | Raj Biosis",

  description: "Raj Biosis supplies premium diagnostic kits, laboratory equipment, medical consumables, and laboratory diagnostics to hospitals, clinics, and home users across India.",

  keywords: [
    "Diagnostic Supplies",
    "Medical Consumables",
    "Laboratory Equipment",
    "Laboratory Diagnostics",
    "Biomedical Equipment",
    "Medical Supplies India",
  ],

  openGraph: {
    title: "Diagnostic, Medical & Laboratory Supplies | Raj Biosis",

    description: "Premium supplier of diagnostics and medical equipment across India.",

    url: "https://glucostrips.com",

    siteName: "Raj Biosis",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Diagnostic, Medical & Laboratory Supplies | Raj Biosis",

    description: "Premium supplier of diagnostics and medical equipment across India.",

    images: ["/logo.png"],
  },


};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}