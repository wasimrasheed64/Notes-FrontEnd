import { createStore } from 'vuex';
import noteStore from '@/store/noteStore';
import userStore from '@/store/userStore';
import {RootState} from "@/types/common";

const store = createStore<RootState>({
    modules: {
        userStore,
        noteStore,
    },
});

export default store;
