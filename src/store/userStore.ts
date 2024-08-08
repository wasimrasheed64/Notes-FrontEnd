import { Module, ActionContext } from 'vuex';
import { UserService } from '@/services/userService';
import { UserType, AuthState, AuthResponse,RootState } from '@/types/common';

const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state: (): AuthState => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    mutations: {
        setToken(state, token: string) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
        setUser(state, user: UserType) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }: ActionContext<AuthState, RootState>, userData: UserType) {
                const response: AuthResponse = await UserService().userLogin(userData);
                commit('setToken', response.token);
                commit('setUser', response.user);
        },
        async register({ commit }: ActionContext<AuthState, RootState>, userData: UserType) {
                const response: AuthResponse = await UserService().userRegister(userData);
                commit('setToken', response.token);
                commit('setUser', response.user);
        },
        async fetchUser({ commit, state }: ActionContext<AuthState, RootState>) {
            if (state.token) {
                try {
                    const response = await UserService().getUser(state.token);
                    commit('setUser', response);
                } catch (error) {
                    console.error('Fetch user error:', error);
                    commit('clearToken');
                    commit('clearUser');
                }
            }
        },
        logout({ commit }: ActionContext<AuthState, RootState>) {
            commit('clearToken');
            commit('clearUser');
        },
    },
    getters: {
        isAuthenticated: (state: AuthState) => !!state.token,
        getUser: (state: AuthState) => state.user,
    },
};

export default auth;
