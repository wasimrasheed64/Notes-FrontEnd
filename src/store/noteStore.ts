import {ActionContext, Module} from 'vuex';
import { NotesState, Note, Pagination ,RootState} from '@/types/common';
import {NoteService} from "@/services/noteService";


const notes: Module<NotesState, RootState> = {
    namespaced: true,
    state: () => ({
        notes: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            lastPage: 1,
        },
        selectedNote: null,
    }),
    mutations: {
        setNotes(state, { notes, pagination }: { notes: Note[], pagination: Pagination }) {
            state.notes = notes;
            state.pagination = pagination;
        },
        setNote(state, note: Note) {
            state.selectedNote = note;
        },
        addNote(state, note: Note) {
            state.notes.push(note);
        },
        updateNote(state, updatedNote: Note) {
            const index = state.notes.findIndex(note => note.id === updatedNote.id);
            if (index !== -1) {
                state.notes.splice(index, 1, updatedNote);
            }
        },

    },
    actions: {
        async getAll({ commit }: ActionContext<NotesState, RootState>, { page = 1, pageSize = 10 }: { page: number, pageSize: number }) {
            try {
                const token = localStorage.getItem('token') || '';
                const response = await NoteService().getNotes(token,page,pageSize);
                commit('setNotes', { notes: response.data.data, pagination: { currentPage :response.data.current_page,lastPage: response.data.last_page } });
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        },
        async getById({ commit }: ActionContext<NotesState, RootState>, noteId: number) {
                const token = localStorage.getItem('token') || '';
                const response = await NoteService().getNoteById(noteId,token);
                commit('setNote', response.data.note);
        },
        async create({ commit }: ActionContext<NotesState, RootState>, note: Note) {
            const token = localStorage.getItem('token') || '';
            await NoteService().createNote(note,token);
        },
        async edit({ commit }: ActionContext<NotesState, RootState>, note: Note) {
                const token =localStorage.getItem('token') || '';
                 await NoteService().updateNote(note,token);
                const response = await NoteService().getNotes(token,1,10);
                commit('setNotes', { notes: response.data.data, pagination: response.data.current_page });
        },
        async delete({ commit }: ActionContext<NotesState, RootState>, noteId: string) {
            try {
                const token = localStorage.getItem('token') || ''
                 await NoteService().deleteNoteById(noteId,token);
                const response = await NoteService().getNotes(token,1,10);
                commit('setNotes', { notes: response.data.data, pagination: response.data.current_page });

            } catch (error) {
                console.error('Error deleting note:', error);
            }
        },
    },
    getters: {
        allNotes: (state: NotesState) => state.notes,
        selectedNote: (state: NotesState) => state.selectedNote,
        pagination: (state: NotesState) => state.pagination,
    },
};

export default notes;
