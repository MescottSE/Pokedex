
<script setup>

</script>

<template>
  <main class="poke-home-component">
    <canvas id="poke-map" ref="pokeMap" class="poke-map"></canvas>
  </main>
</template>

  
  <script>
  
    export default {
      
      data(){
        return{
          
        }
      },

      methods:{

        canvasSetup(){
          const canvas = this.$refs.pokeMap;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight / 2;
        }
      },

      mounted(){
        this.canvasSetup();
      }
    }
  </script>
  
