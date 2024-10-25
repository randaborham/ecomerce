<template>
<nav-page/>

   <router-view/>

 
  <Footer/>
</template>
<script>
// @ is an alias to /src
import NavPage from '@/components/NavPage.vue'
import Footer from './components/Footer.vue'
import ProtectRouter  from './components/ProtectRouter.vue'

export default {
  name: 'App',
  components: {
    NavPage,
    Footer,
    ProtectRouter 
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
