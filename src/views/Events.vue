<script setup>
import EventsCard from '@/components/EventsCard.vue';
import IconeComponent from '@/components/IconeComponent.vue';
import { fetchEvents } from '@/http/marvelApi';
import { ref, onMounted } from 'vue';

const isLoading = ref(false);
const results = ref([]);

// Função para formatar data
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const ano = dateObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

// Função para limitar o texto da descrição
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Função para carregar events
const loadEvents = async () => {
  isLoading.value = true;
  try {
    const data = await fetchEvents();
    results.value = data.map((event) => ({
      ...event,
      end: formatDate(event.end),
      description: truncateText(event.description, 300),
    }));
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadEvents();
});
</script>

<template>
  <section class="events-section">
    <IconeComponent texto="Events" />

    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
      <img src="/images/loading.gif" alt="Carregando" />
    </div>

    <ul v-else class="events-grid">
      <li v-for="event in results" :key="event.id">
        <EventsCard
          :imgSrc="`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`"
          :title="event.title"
          :text="event.description"
          :date="event.end"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.events-section {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: hidden; /* 👈 evita rolagem horizontal */
}

/* GRID RESPONSIVO */
.events-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px; /* limita a largura no desktop */
  padding: 0;
  margin: 2rem auto 0 auto;
  box-sizing: border-box;
}

/* Itens da grid */
.events-grid li {
  display: flex;
  justify-content: center;
}

/* Loading centralizado */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
}

.loading img {
  width: 60px;
  margin-top: 1rem;
  opacity: 0.8;
}

/* Garante que nada estoure a tela em mobile */
* {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
