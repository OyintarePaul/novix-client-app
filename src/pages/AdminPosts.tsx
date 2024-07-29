import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const AdminPosts = () => {
  return (
    <div>
      <Button asChild>
        <Link to="/admin/posts/create">
          <Plus className="mr-2 w-4 h-4" /> Add a new post
        </Link>
      </Button>
    </div>
  );
};
export default AdminPosts;
