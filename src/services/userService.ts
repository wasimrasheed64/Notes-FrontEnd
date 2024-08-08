import {UserType} from "@/types/common";
import axios from "axios";

export function UserService() {
    const userLogin = async (user: UserType) => {
        const response = await axios.post('http://localhost:8000/api/login', user, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;

    }
    const userRegister = async (user: UserType) => {
        const response = await axios.post('http://localhost:8000/api/register', user, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
        });
        return response.data;
    }

    const getUser = async (token:string) => {
         return await axios.get('http://localhost:8000/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
        });

    }
    return {
        userLogin,
        userRegister,
        getUser
    }
}