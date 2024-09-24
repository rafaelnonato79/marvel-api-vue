<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    imgSrc:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    pages:{
        type: String,
        required: true
    },
    imgWidth:{
        type: String,
        default:'200px'
    },
    imgHeigth:{
        type: String,
        default:'318px'
    }
})


</script>
<template>
    <div class="comicCard">
        <img :src="props.imgSrc" alt="" :style="{width: props.imgWidth, height:props.imgHeigth}">
        <h3>{{ title }}</h3>
        <p>PAGES: {{ pages }}</p>
    </div>
    
</template>

<style scoped>
    .comicCard{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    img{
        display: block;
    }
    h3{
        font-size: 1rem;
        font-weight: 700;
        font-family: 'Roboto';
        width: 200px;
        margin: 0;
        margin-top: 16px;
    }
    p{
        color:#000000;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 0.875rem;
        margin-top: 4px;
    }
</style>