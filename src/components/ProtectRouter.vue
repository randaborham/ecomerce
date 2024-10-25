<template>
  <div>
    <slot v-if="isAuthenticated"> 
        <router-view></router-view>
    </slot>
    <div v-else>
      <router-link to="/"></router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ProtectRoute',
  setup() {
    const router = useRouter();
    const isAuthenticated = computed(() => {
      return localStorage.getItem("userToken") !== null;
    });
    if (!isAuthenticated.value) {
      router.push('/'); 
    }
    return {
      isAuthenticated,
    };
  },
};
</script>
