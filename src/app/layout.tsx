import { Yeseva_One } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/component/navbar";
import AuthProvider from "@/auth/components/AuthProvider";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { Footer } from "@/components/component/footer";

const yeseva_one = Yeseva_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-yeseva_one",
  weight: "400",
});
const dm_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm_serif_display",
  weight: "400",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={yeseva_one.variable + " " + dm_serif_display.variable}>
          <Navbar />
          <Sidebar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
