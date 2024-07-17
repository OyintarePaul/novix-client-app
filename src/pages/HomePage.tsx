import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useSignOut } from "../hooks/firebase";
import Hero from "../components/Hero";

const HomePage = () => {
    const { mutate: signOut } = useSignOut()
    return <div>
        <Hero />
        <Link to="/auth/login">
            <Button>
                Go to auth
            </Button>
            <Button variant="outline" onClick={signOut}>Log out</Button>
        </Link>
    </div>
}

export default HomePage