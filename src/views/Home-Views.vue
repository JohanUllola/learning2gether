<template>
    <div>
        <SearchBar/>
       
        <GameGrid/>
        <h1>Home</h1>
        <p>{{ userStore.userdata }}</p>
    </div>
</template>
  <script setup>
  import GameGrid from '../components/GameGrid.vue';
  import SearchBar from '../components/SearchBar.vue';
  //import{useUserStore} from'../stores/user.js';

  //const userStore= useUserStore();


</script>