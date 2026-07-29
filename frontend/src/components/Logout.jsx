import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Logout = () =>{

    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
           const res = await api.get("/auth/logout");
           console.log(res.data);
        navigate("/login");
        }catch(error){
            console.log(error.response?.data?.message || "Logout Error");
        }
    }

    return(
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout;