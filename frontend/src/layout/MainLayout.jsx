import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () =>{

    return (
        <div className="h-screen flex w-full">
        <Sidebar />
        
        <main className="flex-1">
            <Outlet />
        </main>
        </div>
    )
}

export default MainLayout;