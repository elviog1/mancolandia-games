import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import LeftSideBar from "../components/LeftSideBar";
import MainContainer from "../components/MainContainer";
import TopBar from "../components/TopBar";
import RightSideBar from "../components/RightSideBar";
import BottomBar from "../components/BottomBar";
export const metadata = {
  title: "Mancolandia Games",
  description: "Busca un compañero de juego en tu tiempo libre",
};
import '../globals.css'
const inter = Inter({ subsets: ["latin"] });

export default function LayoutPage({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-950 text-white`}>
          <main className="flex flex-row">
            <LeftSideBar />
            <MainContainer>
              {children}
            </MainContainer>
            <RightSideBar />
          </main>
            <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
