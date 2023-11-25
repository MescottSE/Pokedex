<script setup>
  import { onMounted, inject } from 'vue';
  const GlobalPokemonList = inject('GlobalPokemonList');
</script>
<template>
  <main class="section team-builder-component">
    <div class="team-builder">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>My Pokemon Box</h1>
          </div>
          <div v-for="(poke, index) in myPokes" :key="index" class="poke-column col-md-4 col-lg-3">
            <div class="my-poke">
              <img v-if="poke.id < 10" :src="`src/assets/pokemonIcons/00${poke.id}.png`" />
              <img v-if="poke.id > 9 && poke.id < 100" :src="`src/assets/pokemonIcons/0${poke.id}.png`"/>
              <img v-if="poke.id > 99" :src="`src/assets/pokemonIcons/${poke.id}.png`"/>
              <h1 class="poke-name">{{ poke.pokename }}</h1>
              <div class="poke-options">
                <i v-on:click="deletePoke(index)" class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <h1>{{GlobalPokemonList[145].name}}</h1> -->
    </div>
  </main>
</template>

<style scoped>
  
</style>

<script>

export default {

  data(){
    return {
      myPokes: []
    };
  },

  mounted(){
    this.setMyPokes();
  },

  methods:{
    setMyPokes(){
      const retrievedTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || [];

      this.myPokes = retrievedTeam;
    },

    deletePoke(index) {
      // Remove the element from the array
      this.myPokes.splice(index, 1);

      // Save the updated team to local storage
      localStorage.setItem('pokemonTeam', JSON.stringify(this.myPokes));
    }
  }
}
</script>

<style>

</style>
