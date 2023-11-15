<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="section poke-menu-component">
    <div class="container">
      <!-- <div class="row">
        <div class="col-lg-12">
          <div class="pokemon-filters">
            <div class="filter">
              <div class="filter-button">Type Filter</div>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row">
        <div class="col-lg-3" v-for="(pokemon,index) in pokemonList" :key="index" @click="deletePoke($event)">
          <div class="poke-block">
            <img v-if="index < 10" :src="`src/assets/pokemonIcons/00${index+1}.png`" />
            <img v-if="index >= 9 && index < 100" :src="`src/assets/pokemonIcons/0${index+1}.png`"/>
            <img v-if="index >= 99" :src="`src/assets/pokemonIcons/${index+1}.png`"/>
            <h3 class="poke-name">{{ pokemon.name}}</h3>
            <div class="pokemon-type-container">
              <p v-for="(type, typeIndex) in pokemon.type" :key="typeIndex" :class="'type ' +[pokemon.type[typeIndex] + '-type']">{{ pokemon.type[typeIndex] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        pokemonList: [
          
        ]
      };
    },
    methods: {
      deletePoke(element){
        // element.currentTarget.innerHTML = "";
      },

      async getPokemonData(url) {
        try {
          const response = await fetch(url);
          return await response.json();
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        }
      },

      async pokemonInfo() {
      try {
        const pokemonAmount = 151;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}&offset=0`;
        const data = await this.getPokemonData(url);
        const pokemonData = data.results;

        for (const pokemon of pokemonData) {
          const pokemonDetails = await this.getPokemonData(pokemon.url);
          this.pokemonList.push({
            name: pokemon.name,
            type: pokemonDetails.types.map(type => type.type.name)
          });
        }
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }
  },
    mounted(){
      this.pokemonInfo();
    }
  }
</script>
