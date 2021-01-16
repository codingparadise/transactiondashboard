<template>

    <header>
        <nav class="navbar navbar-expand-lg navbar-light py-4 px-5">
            <router-link to="/" class="navbar-brand text-uppercase" exact>Transaction Dashboard</router-link> 
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon icon-bar"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item" v-if="isAuthenticated">
                        <router-link to="/transactions" class="nav-link" exact>Home</router-link> 
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <button type="button" class="btn btn-link nav-link" @click="logout">Logout</button>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <router-link to="/" class="nav-link">Login</router-link> 
                    </li>
                </ul>
            </div>
        </nav>
    </header>

</template>
<script>
import axios from 'axios';
export default {

    methods:{
      logout(){

        axios.post('http://localhost:3000/logout', {},{ headers: {
            'Authorization':this.$store.getters.currentToken
        } },)
        .then((response)=>{
 
            if(response.status==200){
              this.$store.dispatch('logoutUser', response.data)
              this.$router.push({ name: 'Login' })
            }
            
        })
        .catch((error)=>{

        });


      },
    },
    computed:{
        isAuthenticated() {        
            return this.$store.state.isAuthenticated;
        }
    }
}
</script>

<style scoped>

</style>
