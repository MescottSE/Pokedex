<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { onMounted, inject } from 'vue';
const GlobalPokemonList = inject('GlobalPokemonList');
</script>

<template>
  <main class="section poke-menu-component">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="pokemon-filters">
            <div id="type-filter" class="filter">
              <div v-on:click="toggler" id="type-button" class="filter-button">
                <li class="all-type" @click="typeFilter($event)">All Types</li>
                <i class="fas fa-chevron-down"></i>
              </div>
              <ul id="type-filter-menu">
                <li class="all-type" @click="typeFilter($event)">All Types</li>
                <li v-for="(type,index) in pokemonTypes" :key="index" :class="[type.toLowerCase()] + '-type'" @click="typeFilter($event)">{{ type }}</li>
              </ul>
            </div>
            <input v-model="pokeSearch" type="text" placeholder="Pokemon name.."/>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-lg-3 poke-column" v-for="(pokemon,index) in pokemonList" :key="index">
          <div class="poke-block">
            <img v-if="index < 10" :src="`src/assets/pokemonIcons/00${index+1}.png`" />
            <img v-if="index >= 9 && index < 100" :src="`src/assets/pokemonIcons/0${index+1}.png`"/>
            <img v-if="index >= 99" :src="`src/assets/pokemonIcons/${index+1}.png`"/>
            <h3 class="poke-name">{{ pokemon.name}}</h3>
            <div class="pokemon-type-container">
              <p v-for="(type, typeIndex) in pokemon.type" :key="typeIndex" :class="'type ' +[pokemon.type[typeIndex] + '-type']">{{ pokemon.type[typeIndex] }}</p>
            </div>
          </div>
        </div> -->
        <div class="col-lg-3 poke-column" v-for="(pokemon,index) in pokemonList" :key="index">
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
        pokemonList: [],
        pokemonTypes: ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic",
                       "Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"],
        pokeSearch: '',
        pokeType: '',
      };
    },
    methods: {
      deletePoke(element){
        // element.currentTarget.innerHTML = "";
      },

      searchName(){
        console.log(this.pokeSearch);
        console.log(this.pokeType);

        let pokemonColumns = document.querySelectorAll('.poke-column');

        pokemonColumns.forEach(element => {
            let pokeType = element.querySelector("." + this.pokeType + "-type");
            let pokeName = element.querySelector(".poke-name").innerText;
            
            if((pokeType || this.pokeType.toLowerCase() == "" || this.pokeType == "all types") && pokeName.toLowerCase().includes(this.pokeSearch.toLowerCase())){
              element.style.display = "block";
            }else{
              element.style.display = "none";
            }
        });
      },

      typeFilter(event){
        let selected = event.currentTarget;
        let filterButton = document.getElementById('type-button');
        let filterDropdown = document.getElementById('type-filter-menu');

        filterButton.innerHTML = '<li class="' + selected.innerHTML.toLowerCase() +'-type">' + selected.innerHTML + '</li>' + '<i class="fas fa-chevron-down"></i>';
        
        filterDropdown.classList.toggle("toggler");

        this.pokeType = selected.innerText.toLowerCase();
        this.hideShowPokemon(selected.innerText.toLowerCase());
      },

      hideShowPokemon(typePoke){
        let pokemonColumns = document.querySelectorAll('.poke-column');
        
        if(typePoke === "all types"){
          pokemonColumns.forEach(element => {
            
            element.style.display = "block";
          });
        }else{
          pokemonColumns.forEach(element => {
            let pokeType = element.querySelector("." + typePoke + "-type");
            
            if(pokeType){
              element.style.display = "block";
            }else{
              element.style.display = "none";
            }
            
          });
        }
      },

      toggler(event){
        let element = event.currentTarget;
        let targetSibling = element.nextElementSibling;
        let arrowElement = element.querySelector('i');
        let delay = 500;
        
        arrowElement.classList.toggle("fa-chevron-down");
        arrowElement.classList.toggle("fa-chevron-up");

        targetSibling.classList.toggle("toggler")
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
    watch: {
      pokeSearch(input){
        this.searchName();
      }
    },
    mounted(){
      this.pokemonInfo();
    }
  }
</script>
