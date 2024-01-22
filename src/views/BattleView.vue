<script setup>
  import { onMounted } from 'vue';
</script>

<template>
  <main>
    <canvas id="battle-screen" ref="battleScreen" width="500" height="500"></canvas>
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

  class World{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }

    setX(x){
      this.x = this.x + x;
    }

    setY(y){
      this.y = this.y + y;
    }

    getX(){
      return this.x;
    }

    getY(){
      return this.y;
    }
  }

  export default {
    data() {
      return {
        blockDimension: 40, // Adjust the player image size here
        world: new World(410,0)
      };
    },

    mounted() {
      this.initiateCanvas();
      this.initializeMap();
      this.initializePlayer();
      window.addEventListener("resize", this.initiateCanvas);
      window.addEventListener("keydown", this.arrowsDown);
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

          ctx.drawImage(mapImage, this.world.getX(), this.world.getY(), 1000, 1000);
        };
      },

      arrowsDown(event){
        event.preventDefault();

        let x = this.world.getX();
        let y = this.world.getY();

        let moveAmount = 20;

        switch(event.key){
          case 'ArrowUp':
            console.log("Move Up");
            this.world.setY(moveAmount);
            break;
          case 'ArrowDown':
            console.log("Move Down");
            this.world.setY(-moveAmount);
            break;
          case 'ArrowLeft':
            console.log("Move Left");
            this.world.setX(moveAmount);
            break;
          case 'ArrowRight':
            console.log("Move Right");
            this.world.setX(-moveAmount);
            break;
        }

        this.move();
      },

      move(){
        const mapImage = new Image();
            mapImage.src = gameBackground;

            mapImage.onload = ()=>{

              const canvas = this.$refs.battleScreen;
              const ctx = canvas.getContext('2d');
  
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(mapImage, this.world.getX(), this.world.getY(), 1000, 1000);
              this.initializePlayer();
            }
      },

      gameLoop() {
        
        this.move();
      }
    }
  }
</script>
