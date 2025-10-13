<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<template>
  <header>
    <div class="cabecalho">
      <img src="../public/images/Logo.png" alt="Logo Marvel" class="logo" />

      <!-- Botão hambúrguer (apenas mobile) -->
      <button class="menu-btn" @click="toggleMenu">
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menu desktop -->
      <nav class="desktop-menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/characters">Characters</RouterLink>
        <RouterLink to="/comics">Comics</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>

      <!-- Menu mobile -->
      <transition name="slide">
        <nav v-if="isMenuOpen" class="mobile-menu">
          <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
          <RouterLink to="/characters" @click="toggleMenu">Characters</RouterLink>
          <RouterLink to="/comics" @click="toggleMenu">Comics</RouterLink>
          <RouterLink to="/events" @click="toggleMenu">Events</RouterLink>
          <RouterLink to="/contact" @click="toggleMenu">Contact</RouterLink>
        </nav>
      </transition>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* ======== Cabeçalho ======== */
header {
  width: 100vw;
  background: #EC1D24;
  padding: 0 5rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 88px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cabecalho {
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 140px;
}

/* ======== Links ======== */
nav {
  display: flex;
  gap: 2rem;
}

a {
  text-decoration: none;
  color: #FFFFFF;
  font-size: 1.25rem;
  font-family: 'Roboto';
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}

.router-link-active {
  text-decoration: underline;
}

/* ======== Menu hambúrguer ======== */
.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

.icon {
  width: 32px;
  height: 32px;
  color: #fff;
}

/* ======== Menu mobile ======== */
.mobile-menu {
  position: absolute;
  top: 88px;
  right: 0;
  background-color: #EC1D24;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 1rem;
  width: 100%;
  text-align: left;
}

.mobile-menu a {
  font-size: 1.2rem;
  color: #fff;
}

/* ======== Animação ======== */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ======== Responsividade ======== */
@media (max-width: 768px) {
  header {
    padding: 0 1.5rem;
  }

  .menu-btn {
    display: block;
  }

  .desktop-menu {
    display: none;
  }

  .logo {
    width: 120px;
  }
}
</style>
