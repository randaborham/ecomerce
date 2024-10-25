<template>
  <div class="home">
     <swider-home/>
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SwiderHome from '@/components/SwiderHome.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    SwiderHome
  }
}
</script>
