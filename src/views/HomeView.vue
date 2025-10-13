<script setup>
import IconeComponent from '@/components/IconeComponent.vue'
</script>

<template>
  <IconeComponent texto="Home" />
  <div class="card-home">
    <img src="/images/logo-home.png" alt="logo-marvel-home">
    <h1>Welcome to Marvel's directory</h1>
  </div>
</template>

<style scoped>
.card-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  min-height: calc(100vh - 88px);
  background-color: #f9fafb;
  padding: 2rem;
  box-sizing: border-box;
}

.card-home img {
  width: 20rem;
  height: auto;
  max-width: 90%;
}

.card-home h1 {
  font-size: 2rem;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 1.4;
  margin-top: 1.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .card-home h1 {
    font-size: 1.5rem;
    line-height: 1.3;
  }
}

@media (max-width: 480px) {
  .card-home img {
    width: 14rem;
  }

  .card-home h1 {
    font-size: 1.25rem;
  }
}
</style>
