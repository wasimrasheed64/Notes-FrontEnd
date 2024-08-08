import {Note} from "@/types/common";
import axios from "axios";

export function NoteService() {
    const createNote = async (note: Note,token:string) => {
        return await axios.post('http://localhost:8000/api/notes', note, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "authorization": `Bearer ${token}`,
                },
        });
    }

    const getNotes = async (token:string,page:number,pageSize:number) => {
        return await axios.get(`http://localhost:8000/api/notes?page=${page}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "authorization": `Bearer ${token}`,
                },
        });
    }
    const getNoteById = async (noteId:number,token:string) => {
        return await axios.get(`http://localhost:8000/api/notes/${noteId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "authorization": `Bearer ${token}`,
                },
        });
    }
    const updateNote = async (note: Note,token:string) => {
        return await axios.put(`http://localhost:8000/api/notes/${note.id}`, note, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "authorization": `Bearer ${token}`,
                },
        });
    }

    const deleteNoteById = async (noteId: string,token:string) => {
        return await axios.delete(`http://localhost:8000/api/notes/${noteId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "authorization": `Bearer ${token}`,
                },
        });
    }
    return {
        createNote,
        getNotes,
        getNoteById,
        updateNote,
        deleteNoteById
    }
}