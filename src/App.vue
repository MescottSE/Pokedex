<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavPokeball from './views/widgets/NavPokeball.vue'

</script>

<template>
  <header>
    <div class="nav-bar">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="nav-content">
              <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <NavPokeball to="/"></NavPokeball>
                <RouterLink to="/pokemon">Pokemon</RouterLink>
                <RouterLink to="/pokemon">Battle</RouterLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
