import Navbar from "@/components/common/Navbar";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ButtomIcon from "@/components/ButtomIcon";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
