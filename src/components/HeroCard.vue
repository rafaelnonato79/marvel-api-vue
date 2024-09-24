<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    imgSrc:{
        type: String,
        required: true
    },
    nome:{
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="heroCard">
        <img :src="props.imgSrc" alt="">
        <p>{{ props.nome }}</p>
    </div>
</template>

<style scoped>
    img{
        width: 186.67px;
        height: 183px;
        border-radius: 4px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    p{
        font-family: 'roboto';
        font-weight: 700;
        font-size: 1rem;
        line-height: 18.75px;
        margin-top: 16px;
        text-decoration: underline;
    }
</style>