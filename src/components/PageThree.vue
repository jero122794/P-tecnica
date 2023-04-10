<template>
    <div class="container">
      <form >
        <label for="direccion">Dirección residencia:</label>
          <input name="direccion" v-model="direccion" type="text" placeholder="Calle 5 #96-01" required>
            <span v-if="direccionIsValid">✓</span>
              <span v-else>✗</span>
            

        <label for="cPostals">Código postal</label>
          <input name="cPostals" type="tel" id="cPostals" v-model="cPostals"  placeholder="050001" required>
            <span v-if="cPostalsIsValid">✓</span>
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
        showConfirmation: false,
        pais: '',
        genero: '',
        primernombre:'',
        segundonombre:'',
        fechanacimiento:'',
        tdocumento:'',
        numeroDocumento:'',
        archivo:'',
        email:'',
        password:'',
        ConfirmPassword:'',
        Phone:'',
        cel:'',
        cPostals:'',
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
      cPostalsIsValid(){
        if (/^[0-9]{5,}$/.test(this.cPostals)) {
          this.cPostalsIsValid = true;
        } else {
          this.cPostalsIsValid = false;
      }
      }

    },
    computed: {
      direccionIsValid() {
        return this.direccion.includes('#'); 
      },

    },
      cPostalsIsValid(){
        const cPostalsRegex = /^[0-9]{5,}$/;
        return cPostalsRegex.test(this.cPostals);
      },
    
      

      

  };
</script>

<style>
body {
  padding: 1em;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1em;
  color: #b9b9b9;
  background-color: #e3e3e3;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #2a2b38;

  }
</style>