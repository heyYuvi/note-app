import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logout from "../components/Logout";

const MainLayout = () =>{

    return (
        <>
        <Sidebar />

        <Logout />
        <Outlet />
        </>
    )
}

export default MainLayout;