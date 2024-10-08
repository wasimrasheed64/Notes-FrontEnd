<template>
  <div>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!--
              Icon when menu is closed.

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!--
              Icon when menu is open.

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button v-if="!isAuthenticated" type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <a @click="setModalAction('login')" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page"> Login </a>
            <a @click="setModalAction('register')"  class="rounded-md bg-gray-900 px-3 mx-2 py-2 text-sm font-medium text-white" aria-current="page"> Register </a>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button v-if="isAuthenticated" @click="toggleMenu" type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <a href="#" class="block px-4 py-2 text-sm text-white" role="menuitem" tabindex="-1" id="user-menu-item-2">{{ user?.name ?? '' }}</a>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              </button>
            </div>
            <div v-if="isMenuOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a href="#" @click="logOut" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <UserLogin @close="setModalAction" @login="login" v-if="modalAction ==='login'" :apiErrorMessage="apiErrorMessage"></UserLogin>
  <UserRegister @close="setModalAction" @register ="register"  v-if="modalAction ==='register'" :apiErrorMessage="apiErrorMessage" ></UserRegister>
  </div>
</template>
<script setup  lang="ts">
import {ref, computed, onBeforeMount} from 'vue';
import UserLogin from "@/components/UserLogin.vue";
import UserRegister from "@/components/UserRegister.vue";
import { useStore } from 'vuex';
import {UserType} from "@/types/common";
import { AxiosError } from 'axios';

const store = useStore();
const isMenuOpen =  ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
const modalAction = ref('');
const apiErrorMessage = ref('');

const isAuthenticated = computed(() => store.getters["userStore/isAuthenticated"]);
const user = computed(() => store.getters["userStore/getUser"]);
onBeforeMount(() => {
  store.dispatch('userStore/fetchUser');
});


const logOut = async () => {
  toggleMenu();
  await store.dispatch('userStore/logout');
};

const setModalAction = (action: string) =>{
  modalAction.value = modalAction.value === action ? '' : action
};

const login = async (userData:UserType ) => {
  try {
    await store.dispatch('userStore/login', userData);
    setModalAction('');
  }catch(e){
    if (e instanceof AxiosError && e.response) {
      apiErrorMessage.value = e.response.data.message;
    } else {
      console.error('An unexpected error occurred:', e);
      apiErrorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  }
};

const register = async (userData:UserType ) => {
  try {
    await store.dispatch('userStore/register', userData);
    setModalAction('');
  }catch(e){
    if (e instanceof AxiosError && e.response) {
      apiErrorMessage.value = e.response.data.message;
    } else {
      console.error('An unexpected error occurred:', e);
      apiErrorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  }
};

</script>
