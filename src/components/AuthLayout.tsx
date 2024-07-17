import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-full max-w-72">
                <Outlet />
            </div>
        </div>
    )
}