import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";





const Home = () => {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const pages = [];

    const handleEdit = (id) => {
        navigate(`/notes/edit/${id}`);
    }

    const handleDelete = async (id) => {

        const confirmDelte = window.confirm("Delete this note?");
        if (!confirmDelte) {
            return
        }

        try {
            await api.delete(`/note/${id}`);
            setNotes((previousNotes) => {
                return previousNotes.filter((note) => note.id !== id);
            });

        } catch (error) {
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

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center">
            <div className="h-278.5 w-200 pt-10">
                <div className="flex flex-col w-200 gap-4">
                    <div>
                        <p className="text-[16px] text-[#3525CD]">---- WORKSPACE</p>
                    </div>
                    <div>
                        <p className="text-[48px] font-bold">My Notes</p>
                    </div>
                    <div className="flex gap-6">
                        <p>
                            Organize your thoughts, capture inspiration, and keep your
                            digital life in sync.
                        </p>
                        <button onClick={() => { navigate("/create") }} className="flex items-center  gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-400 transition-all rounded-md cursor-pointer"><CgAdd />Create New Note</button>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center gap-2 bg-blue-100 py-1 px-2">
                        <CiSearch />
                        <input type="text" value={search} placeholder="Search your thoughts..." onChange={(e) => { setSearch(e.target.value) }} className="flex-1 outline-none"></input>
                    </div>


                    <div className="grid grid-cols-2 gap-6 mt-10">
                        {
                            notes.map((note) => (
                                <div key={note.id} className="hover:bg-blue-100 transition-all rounded-md px-4 py-2 flex flex-col">
                                    <div className="">
                                        <h2 className="font-semibold">{note.title}</h2>
                                    </div>
                                    <div className="mt-2">
                                        <p>{note.description}</p>
                                    </div>
                                    <div className="flex  mt-6 justify-between">
                                        <div>
                                        <p className="text-gray-400">{new Date(note.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })}</p>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                    <button onClick={() => { handleEdit(note.id) }} className="cursor-pointer hover:text-gray-400 transition"><FaEdit /></button>
                                    <button onClick={() => { handleDelete(note.id) }} className="cursor-pointer hover:text-gray-400 transition"><MdDelete /></button>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div  className="flex gap-4 items-center justify-center mt-40">
                        <button disabled={page === 1} onClick={() => { setPage(page - 1) }} className="border rounded-md px-2 py-1 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                        {pages.map((pageNumber) => (
                            <button key={pageNumber} disabled={page === pageNumber} onClick={() => { setPage(pageNumber) }} className={`w-10 h-10 rounded-md transition ${page === pageNumber? "bg-[#3525CD]  text-white" : "border-gray-300 hover:bg-gray-200"}`}>{pageNumber}</button>
                        ))
                        }
                        <button disabled={page === totalPages} onClick={() => { setPage(page + 1) }} className="border rounded-md px-2 py-1 border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;