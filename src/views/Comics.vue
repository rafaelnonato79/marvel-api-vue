<script setup>
import IconeComponent from '@/components/IconeComponent.vue';
import ComicCard from '@/components/ComicCard.vue';
import {ref, onMounted} from 'vue'
import { fetchComics} from '@/http/marvelApi'

const isLoading =ref(false)
const results = ref([])
let limit = ref(12)

const loadComics = async() =>{
    isLoading.value = true;
    try {
        const data = await fetchComics()

        results.value = data;
    } catch (error) {
        console.error(error)
    }finally{
        isLoading.value = false
    }
  
}
onMounted(()=>{
        loadComics();
    })

    // Carregar mais heróis
const verMais = async () => {
    limit.value += 12;
    isLoading.value = true;
    try {
        const moreHeroes = await fetchComics(limit.value);
        results.value = [...results.value, ...moreHeroes]; // substitui a lista atual
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
        <IconeComponent texto="Comics"/>
        <ul class="comics">
            <li v-for="comic in results" :key="comic.id">
                <ComicCard 
                :imgSrc="`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`"
                imgWidth="186px"
                imgHeigth="283px"
                :title="comic.title"
                :pages="comic.pageCount"/>
                <!-- <p>{{ comic.title }}</p>
                <img :src="`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`" alt="Thumbnail" /> -->
            </li>
        </ul>
        
    <div class="loading" v-if="isLoading && results.length === 0">
        <P>Loading...</P>
        <img src="../../public/images/loading.gif" alt="">
    </div>   


    
    <div class="ver-mais" v-if="results.length > 0">
        <div class="loading-ver-mais" v-if="isLoading">
            <P>Loading...</P>
            <img src="../../public/images/loading.gif" alt="">
        </div> 
        <div>
            <button class="btn-ver-mais" @click="verMais">Ver mais</button>
        </div>
    </div>
</template>



<style scoped>
/* ======== Estrutura principal ======== */
ul.comics {
  list-style: none;
  padding: 32px 16px 0; /* removido padding-left fixo */
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

li {
  width: 186px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

/* ======== Botão "Ver mais" ======== */
.ver-mais {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
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
  background-color: #000000;
}

.loading-ver-mais {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ver-mais img {
  width: 30px;
}

/* ======== Loading ======== */
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.loading img {
  width: 32px;
}

/* ======== Responsividade ======== */
@media (max-width: 1024px) {
  ul.comics {
    gap: 20px;
    padding: 24px;
  }

  li {
    width: 160px;
  }
}

@media (max-width: 768px) {
  ul.comics {
    gap: 16px;
    padding: 16px;
  }

  li {
    width: 45%; /* dois por linha */
    max-width: 180px;
  }

  .btn-ver-mais {
    padding: 8px 14px;
  }
}

@media (max-width: 480px) {
  ul.comics {
    gap: 12px;
    padding: 8px;
  }

  li {
    width: 100%;
    max-width: 240px; /* centraliza o card */
  }

  .btn-ver-mais {
    width: 100%;
    max-width: 260px;
  }
}
</style>
