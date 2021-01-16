<template>
  <div class="page-container">
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6 mt-5 p-0 offset-md-3">
              <form class="p-5" v-if="form=='login'">
                <h1 class="text-center">Login</h1>
                <br />
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model.trim="email">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model.trim="password">
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <div class="col-sm-12">
                    <button type="button" class="btn bg-custom-primary shadow text-white px-5 float-left" @click="login">Login</button>
                    <button type="button" class="btn btn-link float-right" @click="form='register'">Register</button>
                  </div>
                </div>
                <div class="alert text-center" role="alert" :class="message.success ? 'alert-success' : 'alert-danger'" v-if="message.text!=''">
                  {{message.text}}
                </div>
              </form>

              <br />
              <form class="p-5" v-if="form=='register'">
                <h1 class="text-center">Register</h1>
                <br />
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="registerName">Name</label>
                    <input type="email" class="form-control" id="registerName" v-model.trim="registerName">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="registerEmail">Email</label>
                    <input type="email" class="form-control" id="registerEmail" v-model.trim="registerEmail">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="registerPassword">Password</label>
                    <input type="password" class="form-control" id="registerPassword" v-model.trim="registerPassword">
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <div class="col-sm-12">
                    <button type="button" class="btn bg-custom-primary shadow text-white px-5 float-left" @click="register">Register</button>
                    <button type="button" class="btn btn-link float-right" @click="form='login'">Have an Account? Click here.</button>
                  </div>
                </div>
                <div class="alert text-center" role="alert" :class="message.success ? 'alert-success' : 'alert-danger'" v-if="message.text!=''">
                  {{message.text}}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
      return {
        form:'login',
        message:{
          success:true,
          text:''
        },
        email:'',
        password:'',
        registerName:'',
        registerEmail:'',
        registerPassword:'',

      }
    },
    methods:{
      login(){

          if(this.email=="" || this.password==""){
              this.message.text='All fields are mandatory';  
              this.message.success=false;
              return false;
          }

          const body={
            "email": this.email,
            "password": this.password
          };


        axios.post('http://localhost:3000/login', body)
        .then((response)=>{
 
            if(response.status==200){
              this.message.text='Success';
              this.message.success=true;

            }else{
              this.message.text='Failed to login';  
              this.message.success=false;
            }

            setTimeout(()=>{
              this.message.text='';
              if(response.status==200){
                this.$store.dispatch('loginUser', response.data)
                this.$router.push({ name: 'Transaction' })
              }

            },2000)
            
        })
        .catch((error)=>{
              this.message.text='Failed to login';  
              this.message.success=false;

              setTimeout(()=>{
              this.message.text='';
            },2000)            
        });


      },
      register(){


          if(this.registerName=="" || this.registerEmail=="" || this.registerPassword==""){
              this.message.text='All fields are mandatory';  
              this.message.success=false;
              return false;
          }

        const body={
            "name": this.registerName,
            "email": this.registerEmail,
            "password": this.registerPassword
        };

        axios.post('http://localhost:3000/create', body)
        .then((response)=>{
          
            if(response.status==201){
              this.message.text='User successfully created';
              this.message.success=true;
              

            }

            setTimeout(()=>{
              this.message.text='';
              if(response.status==201){
                this.$store.dispatch('loginUser', response.data)
                this.$router.push({ name: 'Transaction' })

              }
            },2000)
            
        })
        .catch((error)=>{
              this.message.text='Failed to create user';  
              this.message.success=false;

              setTimeout(()=>{
              this.message.text='';
            },2000)            
        });

      }

    }
}
</script>
<style scoped>

</style>
