import { Link } from "react-router-dom";
import "./style/NavbarStyle.css";
import { GoTriangleDown } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
const AdminNavebar=()=>{
    return(
      <div>
          <div className="navbar bg-white px-6 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl font-serif text-[#ED1C20] uppercase">
      Admin
    </a>
  </div>
  <div className="dropdown dropdown-end">
  <label tabIndex={0} className="flex gap-x-2 cursor-pointer" title="Admin">
  <div className="avatar placeholder">
    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
      <div className="w-full rounded-full h-full">
        <img src="https://images.pexels.com/photos/208134/pexels-photo-208134.jpeg?auto=compress&cs=tinysrgb&w=400" />
      </div>
    </div>
</div> 
<div className="flex items-center gap-x-1">
  <span className="text-base font-sans text-gray-950">Hrithik</span>
  <GoTriangleDown className="text-[10px]" />
</div> 
<ul tabIndex={0} className="dropdown-content  z-50 menu p-2 shadow bg-white rounded-box w-52 mt-12 ">
    <li className="shadow-none"><Link className="hover:bg-gray-50 focus:text-gray-950 rounded-none">Profile</Link></li>
    <li className="shadow-none"><Link className="hover:bg-gray-50 focus:text-gray-950 rounded-none">Settings</Link></li>
    <li className="shadow-none"><Link className="hover:bg-gray-50 focus:text-gray-950 rounded-none">Help</Link></li>
    <li className="shadow-none hover:rounded-none"><Link className="hover:bg-gray-50 justify-between focus:text-red-600 text-red-600">Log Out <AiOutlineLogout /></Link></li>
  </ul>
  </label>
  </div>
</div>
      </div>
    );
}

export default AdminNavebar;