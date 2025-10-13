<script setup>
import IconeComponent from '@/components/IconeComponent.vue';
import HeroCard from '@/components/HeroCard.vue';
import { ref, onMounted } from 'vue';
import { fetchHeros, fetchHeroDetails, fetchHeroComics } from '@/http/marvelApi';
import ComicCard from '@/components/ComicCard.vue';

const isLoading = ref(false);
const results = ref([]);
const selectedHeroDetails = ref(null);
let limit = ref(12);

// Carregar heróis
const loadHeros = async () => {
  if (results.value.length > 0) return;
  isLoading.value = true;
  try {
    results.value = await fetchHeros();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Detalhes do herói
const loadHeroDetails = async (heroId) => {
  isLoading.value = true;
  try {
    selectedHeroDetails.value = await fetchHeroDetails(heroId);
    const heroComics = await fetchHeroComics(heroId);
    selectedHeroDetails.value.comics = heroComics;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const voltarParaLista = () => {
  selectedHeroDetails.value = null;
};

// Carregar na montagem
onMounted(() => {
  loadHeros();
});

// Ver mais
const verMais = async () => {
  limit.value += 12;
  isLoading.value = true;
  try {
    const moreHeroes = await fetchHeros(limit.value);
    results.value = [...results.value, ...moreHeroes];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="icone-characters-details">
    <IconeComponent texto="Characters" @Click="voltarParaLista" class="iconeComponent" />
    <span v-if="selectedHeroDetails"> / {{ selectedHeroDetails.name }} </span>
  </div>

  <div class="characters-details" v-if="selectedHeroDetails">
    <img :src="`${selectedHeroDetails.thumbnail.path}/standard_fantastic.${selectedHeroDetails.thumbnail.extension}`" alt="">
    <div class="conteudo-characters">
      <div class="descriptionHero">
        <h1>{{ selectedHeroDetails.name }}</h1>
        <p>{{ selectedHeroDetails.description || 'No description available.' }}</p>
      </div>
      <div class="comicsHero" v-if="selectedHeroDetails.comics && selectedHeroDetails.comics.length">
        <h1>COMICS</h1>
        <ul>
          <li v-for="comic in selectedHeroDetails.comics" :key="comic.id">
            <ComicCard 
              :imgSrc="`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`" 
              :title="comic.title" 
              :pages="comic.pageCount"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>

  <ul class="heros" v-else>
    <li @click="loadHeroDetails(hero.id)" v-for="hero in results" :key="hero.id">
      <HeroCard :imgSrc="`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`" :nome="hero.name"/>
    </li>
  </ul>

  <div class="loading" v-if="isLoading && results.length === 0">
    <p>Loading...</p>
    <img src="../../public/images/loading.gif" alt="">
  </div>

  <div class="ver-mais" v-if="results.length > 0">
    <div class="loading-ver-mais" v-if="isLoading">
      <p>Loading...</p>
      <img src="../../public/images/loading.gif" alt="">
    </div> 
    <div>
      <button class="btn-ver-mais" @click="verMais">Ver mais</button>
    </div>
  </div>
</template>

<style scoped>
/* ======== Estrutura Geral ======== */
.icone-characters-details {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #767676;
  font-family: 'Roboto', sans-serif;
  padding: 0 16px; /* substitui margin-left */
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.iconeComponent {
  cursor: pointer;
}

span {
  margin-top: 32px;
}

/* ======== Lista de Heróis ======== */
ul.heros {
  margin: 32px auto;
  list-style: none;
  padding: 0 16px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.heros li {
  cursor: pointer;
  flex: 1 1 200px;
  max-width: 200px;
}

/* ======== Detalhes do Herói ======== */
.characters-details {
  margin: 32px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 0 16px;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.characters-details img {
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  max-width: 100%;
}

.conteudo-characters {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  box-sizing: border-box;
}

.descriptionHero h1 {
  font-size: 28px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}

.descriptionHero p {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: #444;
  margin-top: 8px;
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
}

/* ======== Comics ======== */
.comicsHero {
  margin-top: 32px;
  width: 100%;
}

.comicsHero ul {
  margin: 16px 0;
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

/* ======== Botão "Ver Mais" ======== */
.ver-mais {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}

.btn-ver-mais {
  background-color: #767676;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-ver-mais:hover {
  background-color: #000;
}

/* ======== Loading ======== */
.loading,
.loading-ver-mais {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-ver-mais img,
.loading img {
  width: 32px;
}

/* ======== Responsividade ======== */
@media (max-width: 1024px) {
  .descriptionHero p {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .icone-characters-details {
    padding: 0 12px;
    font-size: 0.9rem;
  }

  .characters-details {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 16px;
  }

  .characters-details img {
    width: 80%;
    max-width: 280px;
  }

  .conteudo-characters {
    margin-left: 0;
    width: 100%;
  }

  .descriptionHero h1 {
    font-size: 24px;
  }

  .descriptionHero p {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .heros {
    gap: 16px;
  }

  .heros li {
    max-width: 160px;
  }
}

@media (max-width: 480px) {
  .icone-characters-details {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 8px;
  }

  .heros {
    gap: 12px;
  }

  .heros li {
    max-width: 140px;
  }

  .btn-ver-mais {
    width: 100%;
    max-width: 280px;
  }

  .characters-details img {
    width: 100%;
    max-width: 240px;
  }

  .descriptionHero p {
    font-size: 0.9rem;
  }
}
</style>
