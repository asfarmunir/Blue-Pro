import { Inter } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/lib/AuthSession";

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
      <body className={inter.className}>{children}
      <ToastContainer />
      </body>
      </AuthSessionProvider>
    </html>
  );
}
