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

 ul {
    list-style: none;
    padding: 32px 0 0 80px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%; /* Garante que a ul não exceda a largura da tela */
    box-sizing: border-box; /* Inclui padding e borda na largura total */
}

li {
    box-sizing: border-box;
    width: 186px; /* Ajuste para o mesmo valor da largura da imagem */
}
.loading{
    position: fixed;
    left: 50%;
    top: 50%;
}

</style>