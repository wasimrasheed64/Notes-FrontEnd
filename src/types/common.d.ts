export interface  UserType{
    id ?: number;
    name ?: string;
    email: string;
    password: string;
}

export interface AuthState {
    token: string | null;
    user: UserType | null;
}

export interface AuthResponse {
    token: string;
    user: UserType;
}
export interface  Note{
    id ?: number;
    title: string;
    content: string;
    user_id: number;
    user ?: UserType;
}


export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    lastPage: number;
}

export interface NotesState {
    notes: Note[];
    pagination: Pagination;
    selectedNote: Note | null;
}

export interface RootState {
    auth: AuthState;
    notes: NotesState;
}

export interface TableHeader {
    text: string;
    value: string;
    sortable?: boolean;
    align?: string;
    width?: string;
}