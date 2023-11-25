import 'bootstrap/dist/css/bootstrap.css'
import '../public/styles/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

// Fetch Pokémon data and provide it globally
async function fetchPokemonData() {
  try {
    const pokemonAmount = 151;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}&offset=0`;
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = [];

    for (const pokemon of data.results) {
      const pokemonDetails = await fetch(pokemon.url);
      const details = await pokemonDetails.json();
      const baseHP = details.stats.find(stat => stat.stat.name === 'hp').base_stat;

      pokemonList.push({
        name: pokemon.name,
        types: details.types.map(type => type.type.name),
        baseHp: baseHP
      });
    }

    app.provide('GlobalPokemonList', pokemonList); // Provide the Pokémon list globally
    app.mount('#app');
} catch (error) {
    console.error('Error fetching Pokémon data:', error);
}
}

fetchPokemonData(); // Call the function to fetch and provide Pokémon data
