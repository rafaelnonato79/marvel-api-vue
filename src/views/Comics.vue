<script setup>
import IconeComponent from '@/components/IconeComponent.vue';
import ComicCard from '@/components/ComicCard.vue';
import {ref, onMounted} from 'vue'
import { fetchComics} from '@/http/marvelApi'

const isLoading =ref(false)
const results = ref([])

const loadComics = async() =>{
    isLoading.value = true;
    try {
        const data = await fetchComics()
        console.log('Dados recebidos: ', data)
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
    <div class="loading" v-if="isLoading">
        <P>Loading...</P>
        <img src="../../public/images/loading.gif" alt="">
    </div>
</template>
<style scoped>

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