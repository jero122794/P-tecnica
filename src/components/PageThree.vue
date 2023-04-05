<template>
    <div class="container">
      <form >
        <label for="direccion">Dirección residencia:</label>
          <input name="direccion" v-model="direccion" type="text" required>
            <span v-if="direccionIsValid">✓</span>
              <span v-else>✗</span>
            

        <label for="codigopostal">Código postal</label>
          <input name="codigopostal" v-model="cPostal" type="text" required>
            <span v-if="cPostalIsValid">✓</span>
              <span v-else>✗</span>
            

        <div @submit.prevent="submitForm">
          <button @click.prevent="prevPage">Previous</button>
          <button @click="showModal = true">Submit</button>
        </div> 

        <div classs="modal" v-if="showModal">
          <div class="modal-content">¡Formulario enviado con éxito!</div>
            <button @click="submitForm">Confirmar</button>
            <button @click="showModal = false">Cancelar</button>
        </div>  
      </form>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        direccion: '',
        codigoPostal: '',
        showConfirmation: false,
        pais: '',
        genero: '',
        primernombre:'',
        segundonombre:'',
        fechanacimiento:'',
        tdocumento:'',
        ndocumento:'',
        archivo:'',
        email:'',
        password:'',
        cpassword:'',
        Phone:'',
        cel:'',
        showModal: false,

      }
      
    },
    methods: {
      prevPage() {
        this.$router.push('/PageTwo')
      },
      submitForm() {
        this.showConfirmation = true;
        this.showModal = false;
      },

    },
    computed: {
      direccionIsValid() {
        return this.direccion.includes('#'); 
      },
      cPostalIsValid() {
        return this.cPostalIsValid; 
      },

    },

  };
</script>
<style>
*{
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  font-style: normal;
  text-align: left;
  margin-top: 60px;
  letter-spacing: 2px;
  word-spacing: 5px;
 
}
 
.form-group{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
 }
</style>