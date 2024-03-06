import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-black w-[100vw] min-h-[100vh] py[120px] relative">
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
}