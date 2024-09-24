<script setup>
    const props = defineProps({
        isVisible:{
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['close']);
    const closeModal = () =>{
        emit('close');
    }

    //função para fechar ao clicar fora do modal
const handleOverlayClick = (event) =>{
    if(event.target.classList.contains('modal-overlay')){
        closeModal();
    }
}
</script>
<template>
    <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
        <div  class="modal">
            <div class="firstP">
                <p>Message sent successfully</p>
                <button @click="closeModal">X</button>
            </div>
            <div class="secondP">
                <p>Thank you, we'll reach you as soon as possible</p>
            </div>
            <div class="closeButton">
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>
<style>
    
 p{
    font-family: Roboto;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 16.41px;
    margin: 0;
 }
 .modal{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    z-index: 999;
    background-color: white;
    position: absolute;
    width: 533px;
    height: 196px;
    left: 453px;
    top: 215px;
    border-radius: 8px;
 }
 .firstP, .secondP{
    width: 100%;
    border-bottom: 2px solid #CCCCCC;
    padding: 0 24px;
    display: flex;
    align-items: center;
    font-size: 24px;
 }
 .firstP{
    height: 56px;
    justify-content: space-between;
 }
 .firstP button{
    border: none;
    background: transparent;
    color: #767676;
 }
 .secondP{
    height: 67px;
 }
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.closeButton{
    display: flex;
    justify-content: end;
    width: 100%;
    height: 73px;
    align-items: center;
    padding-right: 24px;
}
.closeButton button{
    background: #EC1D24;
    color: white;
    width: 96px;
    height: 41px;
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Roboto';
    border-radius: 4px;
    border: none;
}
</style>