<script setup>
  // const screen = document.getElementById();
  import { onMounted, inject } from 'vue';
  const GlobalPokemonList = inject('GlobalPokemonList');
</script>

<template>
  <main>
    <canvas id="battle-screen" width="500" height="500"></canvas>
  </main>
</template>

<style scoped>
  #battle-screen{
    display: block;
    background-color: black;
  }
</style>

<script>
  import { onMounted } from 'vue';
  
  export default {
    data (){
      return {
        
      };
    },
    methods:{
      initiateCanvas(){
        let canvas = document.getElementById("battle-screen");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight -100;
      },

      drawCircle(){
        let canvas = document.getElementById("battle-screen");
        let ctx = canvas.getContext('2d');

        const circleX = canvas.width / 2;
        const circleY = canvas.height / 2;
        const radius = 50;
        const lineWidth = 2;
        const strokeColor = 'blue';
        const fillColor = 'lightblue';

        // Draw circle
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
      },

      render(){
        this.drawCircle();
      },

      gameLoop(){
        this.render();
      }

    },

    mounted() {
      //Mounted is a hook that happens when the component is loaded in
      this.initiateCanvas();

      window.addEventListener("resize", this.initiateCanvas);
      requestAnimationFrame(this.gameLoop);
    }
  }
</script>
