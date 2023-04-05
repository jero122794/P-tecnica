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
              <span v-else-if="passwordIsValid">✓</span>
                  <span v-else>✗</span>
            
      <label for="phone">Número Télefono</label>
          <input name="phone" type="phone" id="phone" v-model="phone" required>
            

            
      <label for="Cel">Número Celular</label>
          <input name="cel" type="phone" id="phone" v-model="phone" required>
            
      
      <div v-for="(paso, index) in pasos" :key="index" v-show="index === pasoActual">
         <component :is="paso.componente" @validado="onValidado" />
      </div>  
      <div>
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
      confirmPassword: '',
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

    prevPage() {
        this.$router.push('/PageOne')
      },
      nextPage() {
        this.$router.push('/PageThree')
      }, 

      validatePassword() {
      this.passwordsMatch = this.password === this.cpassword;
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
      cpasswordIsValid() {
        return this.cpassword === this.password; 
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