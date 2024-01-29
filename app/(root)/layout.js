import { Inter } from "next/font/google";
import LeftSideBar from "../components/LeftSideBar";
import MainContainer from "../components/MainContainer";
import RightSideBar from "../components/RightSideBar";
import BottomBar from "../components/BottomBar";
export const metadata = {
  title: "Mancolandia",
  description: "Busca un compañero de juego y diviertete.",
};
import "../globals.css";
import Provider from "../components/Provider";
const inter = Inter({ subsets: ["latin"] });

export default function LayoutPage({ children }) {
  return (
    <html lang="en">
        <body className={`${inter.className} bg-gray-950 text-white`}>
      <Provider>
          <main className="flex flex-row">
            <LeftSideBar />
            <MainContainer>{children}</MainContainer>
            <RightSideBar />
          </main>
          <BottomBar />
      </Provider>
        </body>
    </html>
  );
}
