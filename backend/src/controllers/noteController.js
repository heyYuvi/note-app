import mongoose from "mongoose";
import Note from "../models/Note.js";
import noteSchema from "../validators/noteValidations.js"
import updateNoteSchema from "../validators/updateNoteValidations.js";

// Create Note

export const createNote = async (req, res) => {
    try {

        const result = noteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        const note = await Note.create({
            title: data.title.trim(),
            description: data.description.trim(),
            user: req.user._id
        });

        await note.populate("user", "name");

        return res.status(201).json({
            success: true,
            data: {
                id: note._id,
                title: note.title,
                description: note.description,
                user: {
                    id: note.user._id,
                    name: note.user.name
                }
            },
            message: "Note Created"
        });
    } catch (error) {
        console.error("Create Note error", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get All the Notes


export const getAllNotes = async (req, res) => {
    try {
        let query = { user: req.user._id };
        const { search, page, limit } = req.query;

        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 4;
        const skip = (pageNumber - 1) * limitNumber;

        if (search) {
            query.$or = [
                {
                    title: { $regex: search, $options: "i" },
                },
                {
                    description: { $regex: search, $options: "i" }
                }]
        }

        const notes = await Note.find(query).populate("user", "name").sort({ updatedAt: -1}).limit(limitNumber).skip(skip);

        const total = await Note.countDocuments(query);

        const totalPages = Math.ceil(total / limitNumber);

        return res.json({
            success: true,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                skip: skip,
                total: total,
                totalPages: totalPages
            },
            data:
                notes.map((note) => ({
                    id: note._id,
                    title: note.title,
                    description: note.description,
                    user: {
                        id: note.user._id,
                        name: note.user.name
                    },
                    updatedAt: note.updatedAt,
                    createdAt: note.createdAt
                }))
        });
    } catch (error) {
        console.error("Get All Notes error", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get Single Note

export const getSingleNote = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            });
        }

        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note Not Found"
            });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not Allowed"
            })
        }

        await note.populate("user", "name");

        return res.json({
            succes: true,
            data: {
                id: note._id,
                title: note.title,
                description: note.description,
                user: {
                    id: note.user._id,
                    name: note.user.name
                }
            }
        });
    } catch (error) {
        console.error("Get Single Note error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Update Note

export const updateNote = async (req, res) =>{
    try{
        const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        });
    }

    const result = updateNoteSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        }); 
    }

    const data = result.data;

    if(!data.title && !data.description){
        return res.status(400).json({
            success: false,
            message: "Please provide at least 1 field to update"
        });
    }

    const note = await Note.findById(id).populate("user", "name");
    if(!note){
        return res.status(404).json({
            success: false,
            message: "Note Not Found"
        });
    }

    if(note.user._id.toString() !== req.user._id.toString()){
        return res.status(403).json({
            success: false,
            message: "Not Allowed"
        });
    }

    note.title = data.title || note.title;
    note.description = data.description || note.description;

    await note.save();

    return res.json({
        success: true,
        data: {
            id: note._id,
            title: note.title,
            description: note.description,
            user: {
                id: note.user._id,
                name: note.user.name
            }
        }
    });
    }catch(error){
        console.error("Update Note error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Delete Note

export const deleteNote = async (req, res) =>{
    try{
        const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        }); 
    }

    const note = await Note.findById(id);
    if(!note){
        return res.status(404).json({
            success: false,
            message: "Note Not Found"
        });
    }

    if(note.user.toString() !== req.user._id.toString()){
        return res.status(403).json({
            success: false,
            message: "Not Allowed"
        });
    }

    await note.deleteOne();

    return res.json({
        success: true,
        message: "Note Deleted"
    });
    }catch(error){
        console.error("Delete Note error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}