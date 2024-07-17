import { NavLink } from "react-router-dom"
import { navItems } from "../constants"
import { cn } from "../lib/utils"

const NavBar = () => {
  return (
    <nav className="flex gap-4">{navItems.map((item, index) => (<NavLink className={({ isActive }) => cn(isActive ? "border-b border-red-500" : "", "px-4 py-2")} to={item.path} key={index}>{item.label}</NavLink>))}</nav>
  )
}

export default NavBar