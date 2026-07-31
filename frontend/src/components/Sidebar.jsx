import { NavLink } from "react-router-dom"
import Logout from "./Logout";

const Sidebar = () =>{

    return (
        <div className="h-200 bg-[#EFF4FF] w-[256px] flex flex-col">
            <div className="h-8 w-52 p-6">
                <p className="font-bold text-[24px] text-[#3525CD]">ZenNotes</p>
                </div>
            <ul className="p-4">
                <li className="mt-2">
                    <NavLink to="/" className={({ isAtive }) =>`block rounded-md text-[#35225CD] px-4 py-2 ${isAtive? "bg-[#DAE2FD]": "hover:bg-[#DAE2FD]" }`}>
                    Home
                    </NavLink>
                </li>
                <li className="mt-2">
                    <NavLink to="/create" className={({ isActive}) => `block rounded-md px-4 py-2 text-[#35225CD] ${isActive? "bg-[#DAE2FD]" : "hover:bg-[#DAE2FD]"}`}>
                    Create Notes
                    </NavLink>
                </li>
            </ul>
            <div className="mt-auto pb-6 px-4" >
                <Logout/>
            </div>
        </div>
        
    )
}

export default Sidebar;