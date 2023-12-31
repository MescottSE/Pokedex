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
          <div class="instructions">
            <h4>Click any Pokemon to Add to your Team Builder (Max 25)</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class=" col-md-4 col-lg-3 poke-column" v-for="(pokemon,index) in GlobalPokemonList" :key="index">
          <div class="poke-block" v-on:click="addToTeam(index+1, pokemon.name, pokemon.baseHp, pokemon.baseSpd, pokemon.baseAtk, pokemon.baseDef, pokemon.baseSAtk, pokemon.baseSDef)">
            <img v-if="index < 9" :src="`src/assets/pokemonIcons/00${index+1}.png`" />
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

      addToTeam(index, name, hp, speed, attack, defense, sAttack, sDefence) {
        // Retrieve team from local storage

        const retrievedTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || [];

        
        if(retrievedTeam.length < 25){
          
          // const pokemonTeam = [...retrievedTeam];
          const pokemonTeam = [...retrievedTeam];
  
          // Push the selected Pokémon into the team
          pokemonTeam.push({
            id: index, 
            pokename: name, 
            baseHp: hp,
            baseSpd: speed,
            baseAtk: attack,
            baseDef: defense,
            baseSAtk: sAttack,
            baseSDef: sDefence,
            level: 1,
            exp: 0,
          });
  
          // Save the updated team to local storage
          localStorage.setItem('pokemonTeam', JSON.stringify(pokemonTeam));
          alert(name + " added to Box");
        }else{
          alert("Poke Box Full!");
        }
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
