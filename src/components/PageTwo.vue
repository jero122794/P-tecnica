<template>
<div class="container">
  <form >
    
      <label for="email">Correo Electrónico:</label>
        <input type="email" name="email" id='Email' v-model="email" :class="{'is-invalid': emailError}" required>
          <div v-if="emailError" class="error-message">Por favor, ingresa un correo válido</div>
            <span v-if="emailIsValid">✓</span>
              <span v-else>✗</span>
                    
      <label for="password">Contraseña:</label>
          <input name="password" type="password" id="password" v-model="password" required>
            <span v-if="passwordIsValid">✓</span>
              <span v-else>✗</span>
            
      <label for="cpassword">Confirmar Contraseña</label>  
          <input name="cpassword" type="password" id="confirm-password" v-model="ConfirmPassword" v-on:input="validatePassword" required>
            <span v-if="!passwordsMatch">✗ Las contraseñas no coinciden</span>
              <span v-else-if="ConfirmPasswordIsValid">✓</span>
                  <span v-else>✗</span>
            
      <label for="phone">Número Télefono</label>
          <input name="phone" type="phone" id="phone" v-model="numeroTelefono" required>
            <span v-if="numeroTelefonoIsValid">✓</span>
              <span v-else>✗</span> 

            
      <label for="Cel">Número Celular</label>
          <input name="cel" type="phone" id="phone" v-model="numeroCelular" required>
            <span v-if="numeroCelularIsValid">✓</span>
              <span v-else>✗</span> 
      
      <div v-for="(paso, index) in pasos" :key="index" v-show="index === pasoActual">
         <component :is="paso.componente" @validado="onValidado" />
      </div>  
      <div class="button">
        <button @click="avanzar" >Avanzar</button>
        <button @click.prevent="prevPage">Anterior</button>
        <button @click.prevent="nextPage">Siguiente</button>
      </div> 
        
  </form>
</div>
</template>
<script>

export default {
  data() {
    return {
      email: '',
      emailError: false,
      password: '',
      ConfirmPassword:'',
      numeroTelefono: '',
      numeroCelular: '',
    };   
  },

  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.email)) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
    },
    numeroTelefonoIsvalid(){
        if (/^[0-9]{5,}$/.test(this.numeroTelefono)) {
          this.numeroTelefonoIsValid = true;
        } else {
          this.numeroTelefonoIsValid = false;
      }
    },

    numeroCelularIsvalid(){
        if (/^[0-9]{5,}$/.test(this.numeroCelular)) {
          this.numeroCelularIsValid = true;
        } else {
          this.numeroCelularIsValid = false;
      }
    },

    prevPage() {
        this.$router.push('/PageOne')
      },
      nextPage() {
        this.$router.push('/PageThree')
      }, 

      validatePassword() {
      this.passwordsMatch = this.password === this.ConfirmPassword;
      },
    },
      avanzar() {
       if (this.pasoActualValido && this.pasoActual < this.pasos.length - 1) {
         this.pasoActual++
         this.pasoActualValido = false
       }
     },
      onValidado(valido) {
       this.pasoActualValido = valido
     },
    

      
    computed: {
      passwordsMatch() {
        return this.password === this.confirmPassword;
       },
      emailIsValid() {
        return this.email.includes('@') && this.email.includes('.')
      },
      passwordIsValid() {
        return this.password.includes('*') && this.password.length > 8; 
      },
      ConfirmPasswordIsValid() {
        return this.ConfirmPassword === this.password; 
      },
      numeroTelefonoIsValid() {
        const numeroTelefonoRegex = /^[0-9]{5,}$/;
        return numeroTelefonoRegex.test(this.numeroTelefono);
      },
      numeroCelularIsValid() {
        const numeroCelularRegex = /^[0-9]{5,}$/;
        return numeroCelularRegex.test(this.numeroCelular);
      },
    },

  
    watch: {
       email: function() {
        this.validateEmail();
      }
    }
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

