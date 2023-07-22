import { Outlet, useNavigate } from "react-router-dom";
import AdminNavebar from "../shered/AdminNavebar";
import Drawer from "../drawer/Drawer";
import { getSession } from "../Login_Registration/SessionManagement/SessionManagement";
import { useEffect } from "react";

const AdminHome=()=>{
    const { isLoggedIn } = getSession();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
    }, [isLoggedIn, navigate]);
    return (
        <div>
            <AdminNavebar />
             <div className="grid" style={{gridTemplateColumns:"1fr 4fr"}}>
              <Drawer />
             <div className="px-7 mt-7">
                <Outlet />
             </div>
             </div>
        </div>
    );
}

export default AdminHome;