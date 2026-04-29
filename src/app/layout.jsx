import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ConditionalLayout from "@/components/ConditionalLayout";
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
  description:
    "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
  keywords:
    "digital marketing, SEO, SMM, web development, mobile app development, Bhopal, I Next ETS",
  authors: [{ name: "I Next ETS" }],
  creator: "I Next ETS",
  publisher: "I Next ETS",
  
  // Favicon and Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  // Open Graph Tags
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inextets.in/",
    siteName: "I Next ETS",
    title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
    description:
      "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
    images: [
      {
        url: "https://inextets.in/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "I Next ETS Logo",
      },
    ],
  },

  // Twitter Tags
  twitter: {
    card: "summary_large_image",
    title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
    description:
      "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
    images: ["https://inextets.in/android-chrome-512x512.png"],
    creator: "@inextets",
  },

  // Additional Meta Tags
  metadataBase: new URL("https://inextets.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "I Next ETS",
            url: "https://www.inextets.in/",
            logo: "https://i.ibb.co/N608STN/inext-ets-logo.jpg",
          })}
        </script>
      </head>
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
