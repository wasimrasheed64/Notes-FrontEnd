<template>
    <div>
      <section class="bg-gray-50 h-screen  dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <!-- Start coding here -->
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <NoteTableTopBar @create="toggleModal" />
            <NoteTables :notes="notes" @getSelectedNote="getSelectedNote"  :headers="headers" @toggleAction="toggleModal"  />
          </div>
        </div>
        <TablePagination :current-page = "pagination.currentPage" :last-page="pagination.lastPage" @changPage="getAllNotes" />
        <NoteCreateModel v-if="modalAction == 'create'"  @close="toggleModal"  @createNote ="createNote" />
        <NoteUpdateModel v-if="modalAction == 'update' || modalAction == 'view'"  @close="toggleModal" :action="modalAction"  @updateNote ="updateNote" :note="selectedNote"/>
        <NoteDeleteModel v-if="modalAction == 'delete'"  @close="toggleModal"   @deleteNote ="deleteNote" :note="selectedNote"/>
      </section>

    </div>
</template>
<script lang="ts" setup>
import NoteTables from "@/components/NoteTables.vue";
import {computed, onBeforeMount, ref} from "vue";
import NoteCreateModel from "@/components/NoteCreateModel.vue";
import NoteTableTopBar from "@/components/NoteTableTopBar.vue";
import { useStore } from 'vuex';
import {Note} from "@/types/common";
import NoteUpdateModel from "@/components/NoteUpdateModel.vue";
import NoteDeleteModel from "@/components/NoteDeleteModel.vue";
import TablePagination from "@/components/TablePagination.vue";
const store = useStore();
console.log(store);
onBeforeMount(async () => {
  try {
     await store.dispatch('noteStore/getAll', {
      page: 1,
      limit: 10
    });
  } catch (e) {
    console.log(e);
  }
});
const notes = computed(() => store.getters["noteStore/allNotes"]);
const selectedNote = computed(() => store.getters["noteStore/selectedNote"]);
const pagination = computed(() => store.getters["noteStore/pagination"]);
const headers = [
    { text: 'ID', value: 'id' },
    { text: 'Title', value: 'title' },
    { text: 'Description', value: 'description' },
    { text: 'User', value: 'user' },
    { text: 'Actions', value: 'actions', sortable: false },
]
const modalAction = ref('');
const toggleModal = (action:string) => modalAction.value = modalAction.value == action ? '' : action;
const createNote = async (note: Note) => {
  try {
    await store.dispatch('noteStore/create', note);
    toggleModal('');
  } catch (e) {
    console.log(e);
  }
}
const getSelectedNote = (note: Note) => {
  store.commit('noteStore/setNote', note);
}
const updateNote = async (note: Note) => {
  try {
    await store.dispatch('noteStore/edit', note);
    toggleModal('');
  } catch (e) {
    console.log(e);
  }
}

const deleteNote = async (note: Note) => {
  try {
    await store.dispatch('noteStore/delete', note.id);
    toggleModal('');
  } catch (e) {
    console.log(e);
  }
}
const getAllNotes = async (page: number) => {
  try {
    await store.dispatch('noteStore/getAll', {
      page: page,
      limit: 10
    });
  } catch (e) {
    console.log(e);
  }
}




</script>