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
import AdminLayout from "../components/AdminLayout";
import AdminHome from "../pages/AdminHome";
import AdminApartments from "../pages/AdminApartments";
import AdminPosts from "../pages/AdminPosts";
import AdminCourseMaterials from "../pages/AdminCourseMaterials";
import CreateApartment from "../pages/CreateApartment";

export default function Provider({ allowAdmin = true }) {
  //hardcoded just to show the admin dashboard
  const adminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "apartments",
        element: <AdminApartments />,
      },
      {
        path: "apartments",
        element: <AdminApartments />,
      },
      {
        path: "posts",
        element: <AdminPosts />,
      },
      {
        path: "course-materials",
        element: <AdminCourseMaterials />,
      },
      {
        path: "apartments/create",
        element: <CreateApartment />,
      },
    ],
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "blog",
          element: <BlogPosts />,
        },
        {
          path: "apartments",
          element: <Apartments />,
        },
        {
          path: "apartments/:apartmentID",
          element: <ApartmentDetails />,
        },
        {
          path: "learn",
          element: <Learn />,
        },
        {
          path: "map",
          element: <SchoolMap />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "sign-in",
          element: <Signup />,
        },
      ],
    },
    allowAdmin
      ? {
          ...adminRoutes,
          children: [...adminRoutes.children],
        }
      : {},
  ]);
  return <RouterProvider router={router} />;
}
