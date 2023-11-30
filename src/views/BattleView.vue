<script setup>
  import { onMounted } from 'vue';
</script>

<template>
  <main>
    <!-- <canvas id="battle-screen" ref="battleScreen" width="500" height="500"></canvas> -->
  </main>
</template>

<style scoped>
  #battle-screen {
    display: block;
    background-color: black;
  }
</style>

<script>
  import dawnImage from '@/assets/playerImage/dawn.png';
  import gameBackground from '@/assets/maps/AZIXfinal.png';

  export default {
    data() {
      return {
        blockDimension: 40 // Adjust the player image size here
      };
    },

    mounted() {
      this.initiateCanvas();
      this.initializeMap();
      this.initializePlayer();
      window.addEventListener("resize", this.initiateCanvas);
      requestAnimationFrame(this.gameLoop);
    },

    methods: {
      initiateCanvas() {
        const canvas = this.$refs.battleScreen;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 100;
      },

      initializePlayer() {
        const playerImage = new Image();
        playerImage.src = dawnImage;

        playerImage.onload = () => {
          const canvas = this.$refs.battleScreen;
          const ctx = canvas.getContext('2d');
          const x = (canvas.width - this.blockDimension) / 2; // Calculate x-coordinate for centering
          const y = (canvas.height - this.blockDimension) / 2; // Calculate y-coordinate for centering
          ctx.drawImage(playerImage, x, y, this.blockDimension, this.blockDimension);
        };
      },

      initializeMap(){
        const mapImage = new Image();
        mapImage.src = gameBackground;

        mapImage.onload = () => {
          const canvas = this.$refs.battleScreen;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(mapImage, 0,0, 1000, 1000);
        };
      },

      gameLoop() {
        // Add your game logic here
      }
    }
  }
</script>
