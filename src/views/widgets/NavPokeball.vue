<template>
    <a href="/">
        <main class="nav-pokeball">
          <div class="top-ball"></div>
          <div class="middle-ball"></div>
          <div class="bottom-ball"></div>
          <div class="ball-button-outline"></div>
          <div class="ball-button"></div>
        </main>
    </a>
  </template>
  
  <script>
  export default {
    // No specific logic for this component
  };
  </script>
  
  <style lang="scss" scoped>
    .nav-pokeball{
        cursor: pointer;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.5);
        position: relative;
        transform: translateY(25px);
        transition: ease-in-out 0.85s;

        &:hover{
            transform: translateY(25px) rotate(360deg);
        }
    }

    .ball-button{
        background: radial-gradient(circle, #c0c0c0 30%, #ffffff 30%);
        position: absolute;
        width: 12px;
        height: 12px;
        top: calc(50% - 6px);
        left: calc(50% - 6px);
        border-radius: 50%;
        // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle box shadow */

        &:hover {
            transform: translateY(-2px);
            // box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); /* Optional: Add a larger box shadow on hover */
        }
    }

    .ball-button-outline{
        background-color: black;
        position: absolute;
        width: 18px;
        height: 18px;
        top: calc(50% - 9px);
        left: calc(50% - 9px);
        border-radius: 50%;
    }

    .top-ball{
        background: radial-gradient(circle at center, #ffffff 0%, #ffffff 0%, #cc0000 70%, #cc0000 100%);
        height: 45%;
        width: 100%;
    }

    .middle-ball{
        background-color: black;
        height: 8px;
        width: 100%;
    }

    .bottom-ball{
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), #ffffff);
        height: 45%;
        width: 100%;
    }
  </style>