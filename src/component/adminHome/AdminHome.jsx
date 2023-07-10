import { Outlet } from "react-router-dom";
import AdminNavebar from "../shered/AdminNavebar";
import Drawer from "../drawer/Drawer";

const AdminHome=()=>{
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