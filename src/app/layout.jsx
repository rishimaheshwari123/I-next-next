import Navbar from "@/components/common/Navbar";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ButtomIcon from "@/components/ButtomIcon";



export const generateMetadata = () => {
  return {
    title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
    description:
      "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
    keywords:
      "",
    url: "https://inextets.in/",
    image: "/android-chrome-192x192",

    // Open Graph Tags
    openGraph: {
      type: "website",
      url: "https://inextets.in/",
      title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
      description:
        "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
      image: "/android-chrome-192x192",
    },

    // Twitter Tags
    twitter: {
      card: "summary_large_image",
      title: "Top Digital Marketing Agency in Bhopal - I Next ETS",
      description:
        "I Next ETS is a cutting-edge digital marketing company in Bhopal specializing in SEO, SMM, web development, e-commerce development, and mobile app development.",
      image: "/android-chrome-192x192",
    },
  };
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
        <Navbar />
        {children}
        <ScrollToTop />
        <ButtomIcon />
        <Footer />
      </body>
    </html>
  );
}
