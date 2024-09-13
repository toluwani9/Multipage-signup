import SideBar from "@/components/SideBar";
import "./globals.css";
import { Ubuntu } from "next/font/google";
import Providers from "./redux/provider";
import LazyMotion from './LazyMotion'

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Multi-stage sign up form",
  description: "sign up form with multiple steps",
};

async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${ubuntu.className} bg-sky-100 relative lg:py-10`}>
        <Providers>
          <LazyMotion>
          <div className="  lg:wrapper">
          <SideBar />
            {children}
          </div>

          </LazyMotion>

        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
