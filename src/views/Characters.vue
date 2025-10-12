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

// Função para carregar os heróis
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

// Função para buscar detalhes do herói clicado
const loadHeroDetails = async (heroId) => {
    isLoading.value = true;
    try {
        selectedHeroDetails.value = await fetchHeroDetails(heroId);
        console.log(heroId)


        //buscar comics por id
        const heroComics = await fetchHeroComics(heroId)
        selectedHeroDetails.value.comics = heroComics


    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};



const voltarParaLista = () => {
  selectedHeroDetails.value = null;
};


// Carregar os heróis na montagem do componente
onMounted(() => {
    loadHeros();
});

// Carregar mais heróis
const verMais = async () => {
    limit.value += 12;
    isLoading.value = true;
    try {
        const moreHeroes = await fetchHeros(limit.value);
        results.value = [...results.value, ...moreHeroes]; // substitui a lista atual
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
                <p>{{ selectedHeroDetails.description }}</p>
            </div>
            <div class="comicsHero" v-if="selectedHeroDetails.comics && selectedHeroDetails.comics.length">
                <h1>COMICS</h1>
                <ul>
                    <li v-for="comic in selectedHeroDetails.comics" :key="comic.id">
                        <ComicCard 
                        :imgSrc="`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`" 
                        :title="comic.title" 
                        :pages="comic.pageCount"/>
                    
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <ul class="heros" v-else>
        <li @click="loadHeroDetails(hero.id)" v-for="hero in results" :key="hero.id" :data="hero" :img-path="`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`">
            <HeroCard :imgSrc="`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`" :nome="hero.name"/>
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
    .btn-ver-mais{
        background-color: #767676;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }
    .btn-ver-mais:hover{
        background-color: #000000;
    }
    .loading-ver-mais{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ver-mais{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
    }
    .ver-mais img{
        width: 30px;
    }


    h1{
        font-size: 32px;
        font-weight: 700;
        font-family: 'Roboto';
    }
    ul{
        margin: 32px 0px 0px 80px;
        list-style: none;
        padding: 0;
        display: flex;
        gap: 32px;
        max-width: 100%;
        flex-wrap: wrap;
        /* overflow: hidden; */
    }
    .heros li{
        cursor: pointer;
    }
    .icone-characters-details{
        display: flex;
        flex-direction: row;
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 400px;
        font-family: 'roboto';
        color: #767676;
        gap: 8px;
    }
    span{
        margin-top: 32px;
    }
    .iconeComponent{
        cursor: pointer;
    }
    .characters-details img{
        width: 330px;
        height: 324px;
    }
    .characters-details{
        margin: 32px 0 0 80px;
        display: flex;
    }
    .conteudo-characters{
        margin-left: 50px;
        display: flex;
        flex-direction: column;
    }
    .descriptionHero{
        height: 207px;
    }
    .descriptionHero p{
        font-family: 'Roboto';
        font-size: 1rem;
        font-weight: 400;
        width: 900px;
        line-height: 28.8px;
    }
    .comicsHero{
        margin-top: 50px;
    }
    .comicsHero ul{
        margin-left: 0;
    }
    .loading{
        position: absolute;
        left: 50%;
        top: 50%;
    }

</style>