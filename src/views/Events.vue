<script setup>
import EventsCard from '@/components/EventsCard.vue';
import IconeComponent from '@/components/IconeComponent.vue';
import { fetchEvents } from '@/http/marvelApi';
import {ref, onMounted} from 'vue'


const isLoading = ref(false)
const results = ref([])


// Função para formatar data
const formatDate = (dateStr) => {
    if (!dateStr) return ''; // Caso a data seja nula ou indefinida
    const dateObj = new Date(dateStr);
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses começam do 0
    const ano = dateObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

//Função para limitar o texto da descrição
const truncateText = ( text, maxLength) =>{
    if(!text) return'';
    return text.length > maxLength? text.slice(0,maxLength)+'...' : text;
}

//Função para carregar events
const loadEvents = async() =>{
    isLoading.value = true;
    try {
        const data = await fetchEvents()
        // Formata a data de todos os eventos
        results.value = data.map(event => ({
            ...event,
            end: formatDate(event.end), // Formatar a data aqui
            description: truncateText(event.description,300)
        }));
        console.log(data)
    } catch (error) {
        console.error(error)
    }finally{
        isLoading.value = false
    }
}

onMounted(() =>{
    loadEvents()
})
</script>

<template>
    <IconeComponent texto="Events"/>
    <ul class="events">
        <li v-for="event in results" :key="event.id">
            <EventsCard 
            :imgSrc="`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`" 
            :title="event.title" 
            :text="event.description"
            :date="event.end"/>
        </li>
    </ul>
    <div class="loading" v-if="isLoading">
        <P>Loading...</P>
        <img src="../../public/images/loading.gif" alt="">
    </div>
</template>

<style scoped>
    ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 50px;
        column-gap: 32px;
        margin: 32px 80px;
        padding: 0;
    }
    .loading{
    position: fixed;
    left: 50%;
    top: 50%;
}

</style>