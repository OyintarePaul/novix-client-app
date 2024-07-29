import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

const AdminApartments = () => {
  return (
    <div>
      <Button asChild>
        <Link to="/admin/apartments/create">
          <Plus className="mr-2 w-4 h-4" /> Add a new apartment
        </Link>
      </Button>
    </div>
  );
};
export default AdminApartments;
