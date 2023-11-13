<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="section poke-menu-component">
    <div class="container">
      <div class="row">
        <div class="col-lg-3" v-for="index in 151" :key="index" @click="deletePoke($event)">
          <div class="poke-block">
            <img v-if="index < 10" :src="`src/assets/pokemonIcons/00${index}.png`" />
            <img v-if="index >= 10 && index < 100" :src="`src/assets/pokemonIcons/0${index}.png`"/>
            <img v-if="index >= 100" :src="`src/assets/pokemonIcons/${index}.png`"/>
            <h3 class="poke-name"></h3>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    methods: {
      deletePoke(element){
        // element.currentTarget.innerHTML = "";
      },

      pokemonInfo(){
        let pokeElements = "";
        let url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
        let pokemonCards = document.querySelectorAll(".poke-name");

        fetch(url)
        .then(resp => resp.json())
        .then(data => {
          let pokemon = data.results;

          pokemon.forEach(function(poke, index){
            pokemonCards[index].innerText = poke.name;
          });
        });
      }
    },
    mounted(){
      this.pokemonInfo();
    }
  }
</script>
