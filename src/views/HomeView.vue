<script setup>
import IconeComponent from '@/components/IconeComponent.vue';


</script>

<template>
  <IconeComponent texto="Home"/>
    <div class="card-home">
        <img src="../../public/images/logo-home.png" alt="logo-marvel-home">
        <h1>Welcome to Marvel's directory</h1>
    </div>
</template>

<style scoped>
  img{
      width:20.313rem;
      height: 8.188rem;
  }
  .card-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box; /* Inclui padding e bordas no cálculo da largura */
  }
  .card-home h1{
      font-size: 2rem;
      color: #000000;
      font-family: 'Roboto';
      font-weight: 700;
      line-height: 37.5px;
      margin-top: 24px;
      
  }


</style>
