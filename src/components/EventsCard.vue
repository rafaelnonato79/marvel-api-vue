<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    imgSrc:{
        type: String,
    },
    title:{
        type: String,
    },
    text:{
        type: String,
    },
    date:{
        type: String,
    }

})



</script>
<template>
    <div class="eventCard">
        <img :src="props.imgSrc" alt="event">
        <div class="conteudo">
            <h2>{{ title }}</h2>
            <p>{{ text }}</p>
            <p class="date">
                DATE OF THE EVENT: 
                <span> {{ date }} </span></p>
        </div>
    </div>
</template>
<style scoped>
    img{
        width: 223px;
        height: 223px;
    }
    .eventCard{
        display: flex;
        flex-direction: row;
        width: 624px;
        gap:24px ;
    }
    h2{
        font-family: 'Roboto';
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 33.6px;
        color: #000000;
    }
    p{
       font-family: 'Roboto';
       font-size: 1rem;
       font-weight: 400;
       line-height: 22.4px;
       color: #000000; 
    }
    .date{
        font-family: 'Roboto';
        font-size: 1rem;
        font-weight: 600;
        line-height: 22.4px;
    }
    span{
        font-family: 'Roboto';
        font-size: 1rem;
        line-height: 22.4px;
        color: red;
    }
</style>