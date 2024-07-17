import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";
import AppLayout from "../components/AppLayout";
import BlogPosts from "../pages/BlogPosts";
import Apartments from "../pages/Apartments";
import Learn from "../pages/Learn";
import HomePage from "../pages/HomePage";
import SchoolMap from "../components/Map";
import ApartmentDetails from "../pages/ApartmentDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "blog",
                element: <BlogPosts />
            },
            {
                path: "apartments",
                element: <Apartments />,
            },
            {
                path: "apartments/:apartmentID",
                element: <ApartmentDetails/>
            },
            {
                path: "learn",
                element: <Learn />
            },
            {
                path: "map",
                element: <SchoolMap />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "sign-in",
                element: <Signup />
            }
        ]
    }
])

export default function Provider() {
    return <RouterProvider router={router} />
}