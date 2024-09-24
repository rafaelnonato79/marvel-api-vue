<script setup>
import IconeComponent from '@/components/IconeComponent.vue';
import Modal from '@/components/Modal.vue'
import { useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';


// Definir esquema de validação usando Yup
const schema = yup.object({
    name: yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: yup.string().required('Digite um e-mail válido').required('O email é obrigatório'),
    tel: yup.string().required('O telefone é obrigatório').matches(/^\(\d{2}\)\s\d{1}\s\d{4}-\d{4}$/, 'Invalid phone'),
    message: yup.string().required('A mensagem é obrigatória').min(10,'A menságem deve ter no minimo 10 caracteres.')
})

// Inicializar o formulário e os campos
const {handleSubmit, errors, resetForm} = useForm({
    validationSchema: schema,
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: tel } = useField('tel');
const { value: message } = useField('message')

const modalIsVisible = ref(false);

// Função para enviar o formulário
const onSubmit = handleSubmit(values => {
  console.log('Form values:', values);
  console.log("Form enviado");
  modalIsVisible.value = true;
  console.log(modalIsVisible)
});


//fechar o modal

const closeModal = () =>{
    modalIsVisible.value = false;
    resetForm()
}



</script>

<template>
    <IconeComponent texto="Contact"/>

    <form 
    class="col-5" style="margin:32px 80px;"
    id="app"
    @submit="onSubmit">
    
        <div class="mb-3" >
            <label for="name" class="form-label">Name</label>
            <input v-model="name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Ex: Your full name">
            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ex: myname@email.com">
            <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        </div>
        <div class="mb-3">
            <label for="tel" class="form-label">Phone</label>
            <input 
            id="tel"
            v-model="tel"
            type="tel" class="form-control" aria-describedby="phoneHelp" placeholder="Ex:(99) 9 9999-9999">
            <span v-if="errors.tel" class="text-danger">{{ errors.tel }}</span>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea v-model="message" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Ex: Contact message for Marvel"></textarea>
            <span v-if="errors.message" class="text-danger">{{ errors.messege }}</span>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 96px; height: 41px;">Send</button>
    </form>
    <Modal :isVisible="modalIsVisible" @close="closeModal" />
</template>
<style scoped>
    label{
        font-family: 'Roboto';
        font-size:0.875rem;
        font-weight: 700;
        color: #000000;
    }
    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* Fundo cinza claro */
    z-index: 1000; /* Garantir que fique acima do conteúdo da página */
}
</style>