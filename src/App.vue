<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="cabecalho d-flex align-items-center justify-content-between">
      <img src="../public/images/Logo.png" alt="" class="logo">
      <nav class="d-flex">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/characters">Characters</RouterLink>
        <RouterLink to="/comics">Comics</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  .cabecalho{
    height: 88px;
  }
  header{
    width: 100vw;
    background:#EC1D24;
    padding: 0 5rem;
    position: fixed;
    top: 0;
    left: 0;
    height: 88px;
    z-index: 999;
  }
  nav{
    gap: 2rem;
  }
  a{
    text-decoration: none;
    color: #FFFFFF;
    font-size:1.25rem ;
    font-family: 'roboto';
    font-weight: 500;
  }
  a:hover{
    text-decoration: underline;
  }
  .router-link-active{
    text-decoration: underline;
  }
</style>
