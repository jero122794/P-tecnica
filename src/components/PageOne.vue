<template>
  <div class="container">
  <form>   
    <h2>Proyecto form Vue.js</h2>
         <label for="pais">País</label>
            <select name="pais" id="pais" v-model="paisSeleccionado"  required>
              <option v-for="pais in paises" :key="pais.code">{{pais.name}}</option>
                <span v-if="paisIsValid">✓</span>
                  <span v-else>✗</span>
                
            </select>
          <label for="genero">Género</label>
            <select name="genero" id="genero" v-model="generosSeleccionado" required>
              <option v-for="genero in generos" :key="genero.code">{{genero.name}}</option>
                <span v-if="generoIsValid">✓</span>
                  <span v-else>✗</span>
                
            </select>
          <label for="primernombre">Primer Nombre</label>
            <input type="text" name="nombre" id="primerNombre" @input="validarNombre" v-model="nombre" placeholder="Juan" required>
              <span v-if="nombreIsValid">✓</span>
                <span v-else>✗</span>
              
          <label for="segundonombre">Segundo Nombre</label> 
            <input type="text" name="senombre" id="segundoNombre" @input="validarseNombre" v-model="senombre" placeholder="José"  required>
              <span v-if="senombreIsValid">✓</span>
                <span v-else>✗</span>
              
         
   
            <label for="fechanacimiento">Fecha Naciemiento</label>
              <input type="datetime" format="AAAA-MM-DD" name="fecha" id="fechaNacimiento" v-model="fecha" placeholder="AAAA-MM-DD"  required>
                <p v-if="edadInvalida" class="error">Debes ser mayor de 18 años para registrarte.</p>
                  <span v-if="fechaIsValid">✓</span>
                    <span v-else>✗</span>
                 
            <label for="tdocumento">Tipo documento</label>
              <select type="radio" id="tipoDocumento" v-model="documentoSeleccionado" @change="tdocumentosIsValid" name="tdocumento"  required>
                <option v-for="documento in documentos" :key="documento.code">{{documento.name}}</option>
                    <span v-if="tdocumentosIsValid">✓</span>
                      <span v-else>✗</span>    
              </select>


            <label for="ndocumento">Número Documento</label> 
              <input type="tel" name="numeroDocumento" id="numeroDocumento" v-model="numeroDocumento" @input="numeroDocumentoIsvalid"  placeholder="1023654789"  required>
                <span v-if="numeroDocumentoIsValid">✓</span>
                  <span v-else>✗</span> 
         
        <div @submit.prevent="onSubmit">
            <label for="archivo">Foto Documento-Frente</label>
              <input type="file" id="archivo" accept="image/jpeg" @change="onFileChange" required>
                <p v-if="archivoInvalido" class="error">Por favor, seleccione un archivo en formato JPG.</p>
                  <button type="submit" :disabled="archivoInvalido">Enviar</button>
                    <p v-if="archivoInvalido" class="error">Por favor, corrija los errores antes de enviar el formulario.</p>

            <label for="archivo">Foto Documento-Reverso</label>
              <input type="file" id="archivo" accept="image/jpeg" @change="onFileChange" required>
                <p v-if="archivoInvalido" class="error">Por favor, seleccione un archivo en formato JPG.</p>
                  <button type="submit" :disabled="archivoInvalido">Enviar</button>
                    <p v-if="archivoInvalido" class="error">Por favor, corrija los errores antes de enviar el formulario.</p>
        
        </div>
      
      <div>
         <div v-for="(paso, index) in pasos" :key="index" v-show="index === pasoActual">
           <component :is="paso.componente" @validado="onValidado" />
        </div>
        <div class="button">
          
           <button @click="avanzar" >Avanzar</button>
           <button @click.prevent="nextPage">Siguiente</button>
        </div>
      </div>
       <div>
        <span v-for="(paso, index) in pasos" :key="index">
         {{ paso.nombre }} {{ index === pasos.length - 1 ? '' : ' - ' }}
        </span>
      </div>
   </form>
  </div> 
 </template>
 
 <script>
 import moment from 'moment'
 
 export default {
   
   
   data() {
     return {
       
       paisSeleccionado: '',
       paises: [
         {name:"Afganistán",code:"AF"},
         {name:"Albania",code:"AL"},
         {name:"Alemania",code:"DE"},
         {name:"Andorra",code:"AD"},
         {name:"Angola",code:"AO"},
         {name:"Antigua y Barbuda",code:"AG"},
         {name:"Arabia Saudita",code:"SA"},
         {name:"Argelia",code:"DZ"},
         {name:"Argentina",code:"AR"},
         {name:"Armenia",code:"AM"},
         {name:"Australia",code:"AU"},
         {name:"Austria",code:"AT"},
         {name:"Azerbaiyán",code:"AZ"},
         {name:"Bahamas",code:"BS"},
         {name:"Bangladés",code:"BD"},
         {name:"Barbados",code:"BB"},
         {name:"Baréin",code:"BH"},
         {name:"Bélgica",code:"BE"},
         {name:"Belice",code:"BZ"},
         {name:"Benín",code:"BJ"},
         {name:"Bielorrusia",code:"BY"},
         {name:"Birmania",code:"MM"},
         {name:"Bolivia",code:"BO"},
         {name:"Bosnia y Herzegovina",code:"BA"},
         {name:"Botsuana",code:"BW"},
         {name:"Brasil",code:"BR"},
         {name:"Brunéi",code:"BN"},
         {name:"Bulgaria",code:"BG"},
         {name:"Burkina Faso",code:"BF"},
         {name:"Burundi",code:"BI"},
         {name:"Bután",code:"BT"},
         {name:"Cabo Verde",code:"CV"},
         {name:"Camboya",code:"KH"},
         {name:"Camerún",code:"CM"},
         {name:"Canadá",code:"CA"},
         {name:"Catar",code:"QA"},
         {name:"Chad",code:"TD"},
         {name:"Chile",code:"CL"},
         {name:"China",cod:"CN"},
         {name:"Chipre",code:"CY"},
         {name:"Ciudad del Vaticano",code:"VA"},
         {name:"Colombia",code:"CO"},
         {name:"Comoras",code:"KM"},
         {name:"Corea del Norte",code:"KP"},
         {name:"Corea del Sur",code:"KR"},
         {name:"Costa de Marfil",code:"CI"},
         {name:"Costa Rica",code:"CR"},
         {name:"Croacia",code:"HR"},
         {name:"Cuba",code:"CU"},
         {name:"Dinamarca",code:"DK"},
         {name:"Dominica",code:"DM"},
         {name:"Ecuador",code:"EC"},
         {name:"Egipto",code:"EG"},
         {name:"El Salvador",code:"SV"},
         {name:"Emiratos Árabes Unidos",code:"AE"},
         {name:"Eritrea",code:"ER"},
         {name:"Eslovaquia",code:"SK"},
         {name:"Eslovenia",code:"SI"},
         {name:"España",code:"ES"},
         {name:"Estados Unidos",code:"US"},
         {name:"Estonia",code:"EE"},
       ],
 
       generoSeleccionado: '',
       generos: [
         {name:"Masculino",code:"M"},
         {name:"Femenino",code:"F"},
         {name:"No binario",code:"NB"},
         {name:"Transexual",code:"T"},
         {name:"Otro",code:"O"}
       ],
       documentoSeleccionado:'',
       documentos: [
         {name:"Cédula de ciudadanía",code:"CC"},
         {name:"Cédula de extranjería",code:"CE"},
         {name:"Pasaporte",code:"PS"},
       ],
       
       pasoActual: 0,
       pasoActualValido: false,
       pasos: [
         { nombre: '', componente: 'Paso1', camposObligatorios: ['paisSeleccionado'] },
         { nombre: '', componente: 'Paso2', camposObligatorios: ['genero', 'primerNombre', 'fechaNacimiento', 'tipoDocumento', 'numeroDocumento'] },
         { nombre: '', componente: 'Paso3', camposObligatorios: ['fotoDocumentoFrente', 'fotoDocumentoReverso'] }
       ],
       fecha: '',
       nombre: '',
       senombre:'',
       tdocumento: '',
       numeroDocumento:'',

     }
   },
     computed: {
      edadInvalida() {
         const fechaNacimiento = moment(this.fecha)
         const hoy = moment()
         const edad = hoy.diff(fechaNacimiento, 'years')
         return edad < 18
      },
      paisIsValid() {
        return this.paisIsValid;
      },
      generoIsValid() {
        return this.generoIsValid;
      },
      nombreIsValid() {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(this.nombre);
      },
      senombreIsValid(){
        const regex = /^[a-zA-Z]+$/;
        return regex.test(this.senombre);
      },
      fechaIsValid(){
        const regex = /^\d{4}\/\d{2}\/\d{2}$/;
        return regex.test(this.fecha);
      },
      tdocumentoIsValid(){
        return this.tdocumentoIsValid !== '';
      },
      numeroDocumentoIsValid() {
        const numeroDocumentoRegex = /^[0-9]{5,}$/;
        return numeroDocumentoRegex.test(this.numeroDocumento);
      },
   },  
 
   methods: {
    validarNombre() {
      if (/^[a-zA-Z]+$/.test(this.nombre)) {
        this.nombreIsValid = true;
      } else {
        this.nombreIsValid = false;
      }  
    },
    validarseNombre() {
      if (/^[a-zA-Z]+$/.test(this.senombre)) {
        this.senombreIsValid = true;
      } else {
        this.senombreIsValid = false;
      }  
    },
    tdocumentosIsValid() {
     
      if (this.tdocumento !== '') {
        this.tdocumentosIsValid = true;
      } else {
        this.tdocumentosIsValid = false;
      }
      },
      numeroDocumentoIsvalid(){
        if (/^[0-9]{5,}$/.test(this.numeroDocumento)) {
          this.numeroDocumentoIsValid = true;
        } else {
          this.numeroDocumentoIsValid = false;
      }
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
     nextPage() {
        this.$router.push('/PageTwo')
      }
       
  }
 }  
 

</script>
 
<style>

*,
*:before,
*:after {
  box-sizing: border-box;
}

h2{
  text-align: center;
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
 
body {
  padding: 1em;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #b9b9b9;
  background-color: #e3e3e3;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
 

}
.container{
  background-color: #e3e3e3;
  margin: 0 auto;
  width: 30%;
  background-color: #2a2b38;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  box-shadow: 50px;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

input:focus {
  outline: 0;
  border-color: #bd8200;
}
input:focus {
  color: #f0a500;
}

input[type="submit"]{
  color: #fff;
  padding: 10px 45px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

input[type="text"],
input[type="tel"],
input[type="tel"],
input[type="datetime"],
input[type="email"],
input[type="password"],
input[type="phone"]{
  
  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 0 auto ;
  width: 410px;
}

label{
  display: block;
  margin: 0 auto;
  width: fit-content;
  text-align: center;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2)
  
}

textarea {
  width: 100%;
  height: 200px;
  margin: auto;
  display: block;
}


select option,
select {
  margin: auto 0px;
  width: fit-content;
  width: 103%;
  padding: 1em;
  line-height: 1.0;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2)
}

select:focus,
select:active {
  outline: 0;
}
select option {
  background-color: #bba77d;
  color: #fff;
}  

 
.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}


button{
  margin: 0 auto;
  padding-left: 40%;
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  width: fit-content;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);

}
button:active,
button:focus{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
button:hover{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}



</style>
 