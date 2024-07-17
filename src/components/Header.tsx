import { Search } from "lucide-react"
import NavBar from "./NavBar"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useSignOut } from "../hooks/firebase"
import { Link } from "react-router-dom"

const Header = () => {
    const { mutate: signOut } = useSignOut()
    return (
        <header className="flex justify-between items-center p-2 max-w-6xl mx-auto">
            <Link to="/"><p className="text-2xl font-bold">NOVIX</p></Link>
            <NavBar />
            <div className="flex gap-4 items-center">
                <Search />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </header>
    )
}

export default Header