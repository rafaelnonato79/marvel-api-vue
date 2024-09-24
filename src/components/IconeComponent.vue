<script lang="js">
export default{
 props:{
    texto: {type: String}
}
}
</script>

<template>
    <div class="icone">
        <ion-icon class="icone-img" name="home-outline">home</ion-icon>
        <span>{{texto}}</span>
    </div>
</template>

