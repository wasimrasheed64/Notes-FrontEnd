<template>
  <div>
    <NavBar></NavBar>
    <NoteCrud></NoteCrud>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NoteCrud from '@/components/NoteCrud.vue';
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    NoteCrud,
  }
});
</script>
