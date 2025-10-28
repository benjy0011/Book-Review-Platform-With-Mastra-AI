import { Outlet } from "react-router"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <Outlet />
    </div>
  )
}
export default Layout