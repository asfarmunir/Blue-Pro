import { Inter } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/lib/AuthSession";
import NextTopLoader from "nextjs-toploader";


const inter = Inter({ subsets: ["latin"] });
   import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "BluPro",
  description: "BluPro App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthSessionProvider>
          
      <body className={inter.className}>
        <NextTopLoader
              color="blue"
              initialPosition={0.08}
              crawlSpeed={200}
              height={2}
              crawl={true}
              showSpinner={false}
              easing=" ease-in-out"
              speed={200}
              shadow="0 0 5px #2299DD,0 0 5px #2299DD"
            />
            {children}
      <ToastContainer />
      </body>
      </AuthSessionProvider>
    </html>
  );
}
