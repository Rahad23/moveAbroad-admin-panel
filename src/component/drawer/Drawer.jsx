import { Link } from "react-router-dom";
import "./drawerCss/Drawer.css";
import { FaBook } from "react-icons/fa";
import { AiOutlineDeliveredProcedure, AiOutlineUserSwitch } from "react-icons/ai";
const Drawer =()=>{
    return(
        <div className="shadow-none border-gradient px-2 h-screen">
  <div className="text-gray-950">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-72 h-full bg-[#ffffff] text-base-content">
      {/* Sidebar content here */}
      <li><Link className="hover:bg-white focus:text-gray-950 font-medium text-base text-gray-950 justify-between">Users <AiOutlineUserSwitch className="text-lg" />
      </Link></li>
      <li><Link to={"/adminEbooks"} className="hover:bg-white focus:text-gray-950 font-medium text-base text-gray-950 justify-between">E_Books<FaBook className="text-lg" /></Link></li>
      <li><Link to={"/live_seminar"} className="hover:bg-white focus:text-gray-950 font-medium text-base text-gray-950 justify-between">Live online seminar<AiOutlineDeliveredProcedure className="text-lg" /></Link></li>
    </ul>
  </div>
</div>
    )
}

export default Drawer;