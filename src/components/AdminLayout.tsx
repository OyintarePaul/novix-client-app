import { NavLink, Outlet } from "react-router-dom";
import { adminNavItems } from "../constants";

const AdminLayout = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Admin dashboard
      </h1>
      <div className="flex">
        <div className="w-[300px] flex flex-col">
          {adminNavItems.map((item) => (
            <NavLink to={item.path} key={item.path} className="p-4">
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
