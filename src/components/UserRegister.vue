<template>
  <div tabindex="-1" aria-hidden="true" class="overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div
            class="flex justify-between items-center  pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign Up </h2>
          <button type="button"
                  @click="$emit('close', '')"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="space-y-6" >
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
            <div class="mt-2">
              <input id="email" v-model="user.email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
              <p v-if="error.emailError" class="mt-2 text-sm text-red-600 dark:text-red-500">kindly add a correct email</p>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-white">Name</label>
            <div class="mt-2">
              <input id="name" v-model="user.name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
              <p v-if="error.nameError" class="mt-2 text-sm text-red-600 dark:text-red-500">Name should be greater than 2 letters</p>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password"  class="block text-sm font-medium leading-6 text-white">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <p v-if="error.passwordError" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> kindly fill the password</p>
            </div>
          </div>
          <p v-if="error.apiRequestMessage!= ''" class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ error.apiRequestMessage }}</p>

          <div>
            <button  @click="registerUser" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div  class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
</template>
<script setup lang="ts">
import {ref, watch, defineEmits, defineProps} from "vue";
const emit = defineEmits(['close', 'register']);
const props = defineProps<{
  apiErrorMessage: string
}>();

const user = ref({
  name:'',
  email: '',
  password: ''
})
const error = ref({
  emailError: false,
  nameError:false,
  passwordError: false,
  apiRequestMessage: ''

})

watch(() => props.apiErrorMessage, (newVal: string) => {
  error.value.apiRequestMessage = newVal;
});
watch(user, (newVal) => {
  error.value.emailError = !newVal.email.includes('@');
  error.value.nameError = newVal.name.length < 2;
  error.value.passwordError = newVal.password.length < 1;
}, { deep: true });

const registerUser = async () => {
  if (!error.value.emailError && !error.value.passwordError && !error.value.nameError) {
    emit('register', user.value);
  }
}
</script>