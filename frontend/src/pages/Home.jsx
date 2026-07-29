import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); 

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const pages = [];

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
            const res = await api.get(`/notes`, {
                params: {
                    search,
                    page
                }
            });
            setNotes(res.data.data);
            setTotalPages(res.data.pagination.totalPages);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    fetchNotes();
    }, [search, page]);

    if (loading) {
        return <div>...Loading</div>
    }

    if (notes.length === 0) {
        return <div>No Notes Found</div>
    }

    for(let i=1; i<=totalPages; i++){
        pages.push(i);
    }

    return (
        <>
        <input type="text" value={search} placeholder="Search for notes" onChange={(e) =>{setSearch(e.target.value)}}></input>

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
        <div>
            <button disabled={page === 1} onClick={() =>{setPage(page - 1)}}>Previous</button>
            {pages.map((pageNumber) =>(
                <button key={pageNumber} disabled={page === pageNumber} onClick={() =>{setPage(pageNumber)}}>{pageNumber}</button>
            ))
            }
            <button disabled={page === totalPages} onClick={() =>{setPage(page + 1)}}>Next</button>
        </div>
        </>
    )
}

export default Home;