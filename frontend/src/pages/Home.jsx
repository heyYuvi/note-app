import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); 

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleEdit = (id) =>{
        navigate(`/notes/edit/${id}`);
    }

    const handleDelete = async (id) =>{

        const confirmDelte = window.confirm("Delete this note?");
        if(!confirmDelte){
            return
        }

        try{
            await api.delete(`/note/${id}`);
        setNotes((previousNotes) =>{
            return previousNotes.filter((note) => note.id !== id);
        });
    
        }catch(error){
            console.log(error.response?.data?.message || error.message);
        }    
    }

    useEffect(() => {
        const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            setNotes(res.data.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    fetchNotes();
    }, []);

    if (loading) {
        return <div>...Loading</div>
    }

    if (notes.length === 0) {
        return <div>No Notes Found</div>
    }

    return (
        <div>
            {
                notes.map((note) => (
                    <div key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.description}</p>
                        <button onClick={() =>{handleEdit(note.id)}}>Edit</button>
                        <button onClick={() =>{handleDelete(note.id)}}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;