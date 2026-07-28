import { useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateNote = () =>{

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) =>{
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            
        await api.post("/note", form);
        setForm({
            title: "",
            description: ""
        });

        navigate("/");
        }catch(error){
            console.log(error.response?.data?.message || error.message);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            Title <input type="text" name="title" value={form.title} onChange={handleChange} ></input>
            <textarea name="description" value={form.description}  onChange={handleChange} placeholder="Description"></textarea>
            <button type="submit">Create Note</button>
        </form>
        </>
    )
}

export default CreateNote