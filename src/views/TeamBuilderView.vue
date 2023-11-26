
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
              <ul class="poke-stats">
                <li class="base-hp-row">
                  <div class="stat-label">HP</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseHp), background: getBarColor(poke.baseHp)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseHp}}</div>
                </li>
                <li class="base-speed-row">
                  <div class="stat-label">Spd</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseSpd), background: getBarColor(poke.baseSpd)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseSpd}}</div>
                </li>
                <li class="base-attack-row">
                  <div class="stat-label">Atk</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseAtk), background: getBarColor(poke.baseAtk)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseAtk}}</div>
                </li>
                <li class="base-defense-row">
                  <div class="stat-label">Def</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseDef), background: getBarColor(poke.baseDef)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseDef}}</div>
                </li>
                <li class="base-sAttack-row">
                  <div class="stat-label">sAtk</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseSAtk), background: getBarColor(poke.baseSAtk)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseSAtk}}</div>
                </li>
                <li class="base-sDefense-row">
                  <div class="stat-label">sDef</div>
                  <div class="stat-bar">
                    <div class="bar" :style="{ width: getBarWidth(poke.baseSDef), background: getBarColor(poke.baseSDef)}"></div>
                  </div>
                  <div class="stat-value">{{poke.baseSDef}}</div>
                </li>
              </ul>
              <div class="poke-options">
                <i v-on:click="deletePoke(index)" class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <h1 v-for="(poke, index) in GlobalPokemonList" :key="index">{{ poke.baseHp }}</h1> -->
    </div>
  </main>
</template>

<script setup>
  import { onMounted, inject } from 'vue';
  const GlobalPokemonList = inject('GlobalPokemonList');

  const getBarWidth = (barValue) => {
    return `${(barValue / 255) * 100}%`;
  };

  const getBarColor = (barValue) => {
    // Define your logic to set the color based on baseHp
    if (barValue > 200) {
      return 'green'; // For example, set to green if HP > 200
    } else if (barValue > 125) {
      return 'yellowgreen'; // Set to yellow if HP > 100
    } else if (barValue > 100) {
      return 'yellow'
    }else if (barValue > 50) {
      return 'orange'
    } else {
      return 'red'; // Set to red otherwise
    }
  };

</script>

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
      this.setBars();

    },

    setBars(){

      let bars = document.querySelectorAll(".stat-bar");

      bars.forEach(function(bar, index){

        let barEle = bar.querySelector(".bar");
        let barNumber = parseInt(bar.parentElement.querySelector(".stat-value").innerText);
        barEle.style.width = ((barNumber / 255) * 100) + "%";

      });
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
